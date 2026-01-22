# FOGGS Legacy Archive

Minimal, static-first preservation of the legacy foggs.org WordPress site. All public URLs continue to work through a small PHP router and preserved filenames under `assets/files/`.

## Structure

```
/
├── index.html            # Mission overview
├── work.html             # Initiatives and strands
├── publications.html     # Searchable list of PDFs
├── archive.html          # Chronological archive grouped by year
├── about.html, contact.html
├── assets/
│   ├── css/styles.css    # Color system and layout
│   ├── js/search.js      # Client-side table filter (publications only)
│   ├── files/            # Place all PDFs here (see below)
│   └── data/             # Generated fragments from foggs_urls.csv
├── foggs_urls.csv        # Legacy URL map exported from WordPress
├── router.php            # Legacy URL handler
└── .htaccess             # Rewrites to the router when files are missing
```

## Legacy URL preservation

- `foggs_urls.csv` lists every historic public URL with a `Type` column (PDF or HTML).
- `.htaccess` routes any request that is not an existing file/dir to `router.php`.
- `router.php` parses the CSV once per request:
  - PDF entries are served from `assets/files/<original path after /wp-content/uploads>` when present.
  - If a PDF is missing on disk, the router issues a 301 to `/archive.html` so the user can find alternatives.
  - HTML entries 301 to a stable page (`/about.html`, `/work.html`, `/publications.html`, `/contact.html`) using keyword heuristics and explicit overrides.

## Adding or updating PDFs safely

1. Keep filenames identical to the originals listed in `foggs_urls.csv`.
2. Mirror the legacy path under `assets/files/`. Example:
   - Legacy URL: `/wp-content/uploads/2024/10/A-NEW-COUNCIL-...pdf`
   - Place file at: `assets/files/2024/10/A-NEW-COUNCIL-...pdf` (create folders as needed).
3. No build step is required. The router will serve the file directly or redirect if missing.

## Regenerating archive/publications listings (optional)

Fragments in `assets/data/archive-sections.html` and `assets/data/publications-rows.html` were generated from `foggs_urls.csv` on 2025-12-30 using the Python snippet below. Re-run if the CSV changes, then replace the content blocks in `archive.html` and `publications.html`.

```bash
"/Users/mananshah/Desktop/FOGGS Legacy/.venv/bin/python" - <<'PY'
import csv, re
from pathlib import Path
from urllib.parse import urlparse
from collections import defaultdict
root = Path('.')
csv_path = root / 'foggs_urls.csv'
rows = list(csv.DictReader(csv_path.open()))
pdf_entries = []
for row in rows:
    if row['Type'].strip().upper() != 'PDF':
        continue
    path = urlparse(row['URL']).path
    year_match = re.search(r'/((19|20)\d{2})/', path)
    year = year_match.group(1) if year_match else None
    if not year:
        stem = Path(path).stem
        alt = re.search(r'(19|20)\d{2}', stem)
        year = alt.group(0) if alt else 'Unknown'
    title = re.sub(r'[_-]+', ' ', Path(path).stem).strip()
    title = re.sub(r'\s+', ' ', title)
    remainder = path[len('/wp-content/uploads'):] if path.startswith('/wp-content/uploads') else path
    new_url = '/assets/files' + remainder
    pdf_entries.append({'year': year, 'title': title, 'legacy_path': path, 'new_url': new_url})
# archive sections
by_year = defaultdict(list)
for item in pdf_entries:
    by_year[item['year']].append(item)
for year in by_year:
    by_year[year].sort(key=lambda x: x['title'].lower())
sorted_years = sorted(by_year.keys(), reverse=True, key=lambda y: (y != 'Unknown', y))
archive_lines = []
for year in sorted_years:
    archive_lines.append(f'<section class="archive-year" aria-label="{year} documents">')
    archive_lines.append(f'  <h2>{year}</h2>')
    archive_lines.append('  <ul class="archive-list">')
    for item in by_year[year]:
        archive_lines.append('    <li>')
        archive_lines.append(f'      <a href="{item["new_url"]}">{item["title"]}</a>')
        archive_lines.append(f'      <span class="archive-note">Legacy: {item["legacy_path"]}</span>')
        archive_lines.append('    </li>')
    archive_lines.append('  </ul>')
    archive_lines.append('</section>')
(root / 'assets/data/archive-sections.html').write_text('\n'.join(archive_lines))
# publication rows
pdf_entries.sort(key=lambda x: (x['year'] != 'Unknown', x['year']), reverse=True)
rows_lines = []
for item in pdf_entries:
    rows_lines.append('<tr data-pub-row data-year="{year}" data-title="{title}">'.format(**item))
    rows_lines.append('  <td>{year}</td>'.format(**item))
    rows_lines.append('  <td><a href="{new_url}">{title}</a></td>'.format(**item))
    rows_lines.append('  <td>PDF</td>')
    rows_lines.append('</tr>')
(root / 'assets/data/publications-rows.html').write_text('\n'.join(rows_lines))
print('Fragments updated.')
PY
```

## Hosting

- Any PHP-capable host with Apache and mod_rewrite will work.
- Ensure `.htaccess` is honored; otherwise, route all unmatched requests to `router.php` manually.
- No database, no external libraries, and only one small JavaScript file for table filtering.
