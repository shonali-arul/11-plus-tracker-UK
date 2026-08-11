// Rendering logic only — school data lives in data.js.
// You shouldn't need to edit this file for a yearly refresh.

const DAY = 86400000;

function startOfDay(d){ const x = new Date(d); x.setHours(0,0,0,0); return x; }

function daysBetween(a,b){ return Math.round((startOfDay(b) - startOfDay(a)) / DAY); }

function fmtDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

function computeStatus(school, today){
  const actionable = school.milestones.filter(m => m.actionable);
  const upcoming = actionable.filter(m => daysBetween(today, m.date) >= 0)
                              .sort((a,b) => new Date(a.date) - new Date(b.date));
  if(upcoming.length){
    const next = upcoming[0];
    const days = daysBetween(today, next.date);
    const status = days <= 21 ? 'urgent' : 'open';
    return { status, next, days };
  }
  const past = actionable.sort((a,b) => new Date(b.date) - new Date(a.date));
  return { status:'closed', next: past[0] || null, days:null };
}

function render(){
  const today = new Date();
  const withStatus = SCHOOLS.map(s => ({ school:s, ...computeStatus(s, today) }));

  const urgentCount = withStatus.filter(w => w.status==='urgent').length;
  const openCount = withStatus.filter(w => w.status==='open').length;
  const closedCount = withStatus.filter(w => w.status==='closed').length;
  const todayStr = today.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  document.getElementById('todayStrip').innerHTML = `
    <span>Today &mdash; <strong>${todayStr}</strong></span>
    <span class="stat-urgent">Deadlines within 21 days &mdash; <strong>${urgentCount}</strong></span>
    <span class="stat-open">Open, more time yet &mdash; <strong>${openCount}</strong></span>
    <span>Closed for this cycle &mdash; <strong>${closedCount}</strong></span>
  `;

  renderFilters(withStatus);
  renderSections(withStatus, 'all');
}

let activeFilter = 'all';

function renderFilters(withStatus){
  const cats = ['all','State Grammar','Independent','Girls','Boys','Co-ed / Mixed'];
  const el = document.getElementById('filters');
  el.innerHTML = cats.map(c => `<button class="chip${c==='all' ? ' active':''}" data-filter="${c}">${c==='all' ? 'All schools' : c}</button>`).join('');
  el.querySelectorAll('.chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      el.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderSections(withStatus, activeFilter);
    });
  });
}

function matchesFilter(school, filter){
  if(filter === 'all') return true;
  if(filter === 'State Grammar') return school.category.toLowerCase().includes('state grammar') || school.category.toLowerCase().includes('state selective');
  if(filter === 'Independent') return school.category.toLowerCase().includes('independent');
  if(filter === 'Girls') return school.gender === 'Girls';
  if(filter === 'Boys') return school.gender === 'Boys';
  if(filter === 'Co-ed / Mixed') return school.gender === 'Co-ed' || school.gender === 'Mixed';
  return true;
}

function cardHTML(item){
  const { school, status, next, days } = item;
  const stampText = status === 'closed'
    ? `<div class="n">&mdash;</div><div class="u">closed</div>`
    : `<div class="n">${days}</div><div class="u">day${days===1?'':'s'}</div>`;

  const milestonesHTML = school.milestones.map(m=>{
    const isPast = daysBetween(new Date(), m.date) < 0;
    return `<li class="${isPast?'past':''}"><span>${m.label}</span><span class="m-date">${fmtDate(m.date)}</span></li>`;
  }).join('');

  const primaryLabel = status === 'closed' ? `Most recent deadline` : `Next deadline`;

  return `
    <div class="card status-${status}">
      <div class="card-top">
        <div>
          <h3 class="card-name">${school.name}</h3>
          <div class="tags">
            <span class="tag">${school.category}</span>
            <span class="tag">${school.gender}</span>
            <span class="tag">${school.region}</span>
          </div>
        </div>
        <div class="stamp">${stampText}</div>
      </div>
      <div class="primary-deadline">
        <span class="label">${primaryLabel}: ${next ? next.label : 'n/a'}</span>
        <span class="date">${next ? fmtDate(next.date) : ''}</span>
      </div>
      <ul class="milestones">${milestonesHTML}</ul>
      ${school.note ? `<div class="note">${school.note}</div>` : ''}
      <div class="card-footer">
        <a class="visit" href="${school.website}" target="_blank" rel="noopener">Visit official site &rarr;</a>
      </div>
    </div>
  `;
}

function renderSections(withStatus, filter){
  const filtered = withStatus.filter(w => matchesFilter(w.school, filter));
  const groups = {
    urgent: filtered.filter(w=>w.status==='urgent').sort((a,b)=>a.days-b.days),
    open: filtered.filter(w=>w.status==='open').sort((a,b)=>a.days-b.days),
    closed: filtered.filter(w=>w.status==='closed')
  };

  const sectionsEl = document.getElementById('sections');
  let html = '';

  if(groups.urgent.length){
    html += `<div class="section-title">Closing soon <span class="count">within 21 days</span></div>
      <div class="section-rule"></div>
      <div class="grid">${groups.urgent.map(cardHTML).join('')}</div>`;
  }
  if(groups.open.length){
    html += `<div class="section-title">Open <span class="count">more time yet</span></div>
      <div class="section-rule"></div>
      <div class="grid">${groups.open.map(cardHTML).join('')}</div>`;
  }
  if(groups.closed.length){
    html += `<div class="section-title">Closed for this cycle <span class="count">registration has passed</span></div>
      <div class="section-rule"></div>
      <p class="section-hint">These schools' main registration window has closed. Where a Common Application Form (CAF) or other action is still open, it's shown as the current deadline below.</p>
      <div class="grid">${groups.closed.map(cardHTML).join('')}</div>`;
  }
  if(!filtered.length){
    html = `<p style="padding:40px 0; color:var(--text-soft);">No schools match this filter.</p>`;
  }

  sectionsEl.innerHTML = html;
}

render();
setInterval(render, 1000 * 60 * 60); // refresh countdowns hourly if left open
