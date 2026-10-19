import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#0A1424] text-slate-300 pt-16 pb-12 border-t border-[#1E3A5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#0F1E36] flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                S
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                Sand Lake Dental
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Led by Dr. Ziyad Maali, DMD, FAGD. Offering world-class cosmetic dentistry, 3D guided implants, single-day Glidewell FastMill ceramic crowns, and compassionate family care in Orlando (Dr. Phillips) and Maitland, Florida.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>Top Orlando Dentist Awardee (10+ Consecutive Years)</div>
              <div>Fellow of the Academy of General Dentistry (FAGD)</div>
            </div>
          </div>

          {/* Quick Clinical Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Porcelain Veneers</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dental Implants</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Invisalign® Aligners</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Same-Day Crowns</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Teeth Whitening</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Locations & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Our Offices
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <strong className="text-white block font-medium">Orlando / Dr. Phillips:</strong>
                <span>7932 W Sand Lake Rd, Ste 301</span><br />
                <span>Orlando, FL 32819</span><br />
                <a href="tel:4075670064" className="text-[#38BDF8] hover:underline font-mono">
                  (407) 567-0064
                </a>
              </div>
              <div>
                <strong className="text-white block font-medium">Maitland Office:</strong>
                <span>670 N Orlando Ave, #1003</span><br />
                <span>Maitland, FL 32751</span><br />
                <a href="tel:4075670064" className="text-[#38BDF8] hover:underline font-mono">
                  (407) 567-0064
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Urgent Care (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Hours & Emergency
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5">
              <div>Mon – Wed: 8:30 AM – 5:00 PM</div>
              <div className="text-[#38BDF8] font-medium">Thu: 10:00 AM – 7:00 PM (Late Clinic)</div>
              <div>Fri: 9:00 AM – 2:00 PM</div>
              <div>Sat – Sun: Closed (Emergency On-Call)</div>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#0F1E36] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center"
              >
                Request an Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sand Lake Dental. All rights reserved. Dr. Ziyad Maali, DMD, FAGD.
          </div>
          <div className="flex items-center gap-4">
            <span>ADA & FDA Accredited Practice</span>
            <span aria-hidden="true">·</span>
            <span>HIPAA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility Compliant</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-900 text-[10px] text-slate-600 leading-relaxed text-center sm:text-left">
          *Medical Disclaimer: The clinical information presented on this website is intended for educational purposes and should not be construed as individualized medical diagnosis. Dental outcomes vary according to patient systemic health, bone density, and anatomical factors. Consult directly with Dr. Ziyad Maali or an accredited dentist for formal diagnosis.
        </div>
      </div>
    </footer>
  );
};
