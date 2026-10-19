import React, { useState } from 'react';
import { SERVICES_CATALOG } from '../data/dentalData';
import { ServiceDetail } from '../types/dental';
import { Sparkles, ArrowRight, Clock, Cpu, Check, HelpCircle } from 'lucide-react';

interface ServicesDirectoryProps {
  onSelectService: (service: ServiceDetail) => void;
}

export const ServicesDirectory: React.FC<ServicesDirectoryProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceDetail | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'cosmetic', label: 'Cosmetic & Veneers' },
    { id: 'implants', label: 'Implants & Same-Day' },
    { id: 'ortho', label: 'Invisalign Aligners' },
    { id: 'general', label: 'General & Hygiene' },
    { id: 'emergency', label: 'Emergency Care' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Comprehensive Dental Services</span>
              <span aria-hidden="true">·</span>
              <span>Orlando & Maitland</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Clinical Services & Advanced Care
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            From single-visit ceramic crowns to complete full-mouth implant reconstructions, every procedure is performed with digital precision and gentle local anesthesia.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive button controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0F1E36] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header line */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="capitalize font-semibold text-[#0F1E36]">
                    {service.category === 'ortho' ? 'Orthodontics' : service.category}
                  </span>
                  {service.badge && (
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-[#0F1E36] group-hover:text-[#1E3A5F] transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  {service.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Details & CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[130px]">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[130px]">{service.technology.split('&')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectService(service)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedServiceForModal(service)}
                    className="py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    title="View treatment clinical details"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Treatment Details */}
        {selectedServiceForModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                    Clinical Overview
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#0F1E36]">
                    {selectedServiceForModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedServiceForModal(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedServiceForModal.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                    Key Clinical Advantages:
                  </h4>
                  <div className="space-y-2">
                    {selectedServiceForModal.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Technology Used:</span>
                    <span className="text-slate-600 text-right">{selectedServiceForModal.technology}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Typical Timeline:</span>
                    <span className="text-slate-600">{selectedServiceForModal.duration}</span>
                  </div>
                  {selectedServiceForModal.priceGuide && (
                    <div className="flex justify-between border-t border-slate-200 pt-2">
                      <span className="font-semibold text-slate-700">Insurance & Pricing:</span>
                      <span className="text-slate-600 text-right">{selectedServiceForModal.priceGuide}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const service = selectedServiceForModal;
                    setSelectedServiceForModal(null);
                    onSelectService(service);
                  }}
                  className="flex-1 py-3 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors text-center cursor-pointer"
                >
                  Schedule Consultation for this Treatment
                </button>
                <button
                  onClick={() => setSelectedServiceForModal(null)}
                  className="px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
