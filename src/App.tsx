import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Interactive3DTooth } from './components/Interactive3DTooth';
import { ServicesDirectory } from './components/ServicesDirectory';
import { DoctorBio } from './components/DoctorBio';
import { SmileGallery } from './components/SmileGallery';
import { TechnologySuite } from './components/TechnologySuite';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CostAndInsurance } from './components/CostAndInsurance';
import { LocationsAndHours } from './components/LocationsAndHours';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { ServiceDetail } from './types/dental';
import { Phone, Calendar } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedLocationId, setPreselectedLocationId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (locationId?: string, serviceId?: string) => {
    setPreselectedLocationId(locationId);
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceDetail) => {
    setPreselectedServiceId(service.id);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#19222D]">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection="home"
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Interactive 3D Tooth & Smile Restoration Explorer */}
        <Interactive3DTooth />

        {/* 3. Comprehensive Services Directory */}
        <ServicesDirectory onSelectService={handleSelectService} />

        {/* 4. Meet Dr. Ziyad Maali, DMD, FAGD */}
        <DoctorBio onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Real Patient Smile Transformations (Interactive Slider) */}
        <SmileGallery onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Modern Dental Technology Suite */}
        <TechnologySuite />

        {/* 7. Verified Reviews & Birdeye 4.9★ Social Proof */}
        <TestimonialsSection />

        {/* 8. Insurance, Financing & Wellness Membership */}
        <CostAndInsurance onOpenBooking={() => handleOpenBooking()} />

        {/* 9. Orlando & Maitland Office Locations & Detailed Hours */}
        <LocationsAndHours onOpenBooking={(locId) => handleOpenBooking(locId)} />

        {/* 10. Patient Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Multi-Step Appointment Scheduler Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedLocationId={preselectedLocationId}
      />

      {/* Mobile Sticky Quick Booking Bar (Strictly <= 15% viewport height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 flex items-center gap-2 shadow-lg">
        <a
          href="tel:4075670064"
          className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0F1E36] bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Office</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Book Visit</span>
        </button>
      </div>
    </div>
  );
}
