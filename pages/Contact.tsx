import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { Phone, Mail, MessageSquare, Calendar as CalendarIcon, Clock, User, Stethoscope, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRANCHES, TEAM } from '../constants';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '19:00', '20:00'
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    branch: '',
    service: '',
    date: '',
    doctorId: '',
    timeSlot: '',
    message: ''
  });

  // Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date()); // Controls the month being viewed
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find selected doctor name for the alert
    const selectedDoc = TEAM.find(d => d.id === formState.doctorId)?.name || 'Dokter Umum';

    alert(`Reservasi Berhasil!\n\nNama: ${formState.name}\nDokter: ${selectedDoc}\nTanggal: ${formState.date}\nJam: ${formState.timeSlot}\n\nTim kami akan mengirimkan konfirmasi via WhatsApp.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectDoctor = (id: string) => {
    setFormState({ ...formState, doctorId: id });
  };

  const handleSelectTime = (time: string) => {
    setFormState({ ...formState, timeSlot: time });
  };

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    // Format date as YYYY-MM-DD for consistency
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    setFormState({ ...formState, date: formattedDate });
    setShowCalendar(false);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!formState.date) return false;
    const selected = new Date(formState.date);
    return date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() && // Note: formState.date month is 1-based string parsed correctly by Date, but check strictly
      date.getFullYear() === selected.getFullYear();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Buat Janji Temu</h1>
          <p className="text-lg text-slate-600">Pilih dokter dan waktu yang sesuai dengan kenyamanan Anda.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Reservation Form (Main) - Spans 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                <CalendarIcon size={20} />
              </span>
              Formulir Reservasi
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: Personal Data */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Data Diri</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 transition-all"
                      placeholder="Masukkan nama Anda"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 transition-all"
                      placeholder="0812..."
                      value={formState.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Clinic & Treatment */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Lokasi & Perawatan</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Cabang</label>
                     <select 
                       name="branch"
                       required
                       className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 transition-all"
                       value={formState.branch}
                       onChange={handleChange}
                     >
                       <option value="">Pilih lokasi...</option>
                       {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                     </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Layanan</label>
                    <select 
                       name="service"
                       required
                       className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 transition-all"
                       value={formState.service}
                       onChange={handleChange}
                    >
                      <option value="">Pilih layanan...</option>
                      <option value="ortho">Kawat Gigi (Behel)</option>
                      <option value="implant">Implan Gigi</option>
                      <option value="scaling">Scaling</option>
                      <option value="whitening">Whitening</option>
                      <option value="general">Sakit Gigi / Umum</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Schedule (Date & Doctor) */}
              <div className="space-y-6">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Jadwal Konsultasi</h3>
                 
                 {/* Custom Date Picker */}
                 <div className="relative" ref={calendarRef}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Tanggal</label>
                    <div 
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full md:w-1/2 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 flex items-center justify-between cursor-pointer transition-colors group"
                    >
                       <span className={formState.date ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                         {formState.date ? new Date(formState.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Pilih tanggal kedatangan...'}
                       </span>
                       <CalendarIcon size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                    </div>

                    {/* Calendar Popup */}
                    {showCalendar && (
                      <div className="absolute top-full mt-2 left-0 z-50 w-full md:w-[320px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 animate-in zoom-in-95 duration-200">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                          <button 
                            type="button" 
                            onClick={() => changeMonth(-1)}
                            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-brand-600 transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <span className="font-bold text-slate-800">
                            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => changeMonth(1)}
                            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-brand-600 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                           {DAYS.map(day => (
                             <div key={day} className="text-xs font-bold text-slate-400 py-1">{day}</div>
                           ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysInMonth(viewDate).map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;
                            
                            const _isPast = isPast(date);
                            const _isSelected = isSelected(date);
                            const _isToday = isToday(date);

                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={_isPast}
                                onClick={() => handleDateClick(date)}
                                className={`
                                  h-9 w-9 rounded-full text-sm flex items-center justify-center transition-all duration-200 relative
                                  ${_isSelected ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-105 font-bold' : ''}
                                  ${!_isSelected && !_isPast ? 'hover:bg-brand-50 text-slate-700 hover:text-brand-600' : ''}
                                  ${_isPast ? 'text-slate-300 cursor-not-allowed' : ''}
                                  ${!_isSelected && _isToday && !_isPast ? 'ring-1 ring-brand-500 text-brand-600 font-bold' : ''}
                                `}
                              >
                                {date.getDate()}
                                {_isToday && !_isSelected && (
                                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-500"></span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                 </div>

                 {/* Doctor Selection Grid */}
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Pilih Dokter</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {TEAM.map((doc) => (
                        <div 
                          key={doc.id}
                          onClick={() => handleSelectDoctor(doc.id)}
                          className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-3 group ${
                            formState.doctorId === doc.id 
                              ? 'border-brand-500 bg-brand-50/50 shadow-md shadow-brand-500/10' 
                              : 'border-slate-100 bg-white hover:border-brand-200 hover:shadow-lg'
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm">
                            <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className={`font-bold text-sm ${formState.doctorId === doc.id ? 'text-brand-700' : 'text-slate-900'}`}>{doc.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{doc.role}</p>
                          </div>
                          
                          {/* Selected Checkmark */}
                          {formState.doctorId === doc.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white animate-in zoom-in duration-200">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Time Slots (Only show if date is picked) */}
                 <div className={`transition-all duration-500 ${formState.date ? 'opacity-100 translate-y-0' : 'opacity-50 blur-sm pointer-events-none'}`}>
                    <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                       <Clock size={16} className="text-brand-500" /> Pilih Jam Tersedia
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleSelectTime(time)}
                          className={`py-2 px-1 rounded-xl text-sm font-medium border transition-all duration-200 ${
                            formState.timeSlot === time
                              ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30 transform scale-105'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {formState.date && !formState.timeSlot && (
                      <p className="text-xs text-amber-500 mt-2 animate-pulse">Silakan pilih jam kedatangan.</p>
                    )}
                 </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Tambahan (Opsional)</label>
                <textarea 
                  name="message"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 min-h-[100px]"
                  placeholder="Keluhan spesifik atau catatan khusus..."
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" fullWidth size="lg" className="rounded-2xl py-4 text-lg shadow-xl shadow-brand-500/20">
                   Konfirmasi Booking
                </Button>
                <p className="text-center text-slate-400 text-xs mt-4">
                  Dengan mengklik tombol di atas, Anda menyetujui kebijakan privasi kami.
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar Info - Spans 4 cols */}
          <div className="lg:col-span-4 space-y-6 h-fit sticky top-28">
             {/* Quick Chat */}
             <div className="bg-brand-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4">Butuh Bantuan?</h3>
                 <p className="mb-6 text-brand-50 leading-relaxed">Bingung memilih jadwal atau dokter? Chat admin kami sekarang untuk bantuan langsung.</p>
                 <Button variant="glass" className="w-full gap-2 justify-center border-0 bg-white/20 hover:bg-white/30 text-white">
                   <MessageSquare size={20} /> Chat WhatsApp
                 </Button>
               </div>
             </div>

             {/* Contact Details */}
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold mb-6 text-slate-900">Kontak Info</h3>
               <ul className="space-y-6">
                 <li className="flex items-start gap-4 group">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                     <Mail size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-slate-500 mb-0.5">Email Official</p>
                     <p className="font-medium text-slate-900 break-all">hello@mydentismile.com</p>
                   </div>
                 </li>
                 <li className="flex items-start gap-4 group">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                     <Phone size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-slate-500 mb-0.5">Call Center</p>
                     <p className="font-medium text-slate-900">021-1234-5678</p>
                   </div>
                 </li>
               </ul>
             </div>

             {/* Booking Summary Preview (Mini) */}
             {(formState.date || formState.branch) && (
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Ringkasan</h3>
                  <div className="space-y-3 text-sm">
                    {formState.branch && (
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Lokasi</span>
                        <span className="font-medium text-right">{BRANCHES.find(b => b.id === formState.branch)?.name.replace('MyDentismile ', '')}</span>
                      </div>
                    )}
                    {formState.date && (
                      <div className="flex justify-between border-b border-white/10 pb-2">
                         <span className="text-slate-400">Tanggal</span>
                         <span className="font-medium">{new Date(formState.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    )}
                    {formState.timeSlot && (
                      <div className="flex justify-between border-b border-white/10 pb-2">
                         <span className="text-slate-400">Jam</span>
                         <span className="font-medium text-brand-400">{formState.timeSlot}</span>
                      </div>
                    )}
                    {formState.doctorId && (
                      <div className="pt-2">
                        <span className="text-slate-400 block mb-1">Dokter Pilihan</span>
                        <div className="flex items-center gap-2">
                          <img src={TEAM.find(t => t.id === formState.doctorId)?.imageUrl} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-medium">{TEAM.find(t => t.id === formState.doctorId)?.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};