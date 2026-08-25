#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import sys

def generate(input_path, output_path, thumb_size=(240,160)):
    input_path = Path(input_path).resolve()
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width":1200,"height":800})
        page.goto(f"file://{input_path}", wait_until="networkidle")
        tmp = output_path.with_suffix('.full.png')
        page.screenshot(path=str(tmp), full_page=True)
        browser.close()

    img = Image.open(tmp)
    tw, th = thumb_size
    iw, ih = img.size
    scale = max(tw/iw, th/ih)
    nw, nh = int(iw*scale), int(ih*scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = max((nw - tw)//2, 0)
    top = 0
    img = img.crop((left, top, left+tw, top+th))
    img.save(output_path)
    try:
        tmp.unlink()
    except Exception:
        pass

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: generate_thumbnail.py input.html output.png')
        sys.exit(2)
    generate(sys.argv[1], sys.argv[2])
