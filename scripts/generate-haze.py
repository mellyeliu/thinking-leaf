"""Create a repeating pastel pixel haze with layered print grain."""
from pathlib import Path
import math
import random
from PIL import Image, ImageFilter

random.seed(82)
root = Path(__file__).resolve().parents[1]
resampling = getattr(Image, 'Resampling', Image)
grid = 64
# Keep the reference's portrait layout: open center, wispy upper clouds,
# and a large bank below. Separate neutral clouds from colored stars.
reference = Image.open(root / 'public/assets/cloud-structure-reference.png').convert('RGB')
grid_height = round(grid * reference.height / reference.width)
reference = reference.resize((grid, grid_height), resampling.BOX)
mask = Image.new('L', (grid, grid_height))
for y in range(grid_height):
    for x in range(grid):
        red, green, blue = reference.getpixel((x, y))
        neutral = max(0, min(1, (65 - (blue - red)) / 40))
        density = max(0, min(1, (red - 85) / 125)) * neutral
        if red > green + 8 or green > blue + 5:
            density = 0
        mask.putpixel((x, y), round(density * 245))
# Close small cutouts from the reference's stars and soften every edge.
closed = mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
mask = Image.blend(mask, closed, 0.85).filter(ImageFilter.GaussianBlur(0.6))

# Smooth random greys create translucent mottling within each cloud.
tones = Image.new('L', (12, 22))
tones.putdata([random.randrange(228, 256) for _ in range(12 * 22)])
tones = tones.resize((grid, grid_height), resampling.BICUBIC).filter(ImageFilter.GaussianBlur(1))

base = Image.new('RGB', (grid, grid_height))
for y in range(grid_height):
    for x in range(grid):
        blend = (math.sin(2 * math.pi * x / grid) + 1) / 2
        blue = (119, 171, 224)
        purple = (170, 140, 216)
        color = [a * (1 - blend) + b * blend for a, b in zip(blue, purple)]
        density = mask.getpixel((x, y)) / 255
        # Edges fade faster; interiors also retain some sky color.
        # Strong cloud cores break up the sky, with a softer fringe.
        edge_haze = density ** 1.15 * 0.4
        core = max(0, min(1, (density - 0.14) / 0.36))
        core = core * core * (3 - 2 * core)
        cloud = min(0.96, edge_haze + core * 0.78)
        grey = tones.getpixel((x, y))
        cloud_color = tuple(min(255, grey + offset) for offset in (4, 3, 9))
        base.putpixel((x, y), tuple(round(c * (1 - cloud) + ink * cloud) for c, ink in zip(color, cloud_color)))

height = grid_height * 20
image = base.resize((1280, height), resampling.NEAREST)
pixels = image.load()
grain = [random.gauss(0, 5) for _ in range(320 * ((height + 3) // 4))]
for y in range(height):
    for x in range(1280):
        noise = grain[(y // 4) * 320 + x // 4] + random.gauss(0, 2)
        noise += math.sin(y * 0.78) * 2
        noise += math.sin((x + y) * 0.54) * math.sin((y - x) * 0.54) * 2
        pixels[x, y] = tuple(max(0, min(255, round(c + noise))) for c in pixels[x, y])
image.save(root / 'public/assets/pixel-haze.webp', quality=93)
