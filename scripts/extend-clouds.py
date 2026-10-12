"""Extend the existing cloud images sideways with reflected edge content."""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

root = Path(__file__).resolve().parents[1] / 'public/assets'
for source_name, output_name in (
    ('riso-clouds.webp', 'riso-clouds-extended.webp'),
    ('cloud-sky.jpg', 'cloud-sky-extended.webp'),
):
    source = Image.open(root / source_name).convert('RGB')
    source = ImageEnhance.Contrast(source).enhance(0.94)
    width, height = source.size
    padding = width // 2
    extended = Image.new('RGB', (width + padding * 2, height))
    extended.paste(ImageOps.mirror(source.crop((0, 0, padding, height))), (0, 0))
    extended.paste(source, (padding, 0))
    extended.paste(ImageOps.mirror(source.crop((width - padding, 0, width, height))), (padding + width, 0))
    # Fade a small reflected overlap into each join to soften mirrored edges.
    overlap = 24
    pixels = extended.load()
    for join in (padding, padding + width):
        for offset in range(-overlap, overlap):
            x = join + offset
            strength = (1 - abs(offset) / overlap) * 0.2
            for y in range(height):
                current = pixels[x, y]
                neighboring = pixels[join - offset - 1, y]
                pixels[x, y] = tuple(round(a * (1 - strength) + b * strength) for a, b in zip(current, neighboring))
    extended.save(root / output_name, quality=93)
