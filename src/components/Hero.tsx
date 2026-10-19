import React from 'react';
import { Calendar, Phone, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F4EE] via-[#FAF9F6] to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 2-column editorial hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet unboxed kicker without generic pill borders */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-4">
              <span>Dr. Phillips</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Orlando & Maitland</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Est. 2002</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-[#0F1E36] leading-[1.12] tracking-tight mb-6 [text-wrap:balance]">
              Bespoke Cosmetic & Restorative Dentistry in Orlando.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Led by <strong className="font-semibold text-slate-900">Dr. Ziyad Maali, DMD, FAGD</strong>,
              an Orlando native recognized as a Fellow of the Academy of General Dentistry (top 7% nationwide).
              We combine digital 3D scans, in-office ceramic milling, and gentle artistry to deliver confident, radiant smiles.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] active:scale-[0.99] rounded-lg shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span>Schedule a Consultation</span>
              </button>
              <a
                href="tel:4075670064"
                className="px-6 py-3.5 text-sm font-semibold text-[#0F1E36] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Call (407) 567-0064</span>
              </a>
            </div>

            {/* Quiet verified badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-200/80 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Glidewell FastMill iO® Same-Day Crowns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Messy Molds · 100% 3D iTero Scans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Voted Top Orlando Dentist for 10+ Years</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Dental Emergency On-Call Response</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Architectural Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
              <img
                src="/src/assets/images/hero_luxury_dental_interior_1792422230907.jpg"
                alt="Modern luxury Sand Lake Dental suite with panoramic views, surgical lighting, and ergonomic patient chair"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle glass overlay banner with verified doctor credential */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1E36] text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#0F1E36] tracking-tight">
                      FAGD Distinction · Top 7% of Dentists
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Dr. Ziyad Maali, University of Florida College of Dentistry 2002
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip placed adjacent to hero claims */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="border-r border-slate-200/70 pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F1E36] tabular-nums">
              4.9 / 5.0
            </div>
            <div className="text-xs text-slate-500 mt-1">
              1,700+ Verified Patient Reviews (Birdeye & Google)
            </div>
          </div>
          <div className="border-r border-slate-200/70 pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F1E36] tabular-nums">
              22+ Years
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Serving Orlando, Dr. Phillips & Central Florida
            </div>
          </div>
          <div className="border-r border-slate-200/70 pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F1E36] tabular-nums">
              1 Single Visit
            </div>
            <div className="text-xs text-slate-500 mt-1">
              In-Office Glidewell FastMill Custom Ceramic Crowns
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F1E36] tabular-nums">
              100% Digital
            </div>
            <div className="text-xs text-slate-500 mt-1">
              iTero 3D Scanning & Guided CBCT Implant Surgery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
