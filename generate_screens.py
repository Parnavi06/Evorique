import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/screens', exist_ok=True)

# Helper to create crisp high-res UI screen textures (1920x1080)
W, H = 1920, 1080

def draw_topbar(draw, title, subtitle):
    # Dark modern topbar
    draw.rectangle([0, 0, W, 56], fill="#1E201E")
    # Window controls
    draw.ellipse([24, 20, 36, 32], fill="#FF5F56")
    draw.ellipse([46, 20, 58, 32], fill="#FFBD2E")
    draw.ellipse([68, 20, 80, 32], fill="#27C93F")
    
    # Title
    draw.text((110, 18), f"EVORIQUE OS // {title.upper()}", fill="#C9C1B3")
    draw.text((W - 320, 18), subtitle, fill="#9CA995")

# 1. SCREEN 01: IDEATION BOARDROOM (Aurora Concept & Strategic Questions)
img_ideation = Image.new('RGB', (W, H), color='#FAF9F6')
d = ImageDraw.Draw(img_ideation)
draw_topbar(d, "Ideation Suite 01", "PROJECT: AURORA // PHASE 01")

# Left Sidebar
d.rectangle([0, 56, 380, H], fill="#F4F1E9", outline="#E8E7E0")
d.text((40, 90), "STRATEGIC INQUIRY", fill="#252824")
d.text((40, 130), "• Problem Definition", fill="#B69A70")
d.text((40, 170), "• Market Friction Points", fill="#777970")
d.text((40, 210), "• Cognitive Load Audit", fill="#777970")
d.text((40, 250), "• Opportunity Matrix", fill="#777970")
d.text((40, 290), "• North Star Trajectory", fill="#777970")

# Central Concept Diagram
d.rectangle([420, 90, W - 40, H - 40], fill="#FFFFFF", outline="#E8E7E0")
d.text((460, 130), "PROJECT AURORA: CONCEPT ARCHITECTURE", fill="#252824")
d.text((460, 170), "Hypothesis: Can financial interfaces replace anxiety with spatial serenity?", fill="#777970")

# 3 Feature Pillars
cards = [
    ("01. AMBIENT CAPITAL TOPOLOGY", "Continuous liquidity curves replace static tabular ledgers.", "#F4F1E9"),
    ("02. PREDICTIVE SAFE-TO-SPEND", "Real-time horizon calculations forecasting automated commitments.", "#FAF9F6"),
    ("03. BIOMETRIC SOVEREIGN SIGNING", "Zero-knowledge physical affordances for high-value actions.", "#F4F1E9")
]
for idx, (title, desc, bg) in enumerate(cards):
    x0 = 460 + idx * 450
    d.rectangle([x0, 240, x0 + 420, 560], fill=bg, outline="#C9C1B3")
    d.text((x0 + 24, 270), title, fill="#B69A70")
    d.text((x0 + 24, 320), desc, fill="#252824")
    # Graph curve mock
    d.line([(x0 + 24, 500), (x0 + 120, 440), (x0 + 220, 480), (x0 + 380, 390)], fill="#B69A70", width=4)

d.rectangle([460, 620, W - 80, 980], fill="#F4F1E9", outline="#E8E7E0")
d.text((500, 660), "EXECUTIVE DECISION MEMO", fill="#252824")
d.text((500, 710), "Approved for Strategy & Discovery phase. Core focus: Eliminate all unnecessary friction.", fill="#777970")
d.text((500, 760), "Directives: 1. Strict light-theme elegance  2. 60fps WebGL canvas  3. Unified multi-device token system", fill="#9CA995")
img_ideation.save('public/screens/ideation_screen.jpg', quality=95)

# 2. SCREEN 02: STRATEGY USER JOURNEY & IA MAP
img_strategy = Image.new('RGB', (W, H), color='#FAF9F6')
d = ImageDraw.Draw(img_strategy)
draw_topbar(d, "Strategy & Discovery", "USER JOURNEY // IA MAPPING")

# Journey nodes
d.text((80, 90), "AURORA USER JOURNEY ARCHITECTURE", fill="#252824")
d.text((80, 130), "Mapping behavioral friction to deliberate design opportunities", fill="#777970")

steps = ["01. ONBOARDING", "02. LIQUIDITY MAP", "03. SAFE ALLOCATION", "04. VAULT CREATION", "05. ASSET TRANSFER"]
for i, step in enumerate(steps):
    x = 80 + i * 360
    d.rectangle([x, 220, x + 310, 480], fill="#FFFFFF", outline="#B69A70")
    d.text((x + 20, 250), step, fill="#B69A70")
    d.text((x + 20, 300), f"Friction: Tabular noise\nIntervention: Spatial curve\nLatency: < 12ms", fill="#252824")
    if i < 4:
        d.line([(x + 310, 350), (x + 360, 350)], fill="#9CA995", width=4)

# Information Architecture Diagram
d.rectangle([80, 540, W - 80, H - 60], fill="#F4F1E9", outline="#E8E7E0")
d.text((120, 580), "INFORMATION ARCHITECTURE TREE & SYSTEM SCOPING", fill="#252824")
d.rectangle([120, 640, 480, 760], fill="#FFFFFF", outline="#C9C1B3")
d.text((140, 670), "ROOT: AURORA CORE", fill="#B69A70")
d.text((140, 700), "• Vault Manager\n• Horizon Engine", fill="#777970")

d.rectangle([540, 640, 900, 760], fill="#FFFFFF", outline="#C9C1B3")
d.text((560, 670), "NODE: TREASURY", fill="#B69A70")
d.text((560, 700), "• Multi-Currency Yield\n• Biometric Ledger", fill="#777970")

d.rectangle([960, 640, 1320, 760], fill="#FFFFFF", outline="#C9C1B3")
d.text((980, 670), "NODE: SPATIAL CANVAS", fill="#B69A70")
d.text((980, 700), "• WebGL Topology\n• Gesture Protocol", fill="#777970")
img_strategy.save('public/screens/strategy_screen.jpg', quality=95)

# 3. SCREEN 03: DESIGN STUDIO FIGMA CANVAS
img_design = Image.new('RGB', (W, H), color='#252824')
d = ImageDraw.Draw(img_design)
draw_topbar(d, "Design Lab", "FIGMA ENTERPRISE // AURORA DESIGN SYSTEM")

# Left layers panel
d.rectangle([0, 56, 320, H], fill="#1C1E1C", outline="#333")
d.text((24, 80), "LAYERS", fill="#B69A70")
layers = ["❖ Aurora / Desktop / Hero", "❖ Aurora / Mobile / Sheet", "❖ Tokens / Color / Ivory", "❖ Tokens / Type / Serif", "❖ Components / VaultCard", "❖ Components / HorizonCurve"]
for idx, l in enumerate(layers):
    d.text((24, 130 + idx * 45), l, fill="#E8E7E0")

# Center Canvas (White working artboard)
d.rectangle([360, 90, 1540, 1020], fill="#FAF9F6", outline="#B69A70")
d.text((400, 130), "AURORA — DESIGN SYSTEM V2.4", fill="#252824")
d.text((400, 180), "Typography: Cormorant Garamond 64px / Inter 14px", fill="#777970")

# Palette swatch tokens
colors = [("#F4F1E9", "Ivory"), ("#E8E7E0", "Porcelain"), ("#B69A70", "Champagne"), ("#9CA995", "Sage"), ("#252824", "Charcoal")]
for idx, (col, name) in enumerate(colors):
    cx = 400 + idx * 180
    d.rectangle([cx, 240, cx + 140, 340], fill=col, outline="#C9C1B3")
    d.text((cx, 355), name, fill="#252824")

# Mock UI wireframe component
d.rectangle([400, 420, 1480, 940], fill="#FFFFFF", outline="#E8E7E0")
d.text((440, 460), "Aurora / Interactive Vault Horizon", fill="#252824")
d.text((440, 500), "$48,290.45", fill="#B69A70")
d.rectangle([440, 560, 800, 740], fill="#F4F1E9", outline="#B69A70")
d.text((460, 580), "Nordic Treasury Vault", fill="#252824")
d.text((460, 620), "Yield: 4.85% APY • Liquid", fill="#9CA995")

# Right properties panel
d.rectangle([1580, 56, W, H], fill="#1C1E1C", outline="#333")
d.text((1610, 80), "DESIGN TOKENS", fill="#B69A70")
d.text((1610, 130), "Radius: 32px\nBlur: 16px\nShadow: 0 20px 40px\nEasing: spring(40, 8)", fill="#E8E7E0")
img_design.save('public/screens/design_screen.jpg', quality=95)

# 4. SCREEN 04: ENGINEERING LAB CODE EDITOR (TypeScript + React + Three.js)
img_code = Image.new('RGB', (W, H), color='#161816')
d = ImageDraw.Draw(img_code)
draw_topbar(d, "Engineering Lab", "VS CODE // AURORA-CORE.TSX")

# File Explorer
d.rectangle([0, 56, 320, H], fill="#1C1E1C", outline="#252824")
d.text((24, 80), "EXPLORER", fill="#B69A70")
files = ["▼ src", "  ▼ components", "    ▶ Canvas.tsx", "    ▶ VaultMap.tsx", "    ▶ HorizonCurve.tsx", "  ▼ shaders", "    ▶ topology.frag", "  ▶ package.json", "  ▶ tsconfig.json"]
for idx, f in enumerate(files):
    d.text((24, 120 + idx * 40), f, fill="#C9C1B3")

# Code editor lines
code_lines = [
    ("import React, { useMemo } from 'react';", "#B69A70"),
    ("import { useFrame, useThree } from '@react-three/fiber';", "#B69A70"),
    ("import * as THREE from 'three';", "#B69A70"),
    ("", "#FFF"),
    ("// Aurora Spatial Liquidity Horizon Engine", "#777970"),
    ("export function AuroraHorizonEngine({ vaultData, userAddress }: AuroraProps) {", "#9CA995"),
    ("  const { gl, camera } = useThree();", "#E8E7E0"),
    ("  const liquiditySpline = useMemo(() => calculateSafeHorizon(vaultData), [vaultData]);", "#E8E7E0"),
    ("", "#FFF"),
    ("  useFrame((state, delta) => {", "#B69A70"),
    ("    // Sub-16ms target 60fps render loop", "#777970"),
    ("    gl.toneMapping = THREE.ACESFilmicToneMapping;", "#E8E7E0"),
    ("    gl.toneMappingExposure = 1.08;", "#E8E7E0"),
    ("    liquiditySpline.uniforms.uTime.value += delta * 0.4;", "#9CA995"),
    ("  });", "#B69A70"),
    ("", "#FFF"),
    ("  return (", "#B69A70"),
    ("    <mesh geometry={liquiditySpline.geometry} receiveShadow castShadow>", "#E8E7E0"),
    ("      <shaderMaterial attach='material' {...liquidityShader} />", "#E8E7E0"),
    ("    </mesh>", "#E8E7E0"),
    ("  );", "#B69A70"),
    ("}", "#9CA995"),
    ("", "#FFF"),
    ("// STATUS: BUILD 428 // 0 ERRORS // COMPILED IN 840ms", "#27C93F")
]

for idx, (code, col) in enumerate(code_lines):
    # Line number
    d.text((350, 80 + idx * 38), f"{idx+1:02d}", fill="#555")
    d.text((400, 80 + idx * 38), code, fill=col)

# Terminal at bottom
d.rectangle([320, 880, W, H], fill="#111211", outline="#252824")
d.text((350, 900), "TERMINAL: zsh", fill="#B69A70")
d.text((350, 940), "$ pnpm test --run  →  ✓ 428 tests passed (100%)  [coverage: 98.4%]", fill="#27C93F")
d.text((350, 980), "$ vite build        →  ✓ built in 8.42s (zero errors, bundle: 279kb gzip)", fill="#27C93F")
img_code.save('public/screens/code_screen.jpg', quality=95)

# 5. SCREEN 05: QUALITY LAB RELEASE APPROVAL DASHBOARD
img_qa = Image.new('RGB', (W, H), color='#FAF9F6')
d = ImageDraw.Draw(img_qa)
draw_topbar(d, "Quality & Validation Lab", "RELEASE CANDIDATE V2.4 // APPROVAL GATE")

d.text((80, 90), "AURORA QUALITY ASSURANCE CERTIFICATION", fill="#252824")
d.text((80, 130), "Automated end-to-end verification, performance budgets, and security audits", fill="#777970")

# 4 Status KPI cards
kpis = [
    ("LIGHTHOUSE SCORE", "100 / 100", "Performance, A11y, SEO, Best Practices", "#27C93F"),
    ("RENDER FRAME RATE", "60 FPS", "Zero frame drops across tested devices", "#27C93F"),
    ("TEST COVERAGE", "99.4%", "428 unit, integration, and E2E suites", "#27C93F"),
    ("SECURITY AUDIT", "VERIFIED", "Zero-knowledge encryption & penetration pass", "#27C93F")
]
for idx, (label, val, note, col) in enumerate(kpis):
    x = 80 + idx * 440
    d.rectangle([x, 200, x + 400, 420], fill="#FFFFFF", outline="#E8E7E0")
    d.text((x + 24, 230), label, fill="#777970")
    d.text((x + 24, 280), val, fill=col)
    d.text((x + 24, 350), note, fill="#252824")

# Large Green Release Approval Banner
d.rectangle([80, 480, W - 80, 780], fill="#F4F1E9", outline="#9CA995")
d.text((130, 530), "PRODUCTION RELEASE APPROVAL: GRANTED", fill="#27C93F")
d.text((130, 590), "Target Artifact: Aurora Financial Platform (Conceptual Study)", fill="#252824")
d.text((130, 640), "Sign-off: Lead Architect, Product Director, Security Officer, QA Lead", fill="#777970")
d.text((130, 690), "Status: Ready for transition to Launch Pavilion.", fill="#B69A70")

img_qa.save('public/screens/qa_screen.jpg', quality=95)
print("ALL 5 SCREEN ASSETS GENERATED SUCCESSFULLY!")
