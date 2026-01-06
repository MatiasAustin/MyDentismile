import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { BRANCHES } from '../constants';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    branch: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Terima kasih ${formState.name}! Tim kami akan menghubungi Anda via WhatsApp di nomor ${formState.phone} segera.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-slate-600">Jadwalkan konsultasi atau tanyakan layanan kami dengan mudah.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Reservation Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Formulir Reservasi</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                  placeholder="Masukkan nama Anda"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                    placeholder="0812..."
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Cabang</label>
                   <select 
                     name="branch"
                     className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                     value={formState.branch}
                     onChange={handleChange}
                   >
                     <option value="">Pilih lokasi...</option>
                     {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Layanan yang Diminati</label>
                <select 
                   name="service"
                   className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                   value={formState.service}
                   onChange={handleChange}
                >
                  <option value="">Pilih layanan...</option>
                  <option value="ortho">Kawat Gigi (Behel)</option>
                  <option value="implant">Implan Gigi</option>
                  <option value="scaling">Scaling</option>
                  <option value="general">Sakit Gigi / Umum</option>
                  <option value="kids">Gigi Anak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Tambahan (Opsional)</label>
                <textarea 
                  name="message"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500 h-32"
                  placeholder="Keluhan atau pertanyaan spesifik..."
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <Button type="submit" fullWidth size="lg">Kirim Reservasi</Button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
             <div className="bg-brand-500 rounded-3xl p-8 text-white shadow-lg shadow-brand-500/20">
               <h3 className="text-2xl font-bold mb-4">Konsultasi Cepat</h3>
               <p className="mb-6 text-brand-50">Lebih suka chat langsung? Hubungi admin kami via WhatsApp untuk respon tercepat.</p>
               <Button variant="secondary" className="w-full sm:w-auto gap-2">
                 <MessageSquare size={20} /> Chat WhatsApp
               </Button>
             </div>

             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold mb-6 text-slate-900">Kontak Management</h3>
               <ul className="space-y-6">
                 <li className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                     <Mail size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-slate-500">Email</p>
                     <p className="font-medium text-slate-900">hello@mydentismile.com</p>
                   </div>
                 </li>
                 <li className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                     <Phone size={24} />
                   </div>
                   <div>
                     <p className="text-sm text-slate-500">Call Center</p>
                     <p className="font-medium text-slate-900">021-1234-5678</p>
                   </div>
                 </li>
               </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};