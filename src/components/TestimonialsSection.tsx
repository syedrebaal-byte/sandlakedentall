import React, { useState } from 'react';
import { VERIFIED_REVIEWS } from '../data/dentalData';
import { Sparkles, Star, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = filter === 'all'
    ? VERIFIED_REVIEWS
    : VERIFIED_REVIEWS.filter((r) => r.treatment.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Patient Experience</span>
              <span aria-hidden="true">·</span>
              <span>Independent Third-Party Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              1,700+ Verified Patient Experiences
            </h2>
          </div>

          {/* Birdeye & Google Trust Score Badge */}
          <div className="flex items-center gap-4 bg-[#FAF9F6] p-3.5 px-5 rounded-xl border border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold font-serif text-[#0F1E36] flex items-center gap-1">
                <span>4.9</span>
                <span className="text-amber-500 text-lg">★★★★★</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Overall Birdeye Score
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-xs text-slate-600">
              <div className="font-semibold text-slate-900">1,704+ Reviews</div>
              <div className="text-[11px] text-slate-500">Orlando & Maitland, FL</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'veneers', label: 'Veneers & Aesthetics' },
            { id: 'implants', label: 'Dental Implants & Crowns' },
            { id: 'invisalign', label: 'Invisalign Aligners' },
            { id: 'emergency', label: 'Anxiety-Free & Emergency' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                filter === item.id
                  ? 'bg-[#0F1E36] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified {rev.source}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-[#0F1E36] mb-2">
                  Treatment: {rev.treatment}
                </div>

                <blockquote className="text-xs text-slate-600 italic leading-relaxed mb-6">
                  "{rev.quote}"
                </blockquote>
              </div>

              {/* Patient signature */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{rev.author}</span>
                <span>{rev.location}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Source: Verified patient ratings collected via Birdeye Patient Feedback System & Google Local Business Reviews.
        </div>
      </div>
    </section>
  );
};
