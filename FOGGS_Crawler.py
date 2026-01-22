import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import csv
import os

START_URL = "https://www.foggs.org"
OUTPUT_FILE = "foggs_urls.csv"
DELAY_SECONDS = 0.1  # Minimal delay, safe for whitelisted IP

domain = urlparse(START_URL).netloc

headers = {
    "User-Agent": "FoggsLegacyCrawler/1.0 (contact: admin@foggs.org)"
}

# Load already visited URLs from CSV
visited = set()
html_count = 0
pdf_count = 0
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)  # skip header
        for row in reader:
            visited.add(row[0].strip())
            if len(row) > 1:
                if row[1] == "HTML":
                    html_count += 1
                elif row[1] == "PDF":
                    pdf_count += 1

to_visit = [START_URL]

def is_internal(url):
    return urlparse(url).netloc == domain or urlparse(url).netloc == ""

def clean_url(url):
    parsed = urlparse(url)
    return parsed.scheme + "://" + parsed.netloc + parsed.path.rstrip("/")

# Track time for ETA calculation
start_time = time.time()

# Open CSV in append mode
with open(OUTPUT_FILE, "a", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    if os.stat(OUTPUT_FILE).st_size == 0:
        writer.writerow(["URL", "Type"])

    while to_visit:
        current = to_visit.pop(0)
        current = clean_url(current)

        if current in visited:
            continue

        visited.add(current)

        elapsed = time.time() - start_time
        urls_processed = len(visited)
        avg_time_per_url = elapsed / urls_processed if urls_processed > 0 else 0
        eta_seconds = avg_time_per_url * len(to_visit)
        eta_minutes = int(eta_seconds // 60)
        eta_secs = int(eta_seconds % 60)

        print(f"Crawling ({urls_processed} total, {len(to_visit)} in queue) | ETA: {eta_minutes}m {eta_secs}s : {current}")

        try:
            response = requests.get(current, headers=headers, timeout=15)
        except Exception as e:
            print("Error fetching", current, e)
            continue

        content_type = response.headers.get("Content-Type", "")

        # PDFs and other files
        if "application/pdf" in content_type:
            writer.writerow([current, "PDF"])
            pdf_count += 1
            f.flush()
            print(f"PDF count: {pdf_count}")
            time.sleep(DELAY_SECONDS)
            continue

        # HTML pages
        if "text/html" in content_type:
            writer.writerow([current, "HTML"])
            html_count += 1
            f.flush()
            print(f"HTML count: {html_count}")
            soup = BeautifulSoup(response.text, "html.parser")

            # Collect links and add to queue
            for link in soup.find_all("a", href=True):
                href = link["href"].strip()
                absolute = urljoin(current, href)

                if is_internal(absolute):
                    cleaned = clean_url(absolute)
                    if cleaned not in visited:
                        to_visit.append(cleaned)

        time.sleep(DELAY_SECONDS)

print(f"Done. Total HTML: {html_count}, Total PDF: {pdf_count}")
print("URLs saved to", OUTPUT_FILE)
