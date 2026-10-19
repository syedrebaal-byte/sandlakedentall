import React from 'react';
import { DOCTOR_MAALI, ASSOCIATE_DOCTORS } from '../data/dentalData';
import { Award, GraduationCap, Building2, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';

interface DoctorBioProps {
  onOpenBooking: () => void;
}

export const DoctorBio: React.FC<DoctorBioProps> = ({ onOpenBooking }) => {
  return (
    <section id="doctor" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Clinical Leadership</span>
              <span aria-hidden="true">·</span>
              <span>22+ Years in Dr. Phillips</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Meet Dr. Ziyad Maali, DMD, FAGD
            </h2>
          </div>
          <div className="text-xs text-slate-500 max-w-sm">
            Fewer than 7% of dentists nationwide achieve Fellowship in the Academy of General Dentistry (FAGD).
          </div>
        </div>

        {/* Doctor Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Doctor Portrait with framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/5] bg-slate-100">
              <img
                src={DOCTOR_MAALI.image}
                alt="Dr. Ziyad Maali, DMD, FAGD in clinical coat at Sand Lake Dental Orlando"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-[#38BDF8] tracking-wider uppercase mb-1">
                  Fellow of the Academy of General Dentistry
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Dr. Ziyad Maali
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  University of Florida College of Dentistry, Class of 2002
                </p>
              </div>
            </div>

            {/* Quick credentials badges */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <GraduationCap className="w-4 h-4 text-[#0F1E36] shrink-0" />
                <span>Dr. Phillips Native · FSU & UF Dental Alumnus</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Award className="w-4 h-4 text-[#0F1E36] shrink-0" />
                <span>Voted Top Orlando Dentist for 10+ Consecutive Years</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <HeartHandshake className="w-4 h-4 text-[#0F1E36] shrink-0" />
                <span>Orange County Dental Research Clinic Volunteer</span>
              </div>
            </div>
          </div>

          {/* Biography & Accreditations (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-base leading-relaxed">
              <p>
                <strong>Dr. Ziyad Maali</strong> is a homegrown Orlando dentist whose passion for patient-first care started right here in the Dr. Phillips neighborhood. Growing up attending Dr. Phillips Elementary, Westridge Middle, and Dr. Phillips High School, Dr. Maali developed deep roots in Central Florida before graduating from the acclaimed <strong>University of Florida College of Dentistry in 2002</strong>.
              </p>
              <p>
                With more than two decades of dedicated private practice, Dr. Maali earned the esteemed <strong>Fellowship in the Academy of General Dentistry (FAGD)</strong>—a distinction earned by only 6 to 7 percent of general practitioners through hundreds of accredited continuing education hours and comprehensive clinical board examinations.
              </p>
              <p>
                Dr. Maali specializes in high-esthetic smile transformations, porcelain veneers, single-visit Glidewell ceramic crowns, and 3D guided dental implant surgery. He approaches every smile with artistic proportion, preserving natural tooth structure whenever possible.
              </p>
              <p>
                Believing in giving back, Dr. Maali volunteers at the Orange County Dental Research Clinic, provides treatment through Donated Dental Services for underserved individuals, and established the Dental Assisting Institute to mentor future dental professionals.
              </p>
            </div>

            {/* Accreditations List */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Professional Memberships & Accreditations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {DOCTOR_MAALI.accreditations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Schedule Consultation with Dr. Maali
              </button>
              <a
                href="tel:4075670064"
                className="text-xs font-semibold text-[#0F1E36] hover:underline"
              >
                Have questions? Call (407) 567-0064
              </a>
            </div>
          </div>
        </div>

        {/* Associate Dentists Strip */}
        <div className="pt-12 border-t border-slate-200">
          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-[#0F1E36]">
              Collaborative Clinical Team
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Working alongside Dr. Maali to provide attentive, gentle care across all general and restorative needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ASSOCIATE_DOCTORS.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#FAF9F6] border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-[#0F1E36]">{doc.name}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{doc.title}</div>
                  <div className="text-xs text-[#0F1E36] font-semibold mt-2">{doc.specialty}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{doc.focus}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                  Sand Lake Dental Clinical Staff
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
