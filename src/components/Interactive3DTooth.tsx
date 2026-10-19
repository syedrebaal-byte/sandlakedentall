import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Layers, Eye, Sparkles, Check, Info, ShieldCheck } from 'lucide-react';

type VisualMode = 'anatomy' | 'veneer' | 'implant' | 'invisalign';

interface LayerInfo {
  name: string;
  color: string;
  description: string;
}

export const Interactive3DTooth: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<VisualMode>('veneer');
  const [rotationY, setRotationY] = useState(0.25);
  const [rotationX, setRotationX] = useState(0.1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [exploded, setExploded] = useState(false);
  const [cutaway, setCutaway] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState<string | null>('Porcelain Veneer');

  // Animation loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentRotY = rotationY;
    let currentRotX = rotationX;

    const render = () => {
      if (autoRotate && !isDragging) {
        currentRotY += 0.005;
        setRotationY(currentRotY);
      } else {
        currentRotY = rotationY;
        currentRotX = rotationX;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const scale = Math.min(width, height) / 380;

      // Draw subtle grid platform underneath
      ctx.save();
      ctx.translate(centerX, centerY + 140 * scale);
      ctx.scale(1, 0.45);
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 150 * scale);
      grad.addColorStop(0, 'rgba(15, 30, 54, 0.12)');
      grad.addColorStop(1, 'rgba(15, 30, 54, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 150 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render 3D Procedural Model based on mode
      render3DModel(ctx, centerX, centerY, scale, currentRotY, currentRotX, mode, exploded, cutaway);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationY, rotationX, autoRotate, isDragging, mode, exploded, cutaway]);

  // Procedural 3D rendering engine
  const render3DModel = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    s: number,
    rotY: number,
    rotX: number,
    currentMode: VisualMode,
    isExploded: boolean,
    isCutaway: boolean
  ) => {
    ctx.save();
    ctx.translate(cx, cy);

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    // 3D Point Projection Helper
    const project = (x: number, y: number, z: number) => {
      // Rotate Y
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate X
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      // Perspective
      const fov = 400;
      const p = fov / (fov + z2);
      return {
        x: x1 * p * s,
        y: y2 * p * s,
        z: z2,
      };
    };

    const explodeOffset = isExploded ? 45 * s : 0;

    // Mode-specific renderers
    if (currentMode === 'implant') {
      // 1. Jawbone foundation
      ctx.fillStyle = 'rgba(215, 195, 175, 0.35)';
      ctx.strokeStyle = 'rgba(180, 150, 130, 0.5)';
      ctx.lineWidth = 1.5;
      drawPrism(ctx, project, -60, 40, -60, 120, 80, 120, '#E8D8C8', '#D4C0AD');

      // 2. Titanium Post (Screw Fixture)
      drawTitaniumScrew(ctx, project, 0, 45, 0, 18, 70, '#5A6B7C', '#8496A7', '#3C4B59');

      // 3. Precision Abutment (explodable)
      const abutmentY = -5 - explodeOffset * 0.5;
      drawAbutment(ctx, project, 0, abutmentY, 0, 22, 28, '#C4CBD2', '#A3ADB8');

      // 4. Zirconia Ceramic Crown (explodable)
      const crownY = -65 - explodeOffset;
      drawCrown(ctx, project, 0, crownY, 0, 48, 62, '#FFFFFF', '#EDE7DC', '#D1C7BA', isCutaway);
    } else if (currentMode === 'veneer') {
      // Natural tooth base
      drawToothRoot(ctx, project, 0, 50, 0, 28, 85, '#F7F1E5', '#E2D5BE');
      drawToothDentinCore(ctx, project, 0, -25, 0, 42, 55, '#F3E8CE', '#DCC8A0', isCutaway);

      // Handcrafted Porcelain Veneer Shell on Facial Side
      const veneerZ = -26 - (isExploded ? 35 : 0);
      drawVeneerFacet(ctx, project, 0, -28, veneerZ, 46, 58, '#FFFFFF', '#F0F6FA', '#C4DBE8');
    } else if (currentMode === 'invisalign') {
      // Natural complete tooth
      drawToothRoot(ctx, project, 0, 50, 0, 28, 85, '#F7F1E5', '#E2D5BE');
      drawCrown(ctx, project, 0, -30, 0, 48, 65, '#FFFDF8', '#F1E9DB', '#D6C8B4', false);

      // Clear Polyurethane Aligner overlay
      const alignerOffset = isExploded ? 25 : 0;
      drawAlignerCover(ctx, project, 0, -30 - alignerOffset, 0, 54, 70);
    } else {
      // Anatomy cutaway mode
      drawToothRoot(ctx, project, 0, 50, 0, 28, 85, '#F7F1E5', '#E2D5BE');
      drawToothDentinCore(ctx, project, 0, -25, 0, 42, 55, '#F3E8CE', '#DCC8A0', isCutaway);
      drawCrown(ctx, project, 0, -30, 0, 48, 65, '#FFFFFF', '#EDE5D5', '#D3C2A9', isCutaway);
      if (isCutaway) {
        drawPulpAndNerve(ctx, project, 0, 10, 0);
      }
    }

    ctx.restore();
  };

  // 3D Drawing primitives
  const drawCrown = (
    ctx: CanvasRenderingContext2D,
    project: (x: number, y: number, z: number) => { x: number; y: number; z: number },
    ox: number,
    oy: number,
    oz: number,
    w: number,
    h: number,
    colorTop: string,
    colorMid: string,
    colorBottom: string,
    isCut: boolean
  ) => {
    const steps = 18;
    const slices = 5;

    for (let j = 0; j < slices; j++) {
      const y1 = oy - h / 2 + (j * h) / slices;
      const y2 = oy - h / 2 + ((j + 1) * h) / slices;
      const r1 = (w / 2) * (1 - Math.pow(j / slices - 0.4, 2) * 0.3);
      const r2 = (w / 2) * (1 - Math.pow((j + 1) / slices - 0.4, 2) * 0.3);

      for (let i = 0; i < steps; i++) {
        const theta1 = (i * 2 * Math.PI) / steps;
        const theta2 = ((i + 1) * 2 * Math.PI) / steps;

        // Cutaway skip if enabled
        if (isCut && theta1 > 0 && theta2 < Math.PI * 0.9) continue;

        const p1 = project(ox + Math.cos(theta1) * r1, y1, oz + Math.sin(theta1) * r1);
        const p2 = project(ox + Math.cos(theta2) * r1, y1, oz + Math.sin(theta2) * r1);
        const p3 = project(ox + Math.cos(theta2) * r2, y2, oz + Math.sin(theta2) * r2);
        const p4 = project(ox + Math.cos(theta1) * r2, y2, oz + Math.sin(theta1) * r2);

        // Simple normal-based lighting
        const normZ = Math.sin((theta1 + theta2) / 2);
        const light = Math.max(0.2, (normZ + 1) / 2);

        ctx.fillStyle = j === 0 ? colorTop : j === 1 ? colorMid : colorBottom;
        ctx.globalAlpha = 0.94;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1.0;
  };

  const drawToothRoot = (
    ctx: CanvasRenderingContext2D,
    project: any,
    ox: number,
    oy: number,
    oz: number,
    w: number,
    h: number,
    topC: string,
    botC: string
  ) => {
    const steps = 14;
    const slices = 4;
    for (let j = 0; j < slices; j++) {
      const y1 = oy + (j * h) / slices;
      const y2 = oy + ((j + 1) * h) / slices;
      const r1 = (w / 2) * (1 - (j / slices) * 0.7);
      const r2 = (w / 2) * (1 - ((j + 1) / slices) * 0.7);

      for (let i = 0; i < steps; i++) {
        const t1 = (i * 2 * Math.PI) / steps;
        const t2 = ((i + 1) * 2 * Math.PI) / steps;
        const p1 = project(ox + Math.cos(t1) * r1, y1, oz + Math.sin(t1) * r1);
        const p2 = project(ox + Math.cos(t2) * r1, y1, oz + Math.sin(t2) * r1);
        const p3 = project(ox + Math.cos(t2) * r2, y2, oz + Math.sin(t2) * r2);
        const p4 = project(ox + Math.cos(t1) * r2, y2, oz + Math.sin(t1) * r2);

        ctx.fillStyle = j < 2 ? topC : botC;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(200, 180, 150, 0.25)';
        ctx.stroke();
      }
    }
  };

  const drawToothDentinCore = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number, w: number, h: number, c1: string, c2: string, isCut: boolean) => {
    if (!isCut) return;
    const pCenter = project(ox, oy, oz);
    const pTop = project(ox, oy - h / 2, oz);
    const pBot = project(ox, oy + h / 2, oz);
    const pRight = project(ox + w / 2, oy, oz);

    ctx.fillStyle = '#EBD5AA';
    ctx.beginPath();
    ctx.moveTo(pTop.x, pTop.y);
    ctx.lineTo(pRight.x, pRight.y);
    ctx.lineTo(pBot.x, pBot.y);
    ctx.lineTo(pCenter.x, pCenter.y);
    ctx.closePath();
    ctx.fill();
  };

  const drawPulpAndNerve = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number) => {
    const p1 = project(ox, oy - 25, oz);
    const p2 = project(ox + 4, oy, oz);
    const p3 = project(ox + 2, oy + 45, oz);

    ctx.strokeStyle = '#E11D48';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();

    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1.x - 2, p1.y);
    ctx.quadraticCurveTo(p2.x - 2, p2.y, p3.x - 1, p3.y);
    ctx.stroke();
  };

  const drawVeneerFacet = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number, w: number, h: number, c1: string, c2: string, c3: string) => {
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const u1 = -1 + (i * 2) / steps;
      const u2 = -1 + ((i + 1) * 2) / steps;
      const p1 = project(ox + u1 * (w / 2), oy - h / 2, oz + (1 - u1 * u1) * 8);
      const p2 = project(ox + u2 * (w / 2), oy - h / 2, oz + (1 - u2 * u2) * 8);
      const p3 = project(ox + u2 * (w / 2), oy + h / 2, oz + (1 - u2 * u2) * 8);
      const p4 = project(ox + u1 * (w / 2), oy + h / 2, oz + (1 - u1 * u1) * 8);

      const grad = ctx.createLinearGradient(p1.x, p1.y, p4.x, p4.y);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.5, '#E0F2FE');
      grad.addColorStop(1, '#BAE6FD');

      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  };

  const drawTitaniumScrew = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number, w: number, h: number, c1: string, c2: string, c3: string) => {
    const threads = 6;
    for (let t = 0; t < threads; t++) {
      const y = oy - h / 2 + (t * h) / threads;
      const r = (w / 2) * (1 - (t / threads) * 0.3);
      const p1 = project(ox - r, y, oz);
      const p2 = project(ox + r, y + 4, oz);
      const p3 = project(ox + r, y + 8, oz);
      const p4 = project(ox - r, y + 4, oz);

      ctx.fillStyle = t % 2 === 0 ? c1 : c2;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = c3;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawAbutment = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number, w: number, h: number, c1: string, c2: string) => {
    const p1 = project(ox - w / 2, oy - h / 2, oz);
    const p2 = project(ox + w / 2, oy - h / 2, oz);
    const p3 = project(ox + w / 3, oy + h / 2, oz);
    const p4 = project(ox - w / 3, oy + h / 2, oz);

    ctx.fillStyle = '#CBD5E1';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94A3B8';
    ctx.stroke();
  };

  const drawAlignerCover = (ctx: CanvasRenderingContext2D, project: any, ox: number, oy: number, oz: number, w: number, h: number) => {
    const p1 = project(ox - w / 2, oy - h / 2 - 4, oz);
    const p2 = project(ox + w / 2, oy - h / 2 - 4, oz);
    const p3 = project(ox + w / 2, oy + h / 2, oz);
    const p4 = project(ox - w / 2, oy + h / 2, oz);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const drawPrism = (ctx: any, project: any, x: number, y: number, z: number, w: number, h: number, d: number, topC: string, sideC: string) => {
    const p1 = project(x, y, z);
    const p2 = project(x + w, y, z);
    const p3 = project(x + w, y + h, z);
    const p4 = project(x, y + h, z);
    ctx.fillStyle = sideC;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
  };

  // Drag handlers for 360 degree user control
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    setRotationY((prev) => prev + deltaX * 0.01);
    setRotationX((prev) => Math.max(-0.4, Math.min(0.4, prev + deltaY * 0.005)));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;
    setRotationY((prev) => prev + deltaX * 0.015);
    setRotationX((prev) => Math.max(-0.4, Math.min(0.4, prev + deltaY * 0.008)));
    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const modeDescriptions: Record<VisualMode, { title: string; subtitle: string; details: string; tech: string }> = {
    veneer: {
      title: 'Handcrafted Porcelain Veneer Bonding',
      subtitle: 'Micro-thin feldspathic ceramic bonded to natural enamel',
      details: 'Dr. Maali removes less than 0.5mm of facial enamel, preserving maximum healthy tooth structure while creating lifelike depth, natural translucency, and flawless symmetry.',
      tech: 'Custom Feldspathic Ceramic & Resin Polymerization',
    },
    implant: {
      title: 'Titanium Dental Implant & Osseointegration',
      subtitle: 'Permanent anatomical root replacement with 3D CBCT guidance',
      details: 'A medical-grade titanium screw integrates biologically into the jawbone, topped by a precision custom abutment and a high-strength zirconia ceramic crown milled in our office.',
      tech: '3D Conebeam CT Guided Surgery & Glidewell FastMill iO',
    },
    invisalign: {
      title: 'Invisalign® 3D SmartTrack Aligner Simulation',
      subtitle: 'Calibrated biomechanical micro-movements without brackets',
      details: 'Custom polyurethane clear aligners apply targeted pressure to guide teeth gradually into ideal arch harmony. Monitored digitally with iTero 3D progress tracking.',
      tech: 'iTero Element 3D Digital Intraoral Scanning',
    },
    anatomy: {
      title: 'Internal Tooth Anatomy & Root Preservation',
      subtitle: 'Enamel, dentin core, pulp chamber, and sensory nerves',
      details: 'Understanding your tooth’s natural histology helps our doctors protect vitality through proactive preventative cleanings and minimally invasive restorations.',
      tech: 'High-Resolution Digital Sensor & Laser Diagnostics',
    },
  };

  return (
    <section id="interactive-3d" className="py-20 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
            <span>Interactive Visualizer</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36] mb-4">
            Explore Restorative Dental Engineering
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Drag to rotate the 3D model 360°. Toggle between smile makeovers, dental implants, Invisalign clear aligners, and internal tooth anatomy.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Controls & Mode Selector (Left 4 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 block">
                Select Procedure Visualizer
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'veneer', label: 'Porcelain Veneer' },
                    { id: 'implant', label: 'Dental Implant' },
                    { id: 'invisalign', label: 'Invisalign Aligner' },
                    { id: 'anatomy', label: 'Internal Anatomy' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMode(item.id);
                      setSelectedLayer(item.label);
                    }}
                    className={`px-3.5 py-2.5 text-xs font-medium rounded-lg text-left transition-all cursor-pointer ${
                      mode === item.id
                        ? 'bg-[#0F1E36] text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanatory Clinical Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-[#0F1E36] mb-1">
                {modeDescriptions[mode].title}
              </h3>
              <div className="text-xs text-[#0F1E36] font-medium mb-2.5">
                {modeDescriptions[mode].subtitle}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {modeDescriptions[mode].details}
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Technology:</span>
                <span>{modeDescriptions[mode].tech}</span>
              </div>
            </div>

            {/* Interactive View Toggles */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  autoRotate ? 'bg-slate-200/70 border-slate-300 text-slate-900' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Auto Rotate {autoRotate ? 'On' : 'Off'}</span>
              </button>
              <button
                onClick={() => setExploded(!exploded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  exploded ? 'bg-slate-200/70 border-slate-300 text-slate-900' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{exploded ? 'Collapse Layers' : 'Explode Layers'}</span>
              </button>
              <button
                onClick={() => setCutaway(!cutaway)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  cutaway ? 'bg-slate-200/70 border-slate-300 text-slate-900' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{cutaway ? 'Hide Cutaway' : 'Show Cutaway'}</span>
              </button>
            </div>
          </div>

          {/* 3D Canvas Viewport (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              className="relative w-full aspect-square max-w-[480px] bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200/90 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Micro-hint */}
              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-slate-500 border border-slate-200 flex items-center gap-1.5 pointer-events-none">
                <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Drag to Rotate · Touch Enabled</span>
              </div>

              {/* Active Mode Pill-less indicator */}
              <div className="absolute top-3 right-3 text-[11px] font-semibold text-slate-700 bg-white/90 backdrop-blur-xs px-3 py-1 rounded border border-slate-200 shadow-xs pointer-events-none">
                {mode === 'veneer' && 'Porcelain Veneer Layer'}
                {mode === 'implant' && 'Titanium + Zirconia Assembly'}
                {mode === 'invisalign' && 'SmartTrack Aligner Overlay'}
                {mode === 'anatomy' && 'Internal Histology Cross-Section'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
