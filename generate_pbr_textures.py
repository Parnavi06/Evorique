import numpy as np
from PIL import Image, ImageFilter
import os

os.makedirs('public/textures', exist_ok=True)
W, H = 1024, 1024

def make_seamless(arr):
    # Ensure periodic seamless boundary blending
    h, w = arr.shape
    border = 64
    out = arr.copy()
    for i in range(border):
        alpha = (i / border)
        out[i, :] = arr[i, :] * alpha + arr[h - border + i, :] * (1 - alpha)
        out[h - 1 - i, :] = arr[h - 1 - i, :] * alpha + arr[border - 1 - i, :] * (1 - alpha)
        out[:, i] = arr[:, i] * alpha + arr[:, w - border + i] * (1 - alpha)
        out[:, w - 1 - i] = arr[:, w - 1 - i] * alpha + arr[:, border - 1 - i] * (1 - alpha)
    return out

# -------------------------------------------------------------
# 1. ARCHITECTURAL LIMESTONE PBR SET (1024 x 1024)
# -------------------------------------------------------------
print("Generating Limestone PBR Maps...")
np.random.seed(101)

# Multi-octave fractal noise
height_map = np.zeros((H, W), dtype=np.float32)
for scale, weight in [(4, 0.4), (8, 0.25), (16, 0.18), (32, 0.10), (64, 0.05), (128, 0.02)]:
    rand_grid = np.random.randn(scale, scale).astype(np.float32)
    # Resize with bicubic to (H, W)
    im = Image.fromarray(rand_grid).resize((W, H), Image.Resampling.BICUBIC)
    height_map += np.array(im) * weight

# Add travertine mineral pores (frequent small divots)
pore_grid = np.random.uniform(0, 1, (H // 4, W // 4))
pore_im = Image.fromarray((pore_grid < 0.04).astype(np.float32)).resize((W, H), Image.Resampling.BILINEAR)
height_map -= np.array(pore_im) * 0.35

height_map = (height_map - height_map.min()) / (height_map.max() - height_map.min())
height_map = make_seamless(height_map)

# 1A. Limestone Diffuse (Warm Ivory Limestone #E4DDD1 with subtle mineral flecks)
base_r = 228
base_g = 221
base_b = 209

diff_r = np.clip(base_r + (height_map - 0.5) * 35 + np.random.randn(H, W) * 2.5, 0, 255).astype(np.uint8)
diff_g = np.clip(base_g + (height_map - 0.5) * 32 + np.random.randn(H, W) * 2.5, 0, 255).astype(np.uint8)
diff_b = np.clip(base_b + (height_map - 0.5) * 28 + np.random.randn(H, W) * 2.5, 0, 255).astype(np.uint8)
diffuse_rgb = np.stack([diff_r, diff_g, diff_b], axis=2)
Image.fromarray(diffuse_rgb).save('public/textures/limestone_diffuse.jpg', quality=95)

# 1B. Limestone Normal Map
# Compute gradients for tangent space normals
dx = np.gradient(height_map, axis=1) * 6.5
dy = np.gradient(height_map, axis=0) * 6.5
dz = np.ones_like(height_map)
norm = np.sqrt(dx**2 + dy**2 + dz**2)
nx = (dx / norm) * 0.5 + 0.5
ny = (-dy / norm) * 0.5 + 0.5
nz = (dz / norm) * 0.5 + 0.5
normal_rgb = (np.stack([nx, ny, nz], axis=2) * 255).astype(np.uint8)
Image.fromarray(normal_rgb).save('public/textures/limestone_normal.jpg', quality=95)

# 1C. Limestone Roughness (0.75 - 0.90)
roughness_val = np.clip(0.82 + (0.5 - height_map) * 0.16 + np.random.randn(H, W) * 0.02, 0, 1)
roughness_gray = (roughness_val * 255).astype(np.uint8)
Image.fromarray(roughness_gray).save('public/textures/limestone_roughness.jpg', quality=95)

print("Saved limestone_diffuse.jpg, limestone_normal.jpg, limestone_roughness.jpg")

# -------------------------------------------------------------
# 2. HIGH-FIDELITY TURQUOISE WATER NORMAL MAP (1024 x 1024)
# -------------------------------------------------------------
print("Generating Water Normal Map...")
water_height = np.zeros((H, W), dtype=np.float32)
x = np.linspace(0, 2 * np.pi * 8, W)
y = np.linspace(0, 2 * np.pi * 8, H)
xx, yy = np.meshgrid(x, y)

# Superposition of harmonic wave swells
for freq, amp in [(1.0, 0.4), (2.2, 0.25), (4.5, 0.18), (9.0, 0.10)]:
    angle1 = 0.4
    angle2 = -0.7
    w1 = np.sin(xx * np.cos(angle1) + yy * np.sin(angle1) * freq)
    w2 = np.cos(xx * np.cos(angle2) + yy * np.sin(angle2) * freq)
    water_height += (w1 + w2) * amp

# Gentle high-frequency ripples
np.random.seed(42)
ripple_grid = np.random.randn(32, 32).astype(np.float32)
im_ripple = Image.fromarray(ripple_grid).resize((W, H), Image.Resampling.BICUBIC)
water_height += np.array(im_ripple) * 0.15

water_height = (water_height - water_height.min()) / (water_height.max() - water_height.min())
water_height = make_seamless(water_height)

w_dx = np.gradient(water_height, axis=1) * 3.5
w_dy = np.gradient(water_height, axis=0) * 3.5
w_dz = np.ones_like(water_height)
w_norm = np.sqrt(w_dx**2 + w_dy**2 + w_dz**2)
wnx = (w_dx / w_norm) * 0.5 + 0.5
wny = (-w_dy / w_norm) * 0.5 + 0.5
wnz = (w_dz / w_norm) * 0.5 + 0.5
water_normal_rgb = (np.stack([wnx, wny, wnz], axis=2) * 255).astype(np.uint8)
Image.fromarray(water_normal_rgb).save('public/textures/water_normal.jpg', quality=95)
# Also save as png for backwards compatibility
Image.fromarray(water_normal_rgb).save('public/textures/water_normal.png')
print("Saved water_normal.jpg and water_normal.png")

# -------------------------------------------------------------
# 3. NATURAL OAK WOOD PBR SET (1024 x 1024)
# -------------------------------------------------------------
print("Generating Natural Oak Wood PBR Maps...")
np.random.seed(88)

# Longitudinal grain fibers
wood_height = np.zeros((H, W), dtype=np.float32)
# Fine vertical stretch
fibers = np.random.randn(H // 8, W).astype(np.float32)
im_fibers = Image.fromarray(fibers).resize((W, H), Image.Resampling.BICUBIC)
wood_height += np.array(im_fibers) * 0.35

# Subtle annual growth rings (slow horizontal wave)
rings = np.sin(np.linspace(0, 16 * np.pi, W)) * 0.25
wood_height += rings[np.newaxis, :]

wood_height = (wood_height - wood_height.min()) / (wood_height.max() - wood_height.min())
wood_height = make_seamless(wood_height)

# 3A. Oak Wood Diffuse (Warm Scandinavian Oak #BA9E7E)
wood_base_r = 186
wood_base_g = 158
wood_base_b = 126
w_diff_r = np.clip(wood_base_r + (wood_height - 0.5) * 45, 0, 255).astype(np.uint8)
w_diff_g = np.clip(wood_base_g + (wood_height - 0.5) * 40, 0, 255).astype(np.uint8)
w_diff_b = np.clip(wood_base_b + (wood_height - 0.5) * 32, 0, 255).astype(np.uint8)
wood_rgb = np.stack([w_diff_r, w_diff_g, w_diff_b], axis=2)
Image.fromarray(wood_rgb).save('public/textures/wood_diffuse.jpg', quality=95)

# 3B. Oak Wood Normal
wood_dx = np.gradient(wood_height, axis=1) * 3.0
wood_dy = np.gradient(wood_height, axis=0) * 1.5
wood_dz = np.ones_like(wood_height)
wood_norm = np.sqrt(wood_dx**2 + wood_dy**2 + wood_dz**2)
wnx = (wood_dx / wood_norm) * 0.5 + 0.5
wny = (-wood_dy / wood_norm) * 0.5 + 0.5
wnz = (wood_dz / wood_norm) * 0.5 + 0.5
wood_normal_rgb = (np.stack([wnx, wny, wnz], axis=2) * 255).astype(np.uint8)
Image.fromarray(wood_normal_rgb).save('public/textures/wood_normal.jpg', quality=95)

# 3C. Oak Wood Roughness (0.42 - 0.55 satin oil sheen)
wood_rough_val = np.clip(0.48 + (wood_height - 0.5) * 0.12, 0, 1)
wood_rough_gray = (wood_rough_val * 255).astype(np.uint8)
Image.fromarray(wood_rough_gray).save('public/textures/wood_roughness.jpg', quality=95)

print("Saved wood_diffuse.jpg, wood_normal.jpg, wood_roughness.jpg")
print("ALL HIGH-RESOLUTION PBR TEXTURES GENERATED SUCCESSFULLY!")
