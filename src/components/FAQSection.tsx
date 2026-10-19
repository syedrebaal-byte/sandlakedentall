import React, { useState } from 'react';
import { CLINIC_FAQS } from '../data/dentalData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
            <span>Patient Guidance</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Honest, patient-centered answers regarding procedures, in-office technology, and insurance billing.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {CLINIC_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition-all bg-[#FAF9F6]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base text-[#0F1E36]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0F1E36]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0F1E36] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif font-bold text-sm">Have a question not addressed here?</div>
            <div className="text-xs text-slate-300 mt-0.5">Our patient coordinators in Dr. Phillips are ready to assist.</div>
          </div>
          <a
            href="tel:4075670064"
            className="px-5 py-2.5 text-xs font-semibold text-[#0F1E36] bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (407) 567-0064</span>
          </a>
        </div>
      </div>
    </section>
  );
};
