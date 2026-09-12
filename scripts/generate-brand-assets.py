#!/usr/bin/env python3
"""
generate-brand-assets — regenerates the favicon set and the link-share card.

The outputs are committed PNGs, but they are GENERATED rather than hand-drawn,
so that whoever changes the tagline next can regenerate the share card instead
of shipping one that contradicts the site. That is not hypothetical: the card
this replaced still read "Independent cryptographic proof for records,
decisions, and evidence" — the pilot-era positioning — long after the site
stopped saying it. Every shared link was selling the old company.

Everything below derives from the site's real tokens (tailwind.config.js) and
its real visual signature, the hexagonal lattice in shared/AbstractBackground.tsx
whose verification pulse propagates through the hero. Nothing here invents a
brand colour and nothing states a claim the page does not.

Run:  python3 scripts/generate-brand-assets.py
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

# ── Tokens, copied from tailwind.config.js. Do not invent values here. ────────
VOID = (7, 8, 12)            # loggie-void  #07080c — the page substrate
PURPLE = (139, 92, 246)      # loggie-purple #8b5cf6
CYAN = (6, 182, 212)         # loggie-cyan   #06b6d4
WHITE = (255, 255, 255)
GRAY_300 = (209, 213, 219)
GRAY_400 = (156, 163, 175)

FONT_BOLD = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"
FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def lerp(a, b, t: float):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(size, top, bottom) -> Image.Image:
    """The brand gradient, purple at the top falling to cyan."""
    w, h = size
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        px[0, y] = lerp(top, bottom, y / max(h - 1, 1))
    return grad.resize((w, h))


def paste_gradient(img: Image.Image, mask: Image.Image, box) -> None:
    """
    Fill `mask` with the brand ramp scaled to `box` = (x0, y0, x1, y1).

    The ramp has to span the element, not the canvas. A gradient drawn across
    the full canvas height leaves a small element sampling one slice of it, so
    a purple-to-cyan brand mark arrives as a flat mid-blue.
    """
    x0, y0, x1, y1 = box
    w, h = max(x1 - x0, 1), max(y1 - y0, 1)
    ramp = Image.new("RGB", img.size, VOID)
    ramp.paste(vertical_gradient((w, h), PURPLE, CYAN), (x0, y0))
    img.paste(ramp, (0, 0), mask)


def hexagon(cx: float, cy: float, r: float, rotate: float = 0.0):
    """Flat-topped hexagon, matching the lattice geometry in the hero canvas."""
    return [
        (
            cx + r * math.cos(math.radians(60 * i + rotate)),
            cy + r * math.sin(math.radians(60 * i + rotate)),
        )
        for i in range(6)
    ]


# ── Favicon ──────────────────────────────────────────────────────────────────
#
# The icon this replaces was 543x543 and 424 KB — for a 16-pixel slot — drawn as
# a chain link over an isometric cube inside a network ring, on a transparent
# light ground. Three separate problems: it was invisible against a light tab
# strip, it was far too detailed to resolve at 16px, and its acid-green palette
# appears nowhere in this site's tokens.
#
# What replaces it is one hexagon: the site's own lattice motif reduced to a
# single node. It carries a dark rounded-square ground so it holds contrast on
# both light and dark tab strips, and it survives being shrunk to 16px because
# there is only one shape to read.

def build_icon(size: int) -> Image.Image:
    ss = 8  # supersample, then downsample — keeps the edges clean at 16px
    s = size * ss
    img = Image.new("RGB", (s, s), VOID)
    draw = ImageDraw.Draw(img)

    # Rounded-square ground.
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=255)

    # The hexagon, filled with the brand gradient.
    hex_r = s * 0.33
    hex_mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(hex_mask).polygon(hexagon(s / 2, s / 2, hex_r, rotate=30), fill=255)
    paste_gradient(img, hex_mask, (int(s / 2 - hex_r), int(s / 2 - hex_r),
                                   int(s / 2 + hex_r), int(s / 2 + hex_r)))

    # The verification node at its centre — the one detail small enough to keep.
    node_r = s * 0.085
    draw.ellipse(
        [s / 2 - node_r, s / 2 - node_r, s / 2 + node_r, s / 2 + node_r],
        fill=VOID,
    )

    out = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out.resize((size, size), Image.LANCZOS)


# ── Share card ───────────────────────────────────────────────────────────────
#
# 1200x630 — the size Open Graph, Twitter and LinkedIn all expect. The previous
# card was 800x418, so every platform upscaled it and it arrived soft.
#
# The copy is the site's current headline, and the card carries the same status
# disclosure the hero does. A share card that overclaims while the page it links
# to discloses would be the one dishonest surface in the system.

STATUS = "Public beta  ·  Ethereum Sepolia test network  ·  Not independently audited"


def build_share_card() -> Image.Image:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), VOID)
    draw = ImageDraw.Draw(img, "RGBA")

    # The hexagonal lattice, drawn with the hero canvas's own geometry:
    # 60px radius, true hex neighbour topology, hairlines at rgba(56,189,207,.08).
    hex_r = 58
    hex_h = hex_r * math.sqrt(3)
    for col in range(-2, int(W / (hex_r * 1.5)) + 3):
        for row in range(-2, int(H / hex_h) + 3):
            x = col * hex_r * 1.5
            y = row * hex_h + (col % 2) * (hex_h / 2)
            draw.polygon(hexagon(x, y, hex_r), outline=(56, 189, 207, 16))

    # A violet glow behind the mark, echoing the hero's radial wash.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i in range(60, 0, -1):
        gd.ellipse(
            [980 - i * 7, 315 - i * 7, 980 + i * 7, 315 + i * 7],
            fill=(139, 92, 246, 2),
        )
    img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    pad = 76

    # Wordmark, in the brand gradient — the one place this card uses it.
    wm_font = font(FONT_BOLD, 40)
    wm_mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(wm_mask).text((pad, pad), "Loggie", font=wm_font, fill=255)
    wm_box = wm_mask.getbbox()
    paste_gradient(img, wm_mask, wm_box)

    # Headline — the site's current H1, verbatim.
    h_font = font(FONT_BOLD, 82)
    draw.text((pad, pad + 104), "Keep the record.", font=h_font, fill=WHITE)
    draw.text((pad, pad + 200), "Prove it later.", font=h_font, fill=WHITE)

    # Supporting line.
    b_font = font(FONT_REG, 27)
    draw.text(
        (pad, pad + 322),
        "A private place for important files — recover them from",
        font=b_font,
        fill=GRAY_300,
    )
    draw.text(
        (pad, pad + 360),
        "another computer, and prove what existed when.",
        font=b_font,
        fill=GRAY_300,
    )

    # The hexagon mark, mirroring the favicon so the two read as one system.
    cx, cy, r = 980, 300, 104
    hex_mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(hex_mask).polygon(hexagon(cx, cy, r, rotate=30), fill=255)
    paste_gradient(img, hex_mask, (cx - r, cy - r, cx + r, cy + r))
    draw = ImageDraw.Draw(img, "RGBA")
    draw.ellipse([cx - 26, cy - 26, cx + 26, cy + 26], fill=VOID)

    # The same disclosure the hero carries. Never ship this card without it.
    m_font = font(FONT_MONO, 19)
    draw.line([pad, H - 112, W - pad, H - 112], fill=(255, 255, 255, 18), width=1)
    draw.text((pad, H - 86), STATUS, font=m_font, fill=GRAY_400)

    return img


def build_wordmark() -> Image.Image | None:
    """
    Right-size the shipped wordmark.

    The navbar renders it at 36px tall and was being served a 1012x375, 346 KB
    PNG to do it. The original is kept in brand/ as the source of truth and is
    no longer served; 120px tall leaves 3x headroom for retina, and quantizing a
    two-colour wordmark to 64 colours takes it to a few KB with no visible loss.
    """
    src = ROOT / "brand" / "loggie-wordmark-source.png"
    if not src.exists():
        print(f"  (skipped wordmark — {src.relative_to(ROOT)} not present)")
        return None
    im = Image.open(src).convert("RGBA")
    im = im.crop(im.getbbox())  # trim transparent padding
    h = 120
    w = round(im.width * h / im.height)
    return im.resize((w, h), Image.LANCZOS).quantize(colors=64, method=Image.FASTOCTREE)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    for size in (16, 32, 48, 180, 512):
        name = "apple-touch-icon.png" if size == 180 else f"favicon-{size}x{size}.png"
        path = PUBLIC / name
        build_icon(size).save(path, optimize=True)
        print(f"  {name:<26} {size}x{size}  {path.stat().st_size / 1024:.1f} KB")

    card = PUBLIC / "loggie-share-card.png"
    build_share_card().save(card, optimize=True)
    print(f"  {card.name:<26} 1200x630  {card.stat().st_size / 1024:.1f} KB")

    wm = build_wordmark()
    if wm is not None:
        path = PUBLIC / "loggie-wordmark.png"
        wm.save(path, optimize=True)
        print(f"  {path.name:<26} {wm.width}x{wm.height}  {path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
