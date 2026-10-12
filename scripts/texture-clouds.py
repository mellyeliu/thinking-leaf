"""Apply pixel blocks, two ink colors, and paper grain to the cloud photo."""
from pathlib import Path
import math
import random
from io import BytesIO
from PIL import Image, ImageCms, ImageEnhance

root = Path(__file__).resolve().parents[1]
corrected = root / 'public/assets/riso-clouds copy.tiff'
has_correction = corrected.exists()
source = Image.open(corrected if has_correction else root / 'public/assets/riso-clouds-source.png')
profile = source.info.get('icc_profile')
if profile:
    source = ImageCms.profileToProfile(source, ImageCms.ImageCmsProfile(BytesIO(profile)), ImageCms.createProfile('sRGB'), outputMode='RGB')
else:
    source = source.convert('RGB')
width, height = source.size
resampling = getattr(Image, 'Resampling', Image)
if has_correction:
    pixels = source.copy()
else:
    pixels = source.resize((width // 12, height // 12), resampling.BOX)
    pixels = pixels.resize(source.size, resampling.NEAREST)
    pixels = ImageEnhance.Contrast(pixels).enhance(0.85)
    pixels = ImageEnhance.Color(pixels).enhance(0.8)
random.seed(41)
# Larger grain survives reduction to the 400px background tile.
grain_width = (width + 3) // 4
grain_height = (height + 3) // 4
paper_grain = [random.gauss(0, 15) for _ in range(grain_width * grain_height)]
data = pixels.load()
for y in range(height):
    for x in range(width):
        red, green, blue = data[x, y]
        light = (red + green + blue) / 765
        # Pink ink catches the clouds, blue ink retains the sky.
        pink = 0 if has_correction else max(0, light - 0.36) * 0.45
        red += (245 - red) * pink
        green += (188 - green) * pink
        blue += (226 - blue) * pink
        # Angled halftone screen, horizontal paper ridges, and ink mottling.
        screen = math.sin((x + y) * 0.54) * math.sin((y - x) * 0.54) * 10
        fibers = math.sin(y * 0.78) * 7 + math.sin(x * 0.4) * 3
        ink = math.sin(x * 0.033 + math.sin(y * 0.021)) * math.sin(y * 0.037) * 9
        coarse = paper_grain[(y // 4) * grain_width + x // 4]
        grain = coarse + random.gauss(0, 5) + screen + fibers + ink
        data[x, y] = tuple(max(0, min(255, round(v + grain))) for v in (red, green, blue))
pixels.save(root / 'public/assets/riso-clouds.webp', quality=93, icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes())
