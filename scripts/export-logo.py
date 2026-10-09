#!/usr/bin/env python3
"""
export-logo — derives every shipped logo file from the masters in brand/logo/.

Two sources, no redraws. The master mark (loggie-mark.svg) and the wordmark
(loggie-wordmark.svg) are the only artwork; the 16px glyph is the small-size
drawing of the same mark, drawn on the pixel grid because a 104-unit mark
scaled to 12px blurs its bar and dot together. It is candidate A from the logo
sheet: L, short bar and an enlarged dot, chosen over the dotless B so the teal
still picks Loggie out of a row of tabs. Everything else here is
composition and recolouring by rule:

  * dark variants swap Ink -> Paper and Teal Deep -> Teal Bright, nothing else
  * the lockup sizes the mark from ascender to descender, gap = one stroke S
  * tiles put the mark at 0.66 of the tile, nudged +2/-2 for the L's low-left
    weight, which keeps it inside the 80% maskable safe circle

The geometry those rules read (live area, S, ascender, descender) is restated
below. If a master changes shape, change the constant beside it.

This writes to public/. The switch was made in one move: generate-brand-assets.py
and the two orb-era source PNGs are retired, and the masters below are now the
only artwork this site ships. app.loggielabs.com still carries the orb and has
to follow — until it does, the two properties do not match.

Run:  python3 scripts/export-logo.py [--out DIR]     (default: public)
Needs librsvg's GObject bindings (gi, Rsvg 2.0) and pycairo.
"""

from __future__ import annotations

import argparse
import io
import re
from pathlib import Path

import cairo
import gi

gi.require_version("Rsvg", "2.0")
from gi.repository import Rsvg  # noqa: E402
from PIL import Image, ImageDraw, ImageFont  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
MASTERS = ROOT / "brand" / "logo"

# ── Palette (Logo system, board 03). ─────────────────────────────────────────
INK = "#0C1524"
PAPER = "#FFFFFF"
TEAL_DEEP = "#0E8F78"     # proof dot on light grounds
TEAL_BRIGHT = "#1FD1AE"   # proof dot on dark grounds; never on Paper (1.9:1)
DARK = {INK: PAPER, TEAL_DEEP: TEAL_BRIGHT}

# ── Geometry the composition rules read. ─────────────────────────────────────
MARK_LIVE = 8        # loggie-mark.svg: 120 grid, live area 8..112
MARK_SIZE = 104
STROKE_S = 28
WM_ASCENDER = 30     # loggie-wordmark.svg: top of the l and of the tittle
WM_DESCENDER = 129   # bottom of the g
WM_WIDTH = 261       # outer right of the e

TILE_SCALE = 0.66
TILE_NUDGE = (2, -2)
TILE_RADIUS = 26     # rounded favicon tiles only; 180 and 512 ship square

FONT_BOLD = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"
FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"


def master(name: str) -> str:
    return (MASTERS / name).read_text()


def inner(svg: str) -> str:
    """The drawing inside a master's root <svg>, for composing into another."""
    return re.search(r"<svg\b[^>]*>(.*)</svg>", svg, re.S).group(1)


def recolor(svg: str, mapping: dict[str, str]) -> str:
    """Swap palette hexes in one pass, so Ink -> Paper is never re-mapped."""
    pattern = re.compile("|".join(re.escape(k) for k in mapping), re.I)
    lookup = {k.upper(): v for k, v in mapping.items()}
    return pattern.sub(lambda m: lookup[m.group(0).upper()], svg)


def doc(viewbox: tuple[float, float, float, float], body: str) -> str:
    x, y, w, h = (round(v, 4) for v in viewbox)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}" '
        f'width="{w}" height="{h}">{body}</svg>\n'
    )


def lockup(mark: str, wordmark: str) -> str:
    s = (WM_DESCENDER - WM_ASCENDER) / MARK_SIZE
    wm_x = (MARK_SIZE + STROKE_S) * s
    body = (
        f'<g transform="translate(0 {WM_ASCENDER}) scale({s:.6f}) '
        f'translate({-MARK_LIVE} {-MARK_LIVE})">{inner(mark)}</g>'
        f'<g transform="translate({wm_x:.4f} 0)">{inner(wordmark)}</g>'
    )
    return doc((0, WM_ASCENDER, wm_x + WM_WIDTH, WM_DESCENDER - WM_ASCENDER), body)


def tile(mark: str, rounded: bool) -> str:
    """The mark on an Ink tile. `mark` is the light master; it is recoloured here."""
    size = MARK_SIZE * TILE_SCALE
    tx = (120 - size) / 2 + TILE_NUDGE[0]
    ty = (120 - size) / 2 + TILE_NUDGE[1]
    rx = f' rx="{TILE_RADIUS}"' if rounded else ""
    body = (
        f'<rect width="120" height="120"{rx} fill="{INK}"/>'
        f'<g transform="translate({tx:.4f} {ty:.4f}) scale({TILE_SCALE}) '
        f'translate({-MARK_LIVE} {-MARK_LIVE})">{inner(recolor(mark, DARK))}</g>'
    )
    return doc((0, 0, 120, 120), body)


def render(svg: str, width: int, height: int) -> Image.Image:
    """Rasterise at the target size directly: no supersample-and-shrink, so the
    16px glyph lands on the pixel grid it was drawn on."""
    handle = Rsvg.Handle.new_from_data(svg.encode())
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)
    viewport = Rsvg.Rectangle()
    viewport.x, viewport.y, viewport.width, viewport.height = 0, 0, width, height
    handle.render_document(cairo.Context(surface), viewport)
    buf = io.BytesIO()
    surface.write_to_png(buf)
    buf.seek(0)
    return Image.open(buf).convert("RGBA")


def _viewbox(svg: str) -> tuple[float, float]:
    _, _, w, h = (float(v) for v in re.search(r'viewBox="([^"]+)"', svg).group(1).split())
    return w, h


def size_for_height(svg: str, height: int) -> tuple[int, int]:
    w, h = _viewbox(svg)
    return round(w * height / h), height


def size_for_width(svg: str, width: int) -> tuple[int, int]:
    w, h = _viewbox(svg)
    return width, round(h * width / w)


# ── Share card ───────────────────────────────────────────────────────────────
#
# Same copy as the card the orb-era script shipped at v0.1.0, on the new mark.
# The headline is the hero's H1; the status line must travel with it.

STATUS = "Public beta  ·  Ethereum Sepolia test network  ·  Not independently audited"


def share_card(mark_dark: str, wordmark_dark: str) -> Image.Image:
    W, H, pad = 1200, 630, 76
    card = Image.new("RGBA", (W, H), INK)

    wm = render(wordmark_dark, *size_for_height(wordmark_dark, 44))
    card.alpha_composite(wm, (pad, pad))

    mark = render(mark_dark, 260, 260)
    card.alpha_composite(mark, (980 - 130, 300 - 130))

    draw = ImageDraw.Draw(card)
    h_font = ImageFont.truetype(FONT_BOLD, 82)
    draw.text((pad, pad + 104), "Keep your piece", font=h_font, fill=PAPER)
    draw.text((pad, pad + 200), "of history.", font=h_font, fill=PAPER)

    b_font = ImageFont.truetype(FONT_REG, 27)
    draw.text((pad, pad + 322), "Your photos, writing, files and conversations — kept",
              font=b_font, fill="#D1D5DB")
    draw.text((pad, pad + 360), "somewhere that belongs to you, not to a platform.",
              font=b_font, fill="#D1D5DB")

    draw.line([pad, H - 112, W - pad, H - 112], fill="#26303F", width=1)
    draw.text((pad, H - 86), STATUS, font=ImageFont.truetype(FONT_MONO, 19), fill="#9CA3AF")
    return card.convert("RGB")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--out", type=Path, default=ROOT / "public")
    out: Path = ap.parse_args().out
    out.mkdir(parents=True, exist_ok=True)

    mark = master("loggie-mark.svg")
    wordmark = master("loggie-wordmark.svg")
    mark_dark, wordmark_dark = recolor(mark, DARK), recolor(wordmark, DARK)
    lock, lock_dark = lockup(mark, wordmark), lockup(mark_dark, wordmark_dark)

    svgs = {
        "loggie-mark.svg": mark,
        "loggie-mark-dark.svg": mark_dark,
        "loggie-lockup.svg": lock,
        "loggie-lockup-dark.svg": lock_dark,
        "favicon.svg": master("loggie-glyph-16.svg"),
    }
    for name, svg in svgs.items():
        (out / name).write_text(svg)

    pngs: dict[str, Image.Image] = {
        "favicon-16x16.png": render(svgs["favicon.svg"], 16, 16),
        "favicon-32x32.png": render(tile(mark, rounded=True), 32, 32),
        "favicon-48x48.png": render(tile(mark, rounded=True), 48, 48),
        "apple-touch-icon.png": render(tile(mark, rounded=False), 180, 180).convert("RGB"),
        "favicon-512x512.png": render(tile(mark, rounded=False), 512, 512).convert("RGB"),
        # The navbar sits on the dark site and draws this 28-36px tall. Shipped
        # at 2x of the 480-wide lockup, as the export map specifies: 36 CSS px on
        # a 3x screen is 108 device px, and a 120-tall source has nothing spare.
        "loggie-wordmark.png": render(lock_dark, *size_for_width(lock_dark, 960)),
        "loggie-share-card.png": share_card(mark_dark, wordmark_dark),
    }
    for name, img in pngs.items():
        path = out / name
        img.save(path, optimize=True)
        print(f"  {name:<26} {img.width}x{img.height}  {path.stat().st_size / 1024:.1f} KB")

    print(f"\n  {len(svgs)} SVGs + {len(pngs)} PNGs -> {out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}")


if __name__ == "__main__":
    main()
