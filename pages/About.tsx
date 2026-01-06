import React from 'react';
import { TEAM, IMAGES } from '../constants';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative py-24 bg-slate-50 overflow-hidden rounded-b-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <p className="text-brand-500 font-bold tracking-widest uppercase mb-4">Tentang Kami</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 uppercase leading-tight">
                Mewujudkan<br/>Senyum<br/>Indonesia
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                MyDentismile didirikan dengan visi sederhana: menghapus rasa takut ke dokter gigi. Kami menggabungkan keahlian medis terbaik dengan suasana yang menenangkan, modern, dan bersahabat.
              </p>
            </div>
            <div className="relative">
               <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
                 <img src={IMAGES.interior} alt="Clinic Interior" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-xl max-w-xs hidden lg:block">
                 <p className="text-4xl font-bold text-brand-500 mb-2">10+</p>
                 <p className="font-bold text-slate-900">Tahun Pengalaman</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold text-slate-900 uppercase">Tim Dokter<br/>Ahli Kami</h2>
            <button className="flex items-center gap-2 text-brand-600 font-bold hover:gap-4 transition-all">
              LIHAT SEMUA <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.id} className="group cursor-pointer">
                <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-6 relative">
                   <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                   />
                   <div className="absolute bottom-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight size={16} />
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-brand-600 font-medium uppercase tracking-wider text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};