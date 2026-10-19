import React, { useState } from 'react';
import { CLINIC_LOCATIONS } from '../data/dentalData';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, ShieldAlert } from 'lucide-react';

interface LocationsAndHoursProps {
  onOpenBooking: (locationId?: string) => void;
}

export const LocationsAndHours: React.FC<LocationsAndHoursProps> = ({ onOpenBooking }) => {
  const [selectedLocId, setSelectedLocId] = useState<string>('orlando-dr-phillips');

  const selectedLoc = CLINIC_LOCATIONS.find((l) => l.id === selectedLocId) || CLINIC_LOCATIONS[0];

  return (
    <section id="locations" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-2">
              <span>Convenient Central Florida Locations</span>
              <span aria-hidden="true">·</span>
              <span>Orlando & Maitland</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1E36]">
              Visit Sand Lake Dental
            </h2>
          </div>
          <div className="text-xs text-slate-500 max-w-sm">
            Two modern office locations with extended evening appointments and dedicated emergency triage.
          </div>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex items-center gap-3 mb-8">
          {CLINIC_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocId(loc.id)}
              className={`flex-1 sm:flex-none px-5 py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedLocId === loc.id
                  ? 'bg-[#0F1E36] text-white border-[#0F1E36] shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="text-sm font-serif font-bold">{loc.name}</div>
              <div className="text-[11px] opacity-80 mt-0.5">{loc.area}</div>
            </button>
          ))}
        </div>

        {/* Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact & Hours Card (Left 6 cols) */}
          <div className="lg:col-span-6 bg-[#FAF9F6] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0F1E36]">
                    {selectedLoc.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Serving Dr. Phillips, Windermere, Bay Hill, and greater Orlando
                  </p>
                </div>
                <button
                  onClick={() => onOpenBooking(selectedLoc.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Book Here
                </button>
              </div>

              {/* Address & Phone */}
              <div className="space-y-4 mb-6 text-xs text-slate-700 border-t border-slate-200/80 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0F1E36] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">{selectedLoc.address}</div>
                    <div className="text-slate-500">{selectedLoc.cityStateZip}</div>
                    <div className="text-[11px] text-slate-500 mt-1 italic">
                      {selectedLoc.parkingNote}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0F1E36] shrink-0" />
                  <div>
                    <a
                      href={`tel:${selectedLoc.phone.replace(/[^0-9]/g, '')}`}
                      className="font-semibold text-slate-900 hover:text-[#0F1E36] transition-colors"
                    >
                      {selectedLoc.phone}
                    </a>
                    {selectedLoc.secondaryPhone && (
                      <span className="text-slate-400 text-[11px] ml-2">
                        Alt: {selectedLoc.secondaryPhone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hours Schedule */}
              <div className="border-t border-slate-200/80 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1E36] uppercase tracking-wider mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Office Hours & Schedule</span>
                </div>
                <div className="space-y-2">
                  {selectedLoc.hours.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50 last:border-b-0"
                    >
                      <span className="font-medium text-slate-700">{h.days}</span>
                      <span className="font-mono text-slate-600">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Hotline notice */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Dental Emergency After-Hours Support:</span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  If experiencing acute trauma or uncontrolled bleeding, call <a href="tel:4075670064" className="underline font-bold">(407) 567-0064</a> immediately for clinical triage routing.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Visualizer & Driving Directions (Right 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-100 relative">
              <iframe
                title={`Map of ${selectedLoc.name}`}
                src={`https://maps.google.com/maps?q=${selectedLoc.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#0F1E36] shadow-xs flex items-center gap-1.5 pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{selectedLoc.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLoc.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 text-xs font-semibold text-[#0F1E36] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions on Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
