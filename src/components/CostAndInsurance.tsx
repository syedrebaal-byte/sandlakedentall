import React, { useState } from 'react';
import { ACCEPTED_INSURANCES } from '../data/dentalData';
import { ShieldCheck, CreditCard, HeartHandshake, CheckCircle2, HelpCircle } from 'lucide-react';

interface CostAndInsuranceProps {
  onOpenBooking: () => void;
}

export const CostAndInsurance: React.FC<CostAndInsuranceProps> = ({ onOpenBooking }) => {
  const [selectedInsurance, setSelectedInsurance] = useState<string>('Delta Dental Premier & PPO');

  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Financial Transparency</span>
              <span aria-hidden="true">·</span>
              <span>Flexible Options</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Insurance, Financing & Membership
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            We believe world-class dentistry should never involve financial guesswork. Our patient coordinators verify your exact benefits before treatment begins.
          </p>
        </div>

        {/* 3 Pillars: Insurance, Financing, Wellness Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1: PPO Insurance */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F1E36] flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0F1E36] mb-2">
                PPO Dental Insurance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                We accept and maximize benefits for most major dental PPO networks. Our team files all electronic claims directly on your behalf to minimize out-of-pocket expenses.
              </p>

              <div className="pt-3 border-t border-slate-100">
                <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1.5">
                  Check Your Insurance Provider:
                </label>
                <select
                  value={selectedInsurance}
                  onChange={(e) => setSelectedInsurance(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-[#0F1E36]"
                >
                  {ACCEPTED_INSURANCES.map((ins, i) => (
                    <option key={i} value={ins}>
                      {ins}
                    </option>
                  ))}
                </select>
                <div className="mt-3 text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Accepted at both Orlando & Maitland offices</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <span className="text-[11px] text-slate-500 block">
                Complimentary benefit verification before your first visit.
              </span>
            </div>
          </div>

          {/* Card 2: 0% Interest Financing */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F1E36] flex items-center justify-center mb-5">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0F1E36] mb-2">
                0% APR Patient Financing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Achieve your dream smile with low, predictable monthly payments. We partner with CareCredit and LendingClub to offer flexible 6, 12, or 24-month interest-free financing plans.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>0% promotional interest on qualifying treatments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant digital approval without impacting credit score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Applies to Veneers, Implants & Invisalign</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <span className="text-[11px] text-slate-500 block">
                Ask our financial coordinator for pre-qualification in 2 minutes.
              </span>
            </div>
          </div>

          {/* Card 3: In-House Wellness Membership */}
          <div className="bg-[#0F1E36] text-white p-6 sm:p-7 rounded-2xl border border-[#1E3A5F] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] text-[#38BDF8] flex items-center justify-center mb-5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Sand Lake Wellness Membership
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                No insurance? No problem. Our in-house dental plan gives individuals and families complete peace of mind with zero deductibles, zero waiting periods, and zero annual maximums.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>2 Comprehensive cleanings & exams per year</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>All routine diagnostic digital X-rays included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>1 Free emergency evaluation per year</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>15% – 20% savings on all dental treatments</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-700 mt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 text-xs font-semibold text-[#0F1E36] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center"
              >
                Inquire About Membership
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Guide Note */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Transparent Pricing Example: Invisalign® treatment typically ranges between $3,000 to $8,000 depending on clinical case complexity.
            </span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-xs font-semibold text-[#0F1E36] hover:underline whitespace-nowrap cursor-pointer"
          >
            Request Treatment Estimate & Benefits Check →
          </button>
        </div>
      </div>
    </section>
  );
};
