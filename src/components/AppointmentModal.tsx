import React, { useState } from 'react';
import { CLINIC_LOCATIONS, SERVICES_CATALOG } from '../data/dentalData';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Download, Phone, User, Mail, Sparkles } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedLocationId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedLocationId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [locationId, setLocationId] = useState<string>(preselectedLocationId || 'orlando-dr-phillips');
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'porcelain-veneers');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState<string>('morning');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientInsurance, setPatientInsurance] = useState<string>('Delta Dental');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateStep4 = () => {
    const errs: { [key: string]: string } = {};
    if (!patientName.trim()) errs.name = 'Please provide your full legal name';
    if (!patientPhone.trim() || patientPhone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit telephone number';
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep4()) {
      setIsSubmitted(true);
    }
  };

  // Generate .ics calendar file for user
  const downloadCalendarInvite = () => {
    const selectedLoc = CLINIC_LOCATIONS.find((l) => l.id === locationId) || CLINIC_LOCATIONS[0];
    const selectedSvc = SERVICES_CATALOG.find((s) => s.id === serviceId);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sand Lake Dental//Appointment Request//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dental Consultation - Sand Lake Dental (${selectedSvc?.title || 'Appointment'})`,
      `DESCRIPTION:Requested consultation with Dr. Ziyad Maali at Sand Lake Dental. Office contact: ${selectedLoc.phone}`,
      `LOCATION:${selectedLoc.address}\\, ${selectedLoc.cityStateZip}`,
      `DTSTART:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sand_Lake_Dental_Appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedLoc = CLINIC_LOCATIONS.find((l) => l.id === locationId) || CLINIC_LOCATIONS[0];
  const selectedSvc = SERVICES_CATALOG.find((s) => s.id === serviceId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[95vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close appointment modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0F1E36] uppercase mb-1">
                <span>Appointment Scheduler</span>
                <span aria-hidden="true">·</span>
                <span>Step {step} of 4</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0F1E36]">
                {step === 1 && 'Choose Office Location'}
                {step === 2 && 'Select Reason for Visit'}
                {step === 3 && 'Preferred Date & Time Window'}
                {step === 4 && 'Patient Contact Information'}
              </h3>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i <= step ? 'bg-[#0F1E36]' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            {/* STEP 1: Location */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 mb-4">
                  Select which of our modern Central Florida facilities is most convenient for you:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CLINIC_LOCATIONS.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => setLocationId(loc.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        locationId === loc.id
                          ? 'border-[#0F1E36] bg-slate-50 ring-2 ring-[#0F1E36]/10'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-bold text-sm text-[#0F1E36]">
                          {loc.name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            locationId === loc.id ? 'border-[#0F1E36] bg-[#0F1E36]' : 'border-slate-300'
                          }`}
                        >
                          {locationId === loc.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600">{loc.address}</div>
                      <div className="text-xs text-slate-500">{loc.cityStateZip}</div>
                      <div className="text-[11px] text-[#0F1E36] font-semibold mt-3">
                        {loc.phone}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors cursor-pointer"
                  >
                    Continue to Treatment Selection →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Service Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 mb-4">
                  What is the primary objective for your visit with Dr. Maali and team?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                  {SERVICES_CATALOG.map((svc) => (
                    <div
                      key={svc.id}
                      onClick={() => setServiceId(svc.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        serviceId === svc.id
                          ? 'border-[#0F1E36] bg-slate-50 ring-2 ring-[#0F1E36]/10'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-serif font-bold text-xs text-[#0F1E36]">{svc.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{svc.subtitle}</div>
                        </div>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                            serviceId === svc.id ? 'border-[#0F1E36] bg-[#0F1E36]' : 'border-slate-300'
                          }`}
                        >
                          {serviceId === svc.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors cursor-pointer"
                  >
                    Continue to Date & Time →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Date & Time Window */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Preferred Target Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-[#0F1E36]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'morning', label: 'Morning Slot', sub: '8:30 AM – 12:00 PM' },
                      { id: 'afternoon', label: 'Afternoon Slot', sub: '1:00 PM – 4:30 PM' },
                      { id: 'evening', label: 'Thursday Evening', sub: '5:00 PM – 7:00 PM' },
                    ].map((w) => (
                      <div
                        key={w.id}
                        onClick={() => setTimeWindow(w.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          timeWindow === w.id
                            ? 'border-[#0F1E36] bg-slate-50 ring-2 ring-[#0F1E36]/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold text-xs text-[#0F1E36]">{w.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{w.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Note:</span> Thursdays at our Dr. Phillips office feature extended evening hours until 7:00 PM for working professionals and families.
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors cursor-pointer"
                  >
                    Continue to Patient Info →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Patient Info Form */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0F1E36]"
                    />
                    {errors.name && <span className="text-[11px] text-rose-600 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Telephone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="(407) 555-0199"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0F1E36]"
                    />
                    {errors.phone && <span className="text-[11px] text-rose-600 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0F1E36]"
                    />
                    {errors.email && <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Dental Insurance / Payment Method
                    </label>
                    <select
                      value={patientInsurance}
                      onChange={(e) => setPatientInsurance(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0F1E36]"
                    >
                      <option value="Delta Dental">Delta Dental PPO</option>
                      <option value="MetLife">MetLife Dental</option>
                      <option value="Cigna">Cigna PPO</option>
                      <option value="Aetna">Aetna Dental</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Humana">Humana</option>
                      <option value="Self-Pay / In-House Membership">Self-Pay / In-House Membership</option>
                      <option value="CareCredit Financing">CareCredit 0% Financing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Specific Symptoms or Aesthetic Goals (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in veneers on upper 6 teeth, or experiencing sensitivity in lower molar..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0F1E36]"
                  />
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors shadow-md cursor-pointer"
                  >
                    Confirm & Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 text-center animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#0F1E36] mb-2">
              Appointment Request Received
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="font-semibold text-slate-900">{patientName}</strong>. Our patient coordinator at Sand Lake Dental will reach out to you at <strong className="font-semibold text-slate-900">{patientPhone}</strong> to confirm your specific chair time.
            </p>

            {/* Appointment Recap Card */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Office Location:</span>
                <span className="font-semibold text-slate-800">{selectedLoc.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-800">{selectedSvc?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Window:</span>
                <span className="font-semibold text-slate-800 capitalize">{timeWindow} ({preferredDate || 'Earliest available'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Insurance / Billing:</span>
                <span className="font-semibold text-slate-800">{patientInsurance}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={downloadCalendarInvite}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#0F1E36] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1E36] hover:bg-[#1E3A5F] rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
