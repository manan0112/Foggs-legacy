(() => {
  const container = document.getElementById('events-list');
  if (!container) return;

  const PROJECT_LABELS = {
    'open-consultation-mondays': 'Open Consultation Mondays',
    'gspn': 'Global South Perspectives Network',
    'prg': 'Peace Reflection Group',
    'grc': 'Global Resilience Council',
    'casa-m4ce': 'Project CASA / M4CE',
    'grand-narrative': 'The Grand Narrative',
    'sparta-komvos': 'sparta.komvos',
    'democrat': 'DEMOCRAT Project',
  };

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parts[1] ? parseInt(parts[1], 10) : null;
    const day = parts[2] ? parseInt(parts[2], 10) : null;
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (month && day) return `${day} ${monthNames[month - 1]} ${year}`;
    if (month) return `${monthNames[month - 1]} ${year}`;
    return year;
  }

  function getYear(dateStr) {
    return dateStr ? dateStr.split('-')[0] : 'Unknown';
  }

  function sortKey(dateStr) {
    if (!dateStr) return '0000';
    const parts = dateStr.split('-');
    return `${parts[0] || '0000'}-${parts[1] || '00'}-${parts[2] || '00'}`;
  }

  function youtubeUrl(id) {
    if (!id) return null;
    return id.startsWith('http') ? id : `https://www.youtube.com/watch?v=${id}`;
  }

  function buildCard(event) {
    const article = document.createElement('article');
    article.className = 'event-card';
    article.id = event.id;

    const videoUrl = event.youtube ? youtubeUrl(event.youtube) : event.link || null;
    const videoId = event.youtube && !event.youtube.startsWith('http') ? event.youtube : null;

    const meta = document.createElement('div');
    meta.className = 'event-card-meta';
    const tag = document.createElement('span');
    tag.className = 'legacy-marker';
    tag.textContent = PROJECT_LABELS[event.project] || event.project;
    const time = document.createElement('time');
    time.textContent = formatDate(event.date);
    meta.append(tag, time);

    const heading = document.createElement('h3');
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = event.title;
      heading.appendChild(link);
    } else {
      heading.textContent = event.title;
    }

    const desc = document.createElement('p');
    desc.textContent = event.description;

    if (videoId || event.image) {
      const row = document.createElement('div');
      row.className = 'event-row';

      const thumbHref = videoId ? videoUrl : (event.link || null);
      const thumbLink = document.createElement(thumbHref ? 'a' : 'div');
      if (thumbHref) {
        thumbLink.href = thumbHref;
        thumbLink.target = '_blank';
        thumbLink.rel = 'noopener noreferrer';
      }
      thumbLink.className = 'event-thumb-link';
      thumbLink.setAttribute('aria-hidden', 'true');
      thumbLink.tabIndex = -1;

      const img = document.createElement('img');
      img.className = 'event-thumb';
      img.src = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : event.image;
      img.alt = '';
      img.loading = 'lazy';
      thumbLink.appendChild(img);

      const body = document.createElement('div');
      body.className = 'event-card-body';
      body.append(meta, heading, desc);

      row.append(thumbLink, body);
      article.appendChild(row);
    } else {
      article.append(meta, heading, desc);
    }

    return article;
  }

  function buildYearSections(events) {
    const byYear = {};
    events.forEach((ev) => {
      const y = getYear(ev.date);
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(ev);
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);
    const fragment = document.createDocumentFragment();

    years.forEach((year) => {
      const section = document.createElement('section');
      section.className = 'section';
      section.id = `events-${year}`;

      const h2 = document.createElement('h2');
      h2.textContent = year;
      section.appendChild(h2);

      const list = document.createElement('div');
      list.className = 'events-year-list';
      byYear[year].forEach((ev) => list.appendChild(buildCard(ev)));
      section.appendChild(list);

      fragment.appendChild(section);
    });

    return fragment;
  }

  function jumpToAnchor() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight || 0;
        window.scrollBy({ top: -headerHeight - 12, left: 0, behavior: 'auto' });
      }
    });
  }

  window.addEventListener('hashchange', () => {
    // allow the rendering pipeline a tick then jump
    requestAnimationFrame(jumpToAnchor);
  });

  fetch('assets/data/events.json')
    .then((r) => r.json())
    .then((events) => {
      events.sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));

      const foggs = events.filter((ev) => ev.project !== 'sparta-komvos');
      const sparta = events.filter((ev) => ev.project === 'sparta-komvos');

      container.innerHTML = '';
      container.appendChild(buildYearSections(foggs));

      if (sparta.length > 0) {
        const divider = document.createElement('div');
        divider.className = 'events-section-divider';

        const dividerHeading = document.createElement('h2');
        dividerHeading.className = 'events-section-title';
        dividerHeading.textContent = 'sparta.komvos Events';
        divider.appendChild(dividerHeading);

        const dividerDesc = document.createElement('p');
        dividerDesc.className = 'lede';
        dividerDesc.textContent = 'Events and dialogues from sparta.komvos, a cultural space associated with FOGGS in Greece.';
        divider.appendChild(dividerDesc);

        container.appendChild(divider);
        container.appendChild(buildYearSections(sparta));
      }

      jumpToAnchor();
    })
    .catch(() => {
      container.innerHTML = '<p>Unable to load events right now.</p>';
    });
})();
