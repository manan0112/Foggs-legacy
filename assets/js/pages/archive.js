(() => {
  const fallbackNewsletterData = [
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20October%202025%20%28copy%2001%29__FOGGS.html', title: 'October 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20September%202025%20%28copy%2001%29__FOGGS.html', title: 'September 2025' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2025-08.html', title: 'August 2025' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2025-07.html', title: 'July 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20June%202025__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'June 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20May%202025%20Update%20%28copy%2002%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'May 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20April%202025%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'April 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20March%202025%20Update%20%28copy%2001%29__FOGGS.html', title: 'March 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20Feb%202025%20Update%20%28copy%2001%29__FOGGS.html', title: 'February 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20Jan%202025%20Update%20%28copy%2001%29__FOGGS.html', title: 'January 2025' },
    { href: 'assets/files/campaign_exports/FOGGS%20Dec%202024%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'December 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Nov%202024%20Update%20%28copy%2001%29__FOGGS.html', title: 'November 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Oct%202024%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'October 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Sep%202024%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'September 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20July-Aug%202024%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'July-August 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20June%202024%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'June 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20May%202024%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'May 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20April%202024%20Update%20%28copy%2002%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'April 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20March%202024%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'March 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Feb%202024%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'February 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Jan%202024%20Update%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'January 2024' },
    { href: 'assets/files/campaign_exports/FOGGS%20Dec%202023%20Update%20%28copy%2001%29__FOGGS.html', title: 'December 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20Nov%202023%20Update%20%28copy%2001%29__FOGGS.html', title: 'November 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20Sep-Oct%202023%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'September-October 2023' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2023-07.html', title: 'July-August 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20June%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'June 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20April-May%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'April-May 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20March%20Update__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'March 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20January-February%20Update%20%28copy%2002%29__Former%20UN%20Staff.html', title: 'January-February 2023' },
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20December%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'December 2022' },
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20September%20-%20October%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'September-October 2022' },
    { href: 'assets/files/campaign_exports/FOGGS%20Update%20July%20-%20August%20%28copy%2001%29__FOGGS%20%28Emailing%20List%2C%20Team%29.html', title: 'July-August 2022' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2022-06.html', title: 'June 2022' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2022-05.html', title: 'May 2022' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2022-03.html', title: 'March 2022' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2022-01.html', title: 'January 2022' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-12.html', title: 'December 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-11.html', title: 'November 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-10.html', title: 'October 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-05.html', title: 'May 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-04.html', title: 'April 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-03.html', title: 'March 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-02.html', title: 'February 2021' },
    { href: 'assets/files/campaign_exports/FOGGS-Update-2021-01.html', title: 'January 2021' }
  ];

  const fallbackPodcastData = [
    { href: 'https://katoikos.world/podcast/episode-33-changing-our-minds-and-hearts-through-arts-based-activism.html', title: 'Episode 33 – Changing our Minds and Hearts through Arts-based Activism | Helen Gilbert & Péter Kakucska', image: 'assets/files/podcast/Ep33-1160x580.jpg' },
    { href: 'https://katoikos.world/podcast/episode-32-reimagining-our-relationship-with-the-earth-the-eco-principle.html', title: 'Episode 32 – Reimagining our Relationship with the Earth: the Eco Principle | Arthur Dahl', image: 'assets/files/podcast/Ep32-1160x580.jpg' },
    { href: 'https://katoikos.world/podcast/episode-31-the-roma-experience-romaland-art-as-a-vehicle-of-change.html', title: 'Episode 31 – The Roma experience, ROMALAND & art as a vehicle of change | Avraam Goutzeloudis & Eleni Tsetsekou', image: 'assets/files/podcast/Ep31-1160x580.jpg' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-6.html', title: 'CHANGE MAKERS Episode 6 – « El ajedrez me salvó la vida » – la lucha de una periodista colombiana contra la impunidad | Claudia Julieta Duque', image: 'assets/files/podcast/CM6-1160x580.jpg' },
    { href: 'https://katoikos.world/podcast/episode-29-giving-a-voice-to-the-people-pf-myanmar-joah-mcgee.html', title: 'Episode 29 – Giving a voice to the people of Myanmar | Joah McGee', image: 'assets/files/podcast/Epsiode29-1160x580.jpg' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-5.html', title: 'CHANGE MAKERS Episode 5 – Cuando se transformó el sistema electoral mexicano | José Woldenberg', image: 'assets/files/podcast/5-1024x512.png' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-4.html', title: 'CHANGE MAKERS Episode 4 – The first woman at the helm of UNICEF | Carol Bellamy', image: 'assets/files/podcast/CM4-1024x512.png' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-3.html', title: 'CHANGE MAKERS Episode 3 – Guatemala vs Israel: how to recognise the state of Palestine | Fernando Carrera', image: 'assets/files/podcast/ChangeMakers3-1024x512.png' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-2.html', title: 'CHANGE MAKERS Episode 2 – Guatemala vs the War on Drugs | Fernando Carrera', image: 'assets/files/podcast/IMG_1129-1024x512.png' },
    { href: 'https://katoikos.world/podcast/change-makers-episode-1.html', title: 'CHANGE MAKERS Episode 1 – Incorporating sex education in Costa Rica’s schools | Leonardo Garnier', image: 'assets/files/podcast/ChangeMakers1-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-23-fostering-community-and-social-cohesion-through-music-zoe-zeniodi.html', title: 'Episode 23 – Fostering community and social cohesion through music | Zoe Zeniodi', image: 'assets/files/podcast/TGC_Episode23-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-22-p5-and-shifting-power-is-a-realistic-path-to-un-reform-possible.html', title: 'Episode 22 – P5 and Shifting Power: Is a Realistic Path to UN Reform Possible? | Daryl Swanepoel', image: 'assets/files/podcast/loan-graphic-2-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-21-preparing-for-the-future-disaster-risk-and-global-sustainability.html', title: 'Episode 21 – Preparing for the Future: Disaster Risk and Global Sustainability | Cilene Victor', image: 'assets/files/podcast/loan-graphic1-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-20-building-a-global-resilience-council-the-future-of-global-governance.html', title: 'Episode 20 – Building a Global Resilience Council: the Future of Global Governance | Georgios Kostakos', image: 'assets/files/podcast/loan-graphic-1-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-19-from-nairobi-to-the-future-civilsociety-role-in-global-governance.html', title: 'Episode 19 – From Nairobi to the Future: Civil Society’s Role in Global Governance | Nudhara Yusuf', image: 'assets/files/podcast/episode19-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-18-interfaith-dialogue-an-effective-peace-mechanism.html', title: 'Episode 18 – Interfaith Dialogue: An Effective Peace Mechanism? | Mohammd Taher Gholi Tabar', image: 'assets/files/podcast/episode18-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-17-uniting-for-change-is-multilateralism-still-alive-kerstin-leitner.html', title: 'Episode 17 – Uniting for Change: is Multilateralism Still Alive? | Kerstin Leitner', image: 'assets/files/podcast/loan-graphic2-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-16-activist-v-france-a-modern-david-and-goliath-story.html', title: 'Episode 16 – Activist v. France: a modern David and Goliath story | Loan Torondel', image: 'assets/files/podcast/loan-graphic-1024x512.png' },
    { href: 'https://open.spotify.com/episode/2AaG9pIhAsq49mW7IydQ6c', title: 'Episode 15 – Multilateralism and the UN in a post-Westphalian world | Rebecca Shoot', image: 'assets/files/podcast/Episode-15-Multilateralism-and-the-UN-in-a-post-Westphalian-world-Rebecca-Shoot.png' },
    { href: 'https://katoikos.world/podcast/episode-14-the-age-of-democratic-decline-stefanos-loukopoulos.html', title: 'Episode 14 – The age of democratic decline | Stefanos Loukopoulos', image: 'assets/files/podcast/Episode-14-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-13-is-climate-change-really-a-crisis-of-values-finnur-ricart.html', title: 'Episode 13 – Is climate change really a crisis of values? | Finnur Ricart', image: 'assets/files/podcast/Episode-13_Capa-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-12-the-problems-and-challenges-of-climate-diplomacy-richard-kinley.html', title: 'Episode 12 – The problems and challenges of climate diplomacy | Richard Kinley', image: 'assets/files/podcast/Episode-12-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-11-dissecting-the-alt-right-movement-part-2.html', title: 'Episode 11 – Dissecting the Alt-Right Movement | Part 2', image: 'assets/files/podcast/Episode-11-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-10-the-challenging-present-and-future-of-global-politics-kerstin-leitner.html', title: 'Episode 10 – The challenging present and future of global politics | Kerstin Leitner', image: 'assets/files/podcast/Episode-10-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-9-dissecting-the-alt-right-movement.html', title: 'Episode 9 – Dissecting the Alt-Right Movement', image: 'assets/files/podcast/Ep.-9-IPSITA-CHATTERJEE-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-8-climate-policy-and-activism-in-the-mena-region-neeshad-shafi.html', title: 'Episode 8 – Climate policy and activism in the MENA region – Neeshad Shafi', image: 'assets/files/podcast/Ep.-8-neeshad-shafi-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-7-grassroots-activism-and-ngo-government-interplay-in-india-srishti-sharma.html', title: 'Episode 7: Grassroots activism and NGO-government interplay in India | Srishti Sharma', image: 'assets/files/podcast/Episode-7-Srishti-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-6-young-world-federalism-eston-mckeague.html', title: 'Episode 6: (Young) World Federalism | Eston McKeague', image: 'assets/files/podcast/Episode-6-Eston-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-5-inclusion-and-equitability-in-policymaking-sudha-s-reddy.html', title: 'Episode 5: Inclusion and equitability in policymaking | Sudha S. Reddy', image: 'assets/files/podcast/Episode-5-Sudha-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-4-the-power-of-storytelling-jamie-oliviero.html', title: 'Episode 4: The power of storytelling | Jamie Oliviero', image: 'assets/files/podcast/Episode-4-Jamie-1024x512.png' },
    { href: 'https://katoikos.world/podcast/whats-happening-in-sri-lanka-rizvina-de-alwis.html', title: 'Episode 3: What’s happening in Sri Lanka? | Rizvina de Alwis', image: 'assets/files/podcast/Episode-3-Rizvina-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-2-ukraine-geopolitics-and-the-un-dr-georgios-kostakos.html', title: 'Episode 2: Ukraine, geopolitics and the UN | Dr Georgios Kostakos', image: 'assets/files/podcast/Episode-2-Georgios-1024x512.png' },
    { href: 'https://katoikos.world/podcast/episode-1-the-role-of-narratives-in-governance-and-politics-yoriko-yasukawa.html', title: 'Episode 1: The Role of Narratives in Governance and Politics | Yoriko Yasukawa', image: 'assets/files/podcast/Episode-1-Yoriko-1024x512.png' }
  ];

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let value = '';
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          value += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(value);
        value = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && next === '\n') {
          index += 1;
        }
        row.push(value);
        const rowValues = row.map((cell) => cell.replace(/\r?\n/g, '').trim());
        if (rowValues.some((cell) => cell !== '')) {
          rows.push(rowValues);
        }
        row = [];
        value = '';
      } else {
        value += char;
      }
    }

    if (value.length > 0 || row.length > 0) {
      row.push(value);
      const rowValues = row.map((cell) => cell.replace(/\r?\n/g, '').trim());
      if (rowValues.some((cell) => cell !== '')) {
        rows.push(rowValues);
      }
    }

    if (!rows.length) {
      return [];
    }

    const [headers, ...dataRows] = rows;
    return dataRows.map((dataRow) => Object.fromEntries(
      headers.map((header, idx) => [header.trim(), (dataRow[idx] ?? '').trim()])
    ));
  }

  function createArchiveCard(item, includeImage = false) {
    const card = document.createElement('a');
    card.className = 'archive-card';
    card.href = item.href;
    card.target = '_blank';
    card.rel = 'noopener';

    if (includeImage && item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.loading = 'lazy';
      img.onerror = function onError() {
        this.style.display = 'none';
      };
      card.appendChild(img);
    }

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = item.title;
    card.appendChild(title);
    return card;
  }

  function renderNewsletterCards(items) {
    const grid = document.getElementById('newsletter-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const visibleCount = 3; // first row (3 columns)
    items.forEach((item, idx) => {
      const thumbHref = item.href.replace('assets/files/campaign_exports/', 'assets/files/campaign_exports/thumbs/').replace(/\.html$/i, '.png');
      const card = createArchiveCard({ ...item, href: item.href, image: thumbHref }, true);
      const img = card.querySelector('img');
      if (img) {
        img.src = thumbHref;
      }
      if (idx >= visibleCount) {
        card.classList.add('archive-collapsed');
        card.style.display = 'none';
      }
      grid.appendChild(card);
    });
    if (items.length > visibleCount) {
      const btn = document.createElement('button');
      btn.className = 'load-more-btn';
      btn.type = 'button';
      btn.textContent = 'show all';
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.archive-collapsed').forEach((el) => {
          el.style.display = '';
          el.classList.remove('archive-collapsed');
        });
        btn.style.display = 'none';
      });
      grid.parentNode.appendChild(btn);
    }
  }

  function renderPodcastCards(items) {
    const grid = document.getElementById('podcast-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const visibleCount = 3; // first row
    items.forEach((item, idx) => {
      const card = createArchiveCard(item, true);
      if (idx >= visibleCount) {
        card.classList.add('archive-collapsed');
        card.style.display = 'none';
      }
      grid.appendChild(card);
    });
    if (items.length > visibleCount) {
      const btn = document.createElement('button');
      btn.className = 'load-more-btn';
      btn.type = 'button';
      btn.textContent = 'show all';
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.archive-collapsed').forEach((el) => {
          el.style.display = '';
          el.classList.remove('archive-collapsed');
        });
        btn.style.display = 'none';
      });
      grid.parentNode.appendChild(btn);
    }
  }

  function renderArchiveSections(records) {
    const container = document.getElementById('archive-sections');
    if (!container) return;

    const grouped = {};
    records.forEach((record) => {
      const year = record.year || 'Unknown';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(record);
    });

    const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
    container.innerHTML = '';

    years.forEach((year) => {
      const section = document.createElement('section');
      section.className = 'archive-year';
      section.setAttribute('aria-label', `${year} documents`);

      const heading = document.createElement('h2');
      heading.textContent = year;
      section.appendChild(heading);

      const list = document.createElement('ul');
      list.className = 'archive-list';
      const visibleCount = 3; // show first 3 per year
      grouped[year].forEach((item, idx) => {
        const li = document.createElement('li');

        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.title;
        link.rel = 'noopener noreferrer';

        const note = document.createElement('span');
        note.className = 'archive-note';
        note.textContent = `Legacy: ${item.legacy || item.href}`;

        li.append(link, note);
        if (idx >= visibleCount) {
          li.classList.add('archive-collapsed');
          li.style.display = 'none';
        }
        list.appendChild(li);
      });
      section.appendChild(list);
      if (grouped[year].length > visibleCount) {
        const btn = document.createElement('button');
        btn.className = 'load-more-btn year-load-more';
        btn.type = 'button';
        btn.textContent = 'show all';
        btn.addEventListener('click', () => {
          list.querySelectorAll('.archive-collapsed').forEach((el) => {
            el.style.display = '';
            el.classList.remove('archive-collapsed');
          });
          btn.style.display = 'none';
        });
        section.appendChild(btn);
      }

      container.appendChild(section);
    });
  }

  function bindNewsletterListener() {
    const section = document.querySelector('section[aria-label="Newsletters"]');
    if (!section) return;

    section.addEventListener('click', (event) => {
      const link = event.target.closest('a[target="_blank"]');
      if (!link) return;
      event.preventDefault();

      const label = (link.textContent || '').trim();
      const href = link.href;
      const opened = window.open(href, '_blank');
      if (!opened) return;

      const setTitle = () => {
        try {
          opened.document.title = label;
        } catch (error) {
          // Ignore cross-origin or timing issues.
        }
      };

      opened.addEventListener('load', setTitle);

      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        setTitle();
        if (attempts >= 20 || opened.closed) {
          clearInterval(timer);
        }
      }, 100);
    });
  }

  function loadCSV(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`CSV failed to load: ${url}`);
        }
        return response.text();
      })
      .then((text) => parseCSV(text));
  }

  Promise.all([
    loadCSV('assets/data/archive-newsletters.csv').catch(() => fallbackNewsletterData),
    loadCSV('assets/data/archive-podcasts.csv').catch(() => fallbackPodcastData),
    loadCSV('assets/data/archive-documents.csv').catch(() => [])
  ])
    .then(([newsletterRows, podcastRows, documentRows]) => {
      renderNewsletterCards(newsletterRows);
      renderPodcastCards(podcastRows);
      renderArchiveSections(documentRows);
      bindNewsletterListener();
    })
    .catch(() => {
      renderNewsletterCards(fallbackNewsletterData);
      renderPodcastCards(fallbackPodcastData);
      bindNewsletterListener();
    });
})();
