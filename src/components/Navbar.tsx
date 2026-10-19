import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Calendar, Menu, X, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Interactive 3D', href: '#interactive-3d' },
    { label: 'Meet Dr. Maali', href: '#doctor' },
    { label: 'Technology', href: '#technology' },
    { label: 'Locations', href: '#locations' },
  ];

  return (
    <>
      {/* Top emergency & location strip */}
      <div className="bg-[#0F1E36] text-[#E2E8F0] text-xs py-2 px-4 sm:px-8 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <a
              href="tel:4075670064"
              className="flex items-center gap-2 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Direct: (407) 567-0064</span>
            </a>
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Orlando (Dr. Phillips) & Maitland, FL</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Mon–Wed 8:30–5 · Thu Late till 7 PM · Fri 9–2</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden sm:inline">24/7 Urgent Care Support</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="text-[#38BDF8] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 4.9★ Birdeye Rated (1,700+ Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation complying with Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#0F1E36] whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F1E36] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-[#1E3A5F] transition-colors">
              S
            </div>
            <span>Sand Lake Dental</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#0F1E36] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-[#0F1E36]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:4075670064"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0F1E36] border border-slate-200 rounded-lg hover:border-slate-300 transition-colors whitespace-nowrap shrink-0"
              title="Call Sand Lake Dental Office"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(407) 567-0064</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] active:scale-[0.98] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request Appointment</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-lg animate-fadeIn">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-[#0F1E36] py-2 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="tel:4075670064"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#0F1E36] bg-slate-100 rounded-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (407) 567-0064</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-[#0F1E36] rounded-lg shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Appointment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
