import React from 'react';
import { Cpu, Zap, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const TechnologySuite: React.FC = () => {
  const technologies = [
    {
      title: 'Glidewell FastMill iO® In-Office Milling',
      description: 'Precision CAD/CAM computer milling unit right in our Orlando office. Designs, cuts, and bakes permanent dental crowns from monolithic ceramic in a single 90-minute appointment.',
      patientAdvantage: 'No fragile temporary crowns, no messy molds, and no second numbing appointment.',
    },
    {
      title: 'iTero® 3D Intraoral Digital Scanning',
      description: 'Captures 6,000 high-resolution optical frames per second to render an exact 3D digital model of your teeth and bite without suffocating impression trays.',
      patientAdvantage: 'Instant 3D smile previews and zero gag-reflex inducing impression goop.',
    },
    {
      title: '3D Conebeam CT (CBCT) Diagnostics',
      description: 'Generates detailed 3D cross-sectional views of bone density, sinus cavities, and nerve pathways with up to 70% lower radiation exposure than older diagnostic units.',
      patientAdvantage: 'Enables sub-millimeter surgical implant placement and predictable healing.',
    },
    {
      title: 'Low-Radiation Panoramic & Digital Sensors',
      description: 'Instant computerized X-ray sensors providing crisp diagnostic imagery immediately visible on chairside high-definition patient monitors.',
      patientAdvantage: 'Immediate collaborative diagnosis and transparent treatment planning.',
    },
  ];

  return (
    <section id="technology" className="py-20 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Next-Generation Diagnostics</span>
              <span aria-hidden="true">·</span>
              <span>In-House Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Modern Dental Technology Suite
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            Investing in the world’s most advanced dental systems to eliminate discomfort, save your valuable time, and deliver surgical precision.
          </p>
        </div>

        {/* Feature Photography Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Tech Scan Showcase (Left 6 cols) */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white relative group">
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/modern_dental_technology_1792422232571.jpg"
                alt="iTero 3D digital intraoral scanning at Sand Lake Dental Orlando"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1E36] uppercase tracking-wider mb-1">
                <span>Precision Digital Dentistry</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0F1E36] mb-2">
                iTero® 3D Intraoral Scanning & Digital Mapping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optical scanners record exact digital replicas of tooth geometry in minutes. Eliminates the unpleasant gag reflex of traditional putty impressions while accelerating Invisalign aligner and crown fabrication.
              </p>
            </div>
          </div>

          {/* Lounge Hospitality Showcase (Right 6 cols) */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white relative group">
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/serene_patient_lounge_1792422233199.jpg"
                alt="Serene boutique reception and patient lounge at Sand Lake Dental"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1E36] uppercase tracking-wider mb-1">
                <span>Patient Comfort & Hospitality</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0F1E36] mb-2">
                Boutique Spa Ambiance & Anxiety-Free Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed to feel like a high-end wellness sanctuary rather than a cold clinical office. Enjoy natural Florida daylight, noise-canceling headphones, warm scented towels, and gentle sedation options.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Tech Specification Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0F1E36] flex items-center justify-center mb-4">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0F1E36] mb-2 leading-snug">
                  {tech.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tech.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-800 block mb-0.5">
                  Patient Benefit:
                </span>
                <span className="text-[11px] text-slate-500 leading-tight block">
                  {tech.patientAdvantage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
