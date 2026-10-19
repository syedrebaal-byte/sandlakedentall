import React, { useState, useRef } from 'react';
import { BEFORE_AFTER_CASES } from '../data/dentalData';
import { Sparkles, ArrowLeftRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface SmileGalleryProps {
  onOpenBooking: () => void;
}

export const SmileGallery: React.FC<SmileGalleryProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Restorative Transformations</span>
              <span aria-hidden="true">·</span>
              <span>Clinical Case Documentation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Real Patient Smile Makeovers
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            Drag the interactive slider to view the clinical transformation. Each restoration is custom-scanned and crafted for natural vitality and proportion.
          </p>
        </div>

        {/* Interactive Case Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Interactive Before/After Split Viewer (Left 7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-xl select-none cursor-ew-resize bg-slate-900"
              onMouseMove={(e) => {
                if (isSliding || e.buttons === 1) handleMove(e.clientX);
              }}
              onMouseDown={(e) => {
                setIsSliding(true);
                handleMove(e.clientX);
              }}
              onMouseUp={() => setIsSliding(false)}
              onTouchMove={handleTouchMove}
            >
              {/* "After" Image (Background Full) */}
              <img
                src={activeCase.afterImg}
                alt={`${activeCase.title} - Restored Final Outcome`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-[#0F1E36]/80 text-white backdrop-blur-md px-3 py-1 rounded text-xs font-semibold tracking-wider pointer-events-none">
                AFTER RESTORATION
              </div>

              {/* "Before" Image (Clipped with width %) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt={`${activeCase.title} - Initial Clinical Presentation`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white backdrop-blur-md px-3 py-1 rounded text-xs font-semibold tracking-wider">
                  BEFORE TREATMENT
                </div>
              </div>

              {/* Draggable Vertical Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#0F1E36] shadow-lg flex items-center justify-center border border-slate-200">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Helper Micro-Kicker */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white/90 px-3 py-1 rounded-full text-[11px] pointer-events-none flex items-center gap-1.5">
                <ArrowLeftRight className="w-3 h-3 text-[#38BDF8]" />
                <span>Drag slider left or right</span>
              </div>
            </div>

            {/* Case Selector Tabs */}
            <div className="flex items-center gap-2 mt-4">
              {BEFORE_AFTER_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`flex-1 text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    activeCaseIndex === idx
                      ? 'bg-slate-50 border-[#0F1E36] text-[#0F1E36] font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-serif font-bold truncate">{c.title}</div>
                  <div className="text-[11px] text-slate-500 truncate">{c.treatment}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Case Narrative (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1E36] uppercase tracking-wider mb-2">
                <span>Case #{activeCaseIndex + 1}</span>
                <span aria-hidden="true">·</span>
                <span>{activeCase.timeframe}</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#0F1E36] mb-3">
                {activeCase.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {activeCase.description}
              </p>

              <div className="space-y-3 text-xs border-t border-slate-200/80 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Treatment Performed:</span>
                  <span className="font-semibold text-slate-800 text-right">{activeCase.treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attending Doctor:</span>
                  <span className="font-semibold text-slate-800">{activeCase.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinical Focus:</span>
                  <span className="font-semibold text-slate-800">Natural translucency & minimal prep</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Consult Regarding Similar Treatment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Genuine disclaimer */}
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              *Individual anatomical responses and aesthetic results vary. A comprehensive clinical diagnostic examination and digital 3D scans are performed prior to any treatment plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
