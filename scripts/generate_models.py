import json
import struct
import math
import numpy as np
import os

def export_glb(filepath, meshes_data):
    """
    Export one or more meshes to a glTF 2.0 Binary (.glb) file.
    meshes_data: list of dicts with:
      'name': str,
      'vertices': np.ndarray (N, 3) float32,
      'normals': np.ndarray (N, 3) float32,
      'uvs': np.ndarray (N, 2) float32,
      'indices': np.ndarray (M, 3) uint32,
      'material_name': str optional
    """
    bin_buffer = bytearray()
    accessors = []
    buffer_views = []
    gltf_meshes = []
    nodes = []

    for idx, m in enumerate(meshes_data):
        v = m['vertices'].astype(np.float32)
        n = m['normals'].astype(np.float32)
        uv = m['uvs'].astype(np.float32)
        indices = m['indices'].astype(np.uint32)

        # Ensure correct shapes
        if len(v) == 0 or len(indices) == 0:
            continue

        # Pad buffer to 4 bytes before each view
        def append_aligned(b):
            nonlocal bin_buffer
            pad = (4 - (len(bin_buffer) % 4)) % 4
            bin_buffer.extend(b'\x00' * pad)
            offset = len(bin_buffer)
            bin_buffer.extend(b)
            return offset, len(b)

        pos_offset, pos_len = append_aligned(v.tobytes())
        norm_offset, norm_len = append_aligned(n.tobytes())
        uv_offset, uv_len = append_aligned(uv.tobytes())
        idx_offset, idx_len = append_aligned(indices.flatten().tobytes())

        base_bv = len(buffer_views)
        buffer_views.append({'buffer': 0, 'byteOffset': pos_offset, 'byteLength': pos_len, 'target': 34962})
        buffer_views.append({'buffer': 0, 'byteOffset': norm_offset, 'byteLength': norm_len, 'target': 34962})
        buffer_views.append({'buffer': 0, 'byteOffset': uv_offset, 'byteLength': uv_len, 'target': 34962})
        buffer_views.append({'buffer': 0, 'byteOffset': idx_offset, 'byteLength': idx_len, 'target': 34963})

        base_acc = len(accessors)
        v_min = v.min(axis=0).tolist()
        v_max = v.max(axis=0).tolist()

        accessors.append({'bufferView': base_bv + 0, 'byteOffset': 0, 'componentType': 5126, 'count': len(v), 'type': 'VEC3', 'min': v_min, 'max': v_max})
        accessors.append({'bufferView': base_bv + 1, 'byteOffset': 0, 'componentType': 5126, 'count': len(n), 'type': 'VEC3'})
        accessors.append({'bufferView': base_bv + 2, 'byteOffset': 0, 'componentType': 5126, 'count': len(uv), 'type': 'VEC2'})
        accessors.append({'bufferView': base_bv + 3, 'byteOffset': 0, 'componentType': 5125, 'count': len(indices) * 3, 'type': 'SCALAR'})

        mesh_idx = len(gltf_meshes)
        gltf_meshes.append({
            'name': m.get('name', f'mesh_{idx}'),
            'primitives': [{
                'attributes': {
                    'POSITION': base_acc + 0,
                    'NORMAL': base_acc + 1,
                    'TEXCOORD_0': base_acc + 2
                },
                'indices': base_acc + 3
            }]
        })
        nodes.append({'mesh': mesh_idx, 'name': m.get('name', f'node_{idx}')})

    # Pad total buffer to 4 bytes
    pad = (4 - (len(bin_buffer) % 4)) % 4
    bin_buffer.extend(b'\x00' * pad)

    gltf = {
        'asset': {'version': '2.0', 'generator': 'EvoriqueArchPBR_v2'},
        'scenes': [{'nodes': list(range(len(nodes)))}],
        'nodes': nodes,
        'meshes': gltf_meshes,
        'accessors': accessors,
        'bufferViews': buffer_views,
        'buffers': [{'byteLength': len(bin_buffer)}]
    }

    json_bytes = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
    json_pad = (4 - (len(json_bytes) % 4)) % 4
    json_bytes += b' ' * json_pad

    total_len = 12 + 8 + len(json_bytes) + 8 + len(bin_buffer)
    header = struct.pack('<III', 0x46546C67, 2, total_len)
    chunk0_hdr = struct.pack('<II', len(json_bytes), 0x4E4F534A)
    chunk1_hdr = struct.pack('<II', len(bin_buffer), 0x004E4942)

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'wb') as f:
        f.write(header)
        f.write(chunk0_hdr)
        f.write(json_bytes)
        f.write(chunk1_hdr)
        f.write(bin_buffer)
    print(f"Exported: {filepath} ({len(header) + len(chunk0_hdr) + len(json_bytes) + len(chunk1_hdr) + len(bin_buffer)} bytes)")


# ==============================================================================
# 1. GENERATE MONUMENTAL ARCHITECTURAL PORTAL (portal.glb)
# Center: [0, 2.8, 14.0]. Vertical clearance: Y = 1.0 to 3.8.
# ==============================================================================
def generate_portal():
    print("Generating architectural portal...")
    
    # Profile of the oculus architrave (radius R, z-offset Z, normal_dr, normal_dz)
    # The profile extends from outer radius 3.3m down to inner aperture radius 1.84m.
    # The depth extends from Z = +0.55m to Z = -0.55m.
    profile = [
        # (r, z)
        (3.30, -0.50),  # Back outer edge
        (3.30,  0.42),  # Outer rim
        (3.22,  0.50),  # Outer 45-deg chamfer
        (2.95,  0.50),  # Front architrave band
        (2.90,  0.45),  # Front fillet step
        (2.75,  0.45),  # Second tier
        (2.70,  0.40),  # Step
        (2.35,  0.40),  # Main limestone face
        (2.30,  0.30),  # Deep inner chamfer
        (2.08,  0.30),  # Recessed bronze channel shelf
        (2.05,  0.22),  # Bronze channel drop
        (1.95,  0.22),  # Bronze band
        (1.90,  0.15),  # Inner transition
        (1.84,  0.08),  # Aperture inner lip
        (1.84, -0.40),  # Inner cylindrical aperture tunnel
        (1.92, -0.50),  # Back chamfer
        (3.20, -0.50),  # Back face
    ]

    segments = 64
    num_p = len(profile)
    vertices = []
    normals = []
    uvs = []
    indices = []

    # Center of rotation is [0, 2.8, 14.0]
    cx, cy, cz = 0.0, 2.8, 14.0

    for s in range(segments + 1):
        angle = (2.0 * math.pi * s) / segments
        cos_a = math.cos(angle)
        sin_a = math.sin(angle)
        u = s / segments

        for p_idx, (r, z) in enumerate(profile):
            # Coordinates in world space
            x = cx + r * cos_a
            y = cy + r * sin_a
            z_world = cz + z
            vertices.append([x, y, z_world])

            # UV coordinates
            v = p_idx / (num_p - 1)
            uvs.append([u * 6.0, v * 2.0])

            # Approximate normal from radial direction and z profile
            # Profile tangent
            if p_idx == 0:
                p_next = profile[1]
                p_prev = profile[0]
            elif p_idx == num_p - 1:
                p_next = profile[-1]
                p_prev = profile[-2]
            else:
                p_next = profile[p_idx + 1]
                p_prev = profile[p_idx - 1]

            dr = p_next[0] - p_prev[0]
            dz = p_next[1] - p_prev[1]
            # Normal perpendicular to tangent in (r, z) plane: (dz, -dr)
            nr = dz
            nz = -dr
            length = math.sqrt(nr * nr + nz * nz)
            if length > 1e-6:
                nr /= length
                nz /= length
            else:
                nr, nz = 1.0, 0.0

            nx = nr * cos_a
            ny = nr * sin_a
            normals.append([nx, ny, nz])

    # Build quads / triangles
    for s in range(segments):
        for p in range(num_p - 1):
            i0 = s * num_p + p
            i1 = (s + 1) * num_p + p
            i2 = (s + 1) * num_p + (p + 1)
            i3 = s * num_p + (p + 1)
            indices.append([i0, i1, i2])
            indices.append([i0, i2, i3])

    ring_mesh = {
        'name': 'MonumentalPortalOculus',
        'vertices': np.array(vertices, dtype=np.float32),
        'normals': np.array(normals, dtype=np.float32),
        'uvs': np.array(uvs, dtype=np.float32),
        'indices': np.array(indices, dtype=np.uint32)
    }

    # =========================================================================
    # BASE PEDESTAL PLINTH with chamfered top edges and shadow reveal
    # Width = 7.6, Depth = 2.2, Height = 0.75, centered at Z = 14.0
    # =========================================================================
    p_verts = []
    p_norms = []
    p_uvs = []
    p_indices = []

    # Create a beveled box for the pedestal
    def add_beveled_box(x_min, x_max, y_min, y_max, z_min, z_max, bevel=0.06):
        # 8 main corners with bevel
        # Top face with inset
        # Front face
        # For simplicity and crisp normals, define faces cleanly
        faces = [
            # Front face (Z+)
            {'quad': [[x_min+bevel, y_min, z_max], [x_max-bevel, y_min, z_max], [x_max-bevel, y_max-bevel, z_max], [x_min+bevel, y_max-bevel, z_max]], 'norm': [0, 0, 1]},
            # Back face (Z-)
            {'quad': [[x_max-bevel, y_min, z_min], [x_min+bevel, y_min, z_min], [x_min+bevel, y_max-bevel, z_min], [x_max-bevel, y_max-bevel, z_min]], 'norm': [0, 0, -1]},
            # Left face (X-)
            {'quad': [[x_min, y_min, z_min+bevel], [x_min, y_min, z_max-bevel], [x_min, y_max-bevel, z_max-bevel], [x_min, y_max-bevel, z_min+bevel]], 'norm': [-1, 0, 0]},
            # Right face (X+)
            {'quad': [[x_max, y_min, z_max-bevel], [x_max, y_min, z_min+bevel], [x_max, y_max-bevel, z_min+bevel], [x_max, y_max-bevel, z_max-bevel]], 'norm': [1, 0, 0]},
            # Top face (Y+)
            {'quad': [[x_min+bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_min+bevel], [x_min+bevel, y_max, z_min+bevel]], 'norm': [0, 1, 0]},
            # Top-Front Bevel
            {'quad': [[x_min+bevel, y_max-bevel, z_max], [x_max-bevel, y_max-bevel, z_max], [x_max-bevel, y_max, z_max-bevel], [x_min+bevel, y_max, z_max-bevel]], 'norm': [0, 0.707, 0.707]},
            # Top-Back Bevel
            {'quad': [[x_max-bevel, y_max-bevel, z_min], [x_min+bevel, y_max-bevel, z_min], [x_min+bevel, y_max, z_min+bevel], [x_max-bevel, y_max, z_min+bevel]], 'norm': [0, 0.707, -0.707]},
            # Top-Left Bevel
            {'quad': [[x_min, y_max-bevel, z_max-bevel], [x_min, y_max-bevel, z_min+bevel], [x_min+bevel, y_max, z_min+bevel], [x_min+bevel, y_max, z_max-bevel]], 'norm': [-0.707, 0.707, 0]},
            # Top-Right Bevel
            {'quad': [[x_max, y_max-bevel, z_min+bevel], [x_max, y_max-bevel, z_max-bevel], [x_max-bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_min+bevel]], 'norm': [0.707, 0.707, 0]},
            # Bottom face (Y-)
            {'quad': [[x_min, y_min, z_min], [x_max, y_min, z_min], [x_max, y_min, z_max], [x_min, y_min, z_max]], 'norm': [0, -1, 0]}
        ]
        for f in faces:
            start_i = len(p_verts)
            q = f['quad']
            n = f['norm']
            for v_pos in q:
                p_verts.append(v_pos)
                p_norms.append(n)
                p_uvs.append([v_pos[0] * 0.5, v_pos[2] * 0.5])
            p_indices.append([start_i, start_i+1, start_i+2])
            p_indices.append([start_i, start_i+2, start_i+3])

    # Main Plinth: Y = 0.08 to 0.72, Z = 14.0 - 1.1 to 14.0 + 1.1, X = -3.8 to +3.8
    add_beveled_box(-3.8, 3.8, 0.08, 0.74, 14.0 - 1.1, 14.0 + 1.1, bevel=0.06)
    # Recessed Sub-Base Footing: Y = -0.05 to 0.08
    add_beveled_box(-3.9, 3.9, -0.05, 0.08, 14.0 - 1.15, 14.0 + 1.15, bevel=0.03)

    pedestal_mesh = {
        'name': 'MonumentalPedestalPlinth',
        'vertices': np.array(p_verts, dtype=np.float32),
        'normals': np.array(p_norms, dtype=np.float32),
        'uvs': np.array(p_uvs, dtype=np.float32),
        'indices': np.array(p_indices, dtype=np.uint32)
    }

    export_glb('public/models/portal/portal.glb', [ring_mesh, pedestal_mesh])


# ==============================================================================
# 2. GENERATE ARCHITECTURAL PROMENADE & WATER BASIN (promenade.glb)
# ==============================================================================
def generate_promenade():
    print("Generating architectural promenade...")
    verts = []
    norms = []
    uvs = []
    indices = []

    def add_slab(x_min, x_max, y_min, y_max, z_min, z_max, bevel=0.04):
        faces = [
            # Top
            {'quad': [[x_min+bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_min+bevel], [x_min+bevel, y_max, z_min+bevel]], 'norm': [0, 1, 0]},
            # Front
            {'quad': [[x_min+bevel, y_min, z_max], [x_max-bevel, y_min, z_max], [x_max-bevel, y_max-bevel, z_max], [x_min+bevel, y_max-bevel, z_max]], 'norm': [0, 0, 1]},
            # Back
            {'quad': [[x_max-bevel, y_min, z_min], [x_min+bevel, y_min, z_min], [x_min+bevel, y_max-bevel, z_min], [x_max-bevel, y_max-bevel, z_min]], 'norm': [0, 0, -1]},
            # Left
            {'quad': [[x_min, y_min, z_min+bevel], [x_min, y_min, z_max-bevel], [x_min, y_max-bevel, z_max-bevel], [x_min, y_max-bevel, z_min+bevel]], 'norm': [-1, 0, 0]},
            # Right
            {'quad': [[x_max, y_min, z_max-bevel], [x_max, y_min, z_min+bevel], [x_max, y_max-bevel, z_min+bevel], [x_max, y_max-bevel, z_max-bevel]], 'norm': [1, 0, 0]},
            # Top-Front Bevel
            {'quad': [[x_min+bevel, y_max-bevel, z_max], [x_max-bevel, y_max-bevel, z_max], [x_max-bevel, y_max, z_max-bevel], [x_min+bevel, y_max, z_max-bevel]], 'norm': [0, 0.707, 0.707]},
            # Top-Back Bevel
            {'quad': [[x_max-bevel, y_max-bevel, z_min], [x_min+bevel, y_max-bevel, z_min], [x_min+bevel, y_max, z_min+bevel], [x_max-bevel, y_max, z_min+bevel]], 'norm': [0, 0.707, -0.707]},
            # Top-Left Bevel
            {'quad': [[x_min, y_max-bevel, z_max-bevel], [x_min, y_max-bevel, z_min+bevel], [x_min+bevel, y_max, z_min+bevel], [x_min+bevel, y_max, z_max-bevel]], 'norm': [-0.707, 0.707, 0]},
            # Top-Right Bevel
            {'quad': [[x_max, y_max-bevel, z_min+bevel], [x_max, y_max-bevel, z_max-bevel], [x_max-bevel, y_max, z_max-bevel], [x_max-bevel, y_max, z_min+bevel]], 'norm': [0.707, 0.707, 0]},
        ]
        for f in faces:
            start_i = len(verts)
            q = f['quad']
            n = f['norm']
            for v_pos in q:
                verts.append(v_pos)
                norms.append(n)
                uvs.append([v_pos[0] * 0.4, v_pos[2] * 0.4])
            indices.append([start_i, start_i+1, start_i+2])
            indices.append([start_i, start_i+2, start_i+3])

    # 1. Main Honed Promenade Runway: X = -3.5 to 3.5, Z = 15.2 to 29.5
    add_slab(-3.5, 3.5, -0.15, 0.05, 15.2, 29.5, bevel=0.04)

    # 2. Monumental Terraced Steps:
    # Step 1: Z = 16.8 to 18.2, Y = 0.05 to 0.17
    add_slab(-3.8, 3.8, -0.15, 0.17, 16.6, 18.2, bevel=0.03)
    # Step 2: Z = 15.2 to 16.8, Y = 0.17 to 0.29
    add_slab(-3.7, 3.7, -0.15, 0.29, 15.2, 16.8, bevel=0.03)

    # 3. Flanking Reflecting Pool Stone Coping Curbs
    # Left Pool Curb: X = -12.0 to -5.0, Z = 15.5 to 28.5
    # Outer curb rim:
    add_slab(-12.2, -4.8, -0.25, 0.12, 15.0, 29.0, bevel=0.05)
    # Right Pool Curb: X = 5.0 to 12.0, Z = 15.5 to 28.5
    add_slab(4.8, 12.2, -0.25, 0.12, 15.0, 29.0, bevel=0.05)

    prom_mesh = {
        'name': 'ArchitecturalPromenade',
        'vertices': np.array(verts, dtype=np.float32),
        'normals': np.array(norms, dtype=np.float32),
        'uvs': np.array(uvs, dtype=np.float32),
        'indices': np.array(indices, dtype=np.uint32)
    }

    export_glb('public/models/architecture/promenade.glb', [prom_mesh])


# ==============================================================================
# 3. GENERATE COLUMNAR MEDITERRANEAN CYPRESS (cypress.glb)
# High-density organic foliage tiers, natural silhouette, no primitive cones!
# ==============================================================================
def generate_cypress():
    print("Generating Mediterranean cypress 3D model...")
    verts = []
    norms = []
    uvs = []
    indices = []

    # 1. Modeled Tapered Trunk
    trunk_segs = 12
    trunk_height_segs = 16
    trunk_max_h = 3.5
    for h_i in range(trunk_height_segs + 1):
        t = h_i / trunk_height_segs
        y = t * trunk_max_h
        # Natural root flare at base
        r = 0.16 * (1.0 - t * 0.75) + (0.08 if t < 0.1 else 0.0)
        # Subtle organic wobble
        wobble_x = math.sin(t * 3.14 * 2.0) * 0.02
        wobble_z = math.cos(t * 3.14 * 1.5) * 0.02

        for s in range(trunk_segs + 1):
            ang = 2.0 * math.pi * s / trunk_segs
            x = math.cos(ang) * r + wobble_x
            z = math.sin(ang) * r + wobble_z
            verts.append([x, y, z])
            norms.append([math.cos(ang), 0.1, math.sin(ang)])
            uvs.append([s / trunk_segs, t * 4.0])

    for h_i in range(trunk_height_segs):
        for s in range(trunk_segs):
            i0 = h_i * (trunk_segs + 1) + s
            i1 = (h_i + 1) * (trunk_segs + 1) + s
            i2 = (h_i + 1) * (trunk_segs + 1) + (s + 1)
            i3 = h_i * (trunk_segs + 1) + (s + 1)
            indices.append([i0, i1, i2])
            indices.append([i0, i2, i3])

    # 2. Organic Foliage Canopy (Dense Columnar Cypress Silhouette)
    # We build 32 staggered, lobed foliage layers with natural curvature and leaf normals
    num_tiers = 36
    tier_segs = 18
    foliage_base_y = 0.75
    foliage_top_y = 7.2

    for tier in range(num_tiers):
        t = tier / (num_tiers - 1)
        y_center = foliage_base_y + t * (foliage_top_y - foliage_base_y)

        # Profile radius of an Italian Cypress (widest in lower-third, slender flame top)
        if t < 0.25:
            max_r = 0.45 * math.sin(t / 0.25 * math.pi * 0.5)
        else:
            max_r = 0.45 * (1.0 - (t - 0.25) / 0.75)**0.7

        # Height of this foliage skirt
        skirt_h = 0.32 + 0.15 * (1.0 - t)
        y_top = y_center + skirt_h * 0.5
        y_bot = y_center - skirt_h * 0.5

        # Angular offset to break symmetry
        angle_jitter = tier * 1.37

        start_v_idx = len(verts)

        # Top apex vertex of this tier
        apex_idx = len(verts)
        verts.append([0.0, y_top, 0.0])
        norms.append([0.0, 1.0, 0.0])
        uvs.append([0.5, 1.0])

        # Rim vertices
        for s in range(tier_segs + 1):
            ang = 2.0 * math.pi * s / tier_segs + angle_jitter
            # Organic lobing (3-lobe harmonic pattern)
            r_pert = max_r * (1.0 + 0.14 * math.sin(ang * 4.0 + tier) + 0.08 * math.cos(ang * 7.0))
            x = math.cos(ang) * r_pert
            z = math.sin(ang) * r_pert

            # Outer rim point
            verts.append([x, y_bot, z])
            # Normal angled outward and upward for realistic tree lighting
            nx = math.cos(ang) * 0.85
            ny = 0.45
            nz = math.sin(ang) * 0.85
            l = math.sqrt(nx*nx + ny*ny + nz*nz)
            norms.append([nx/l, ny/l, nz/l])
            uvs.append([s / tier_segs, 0.0])

        for s in range(tier_segs):
            v0 = apex_idx
            v1 = apex_idx + 1 + s
            v2 = apex_idx + 1 + (s + 1)
            indices.append([v0, v1, v2])

    cypress_mesh = {
        'name': 'ItalianColumnarCypress',
        'vertices': np.array(verts, dtype=np.float32),
        'normals': np.array(norms, dtype=np.float32),
        'uvs': np.array(uvs, dtype=np.float32),
        'indices': np.array(indices, dtype=np.uint32)
    }

    export_glb('public/models/landscaping/cypress.glb', [cypress_mesh])


if __name__ == '__main__':
    print("=== BUILDING ARCHITECTURAL GLB ASSETS ===")
    generate_portal()
    generate_promenade()
    generate_cypress()
    print("=== ALL ASSETS GENERATED SUCCESSFULLY ===")
