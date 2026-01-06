import React from 'react';
import { Button } from '../components/Button';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../constants';
import { PageView } from '../types';
import { ShieldCheck, Zap, Users, Play, Activity, ArrowUpRight, Asterisk, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      
      {/* 1. FUTURISTIC HERO */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Top Pill Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            Next Gen Dental Care
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300 italic font-light">Care</span><br/>
            For Better Living
          </h1>
          
          {/* Description */}
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Experience the synergy of advanced biotechnology and human-centric design. We don't just treat teeth; we engineer smiles.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button 
              variant="primary" 
              size="lg" 
              className="rounded-full px-10 group"
              onClick={() => onNavigate('contact')}
            >
              Start Journey
              <div className="w-2 h-2 rounded-full bg-white ml-3 group-hover:scale-150 transition-transform"></div>
            </Button>
            <Button 
              variant="glass" 
              size="lg" 
              className="rounded-full px-10 gap-2"
              onClick={() => onNavigate('about')}
            >
              <Play size={14} fill="currentColor" /> Watch Film
            </Button>
          </div>
        </div>

        {/* Stats Strip - Glass Floating */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: 'Specialists', val: '12+', icon: Users },
              { label: 'Technologies', val: 'Digital 3D', icon: Zap },
              { label: 'Satisfaction', val: '99.8%', icon: Activity },
              { label: 'Years Exp.', val: '15+', icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="bg-white/50 rounded-2xl py-4 flex flex-col items-center justify-center hover:bg-white transition-colors cursor-default">
                 <stat.icon size={16} className="text-brand-500 mb-2 opacity-80" />
                 <span className="text-xl font-bold text-slate-800">{stat.val}</span>
                 <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID SHOWCASE (Reverted Layout) */}
      <section className="px-4 pb-24 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-10 px-4">
           <div>
             <h2 className="text-3xl font-medium text-slate-900">Featured Services</h2>
             <p className="text-slate-400 text-sm mt-1">Curated treatments for you</p>
           </div>
           <Button variant="outline" size="sm" onClick={() => onNavigate('services')}>View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[340px]">
           
           {/* 1. Hero Service Image (Large) - Veneer */}
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-1" onClick={() => onNavigate('services')}>
              <div className="relative h-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm">
                 <img src={SERVICES[7].imageUrl} alt="Veneer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                 
                 <div className="absolute top-8 left-8">
                   <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                     <Asterisk size={24} />
                   </div>
                 </div>

                 <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div>
                     <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Signature</p>
                     <h3 className="text-3xl text-white font-medium leading-tight">Veneer<br/>Perfect Smile</h3>
                   </div>
                   <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-brand-400 group-hover:text-white transition-all">
                     <ArrowUpRight size={24} />
                   </div>
                 </div>
              </div>
           </div>

           {/* 2. Standard Service Card (Scaling) */}
           <div className="col-span-1" onClick={() => onNavigate('services')}>
             <ServiceCard service={SERVICES[0]} />
           </div>

           {/* 3. Dark Mode Card (Whitening) */}
           <div className="col-span-1 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group" onClick={() => onNavigate('services')}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity"></div>
              
              <div>
                 <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                   <Sparkles size={24} className="text-brand-300" />
                 </div>
                 <h3 className="text-2xl font-medium mb-2">Whitening<br/>Pro</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">Advanced laser technology for instant results.</p>
              </div>
              <div className="flex justify-end">
                 <button className="text-xs font-bold uppercase tracking-widest text-brand-300 hover:text-white transition-colors">Explore</button>
              </div>
           </div>

           {/* 4. Vertical Image Card (Behel) */}
           <div className="col-span-1 row-span-1 md:row-span-1" onClick={() => onNavigate('services')}>
              <ServiceCard service={SERVICES[3]} variant="image" image={SERVICES[3].imageUrl} />
           </div>

           {/* 5. Minimal Typography Card */}
           <div className="col-span-1 md:col-span-2 bg-brand-50/50 backdrop-blur-sm border border-brand-100 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden">
              <h3 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight relative z-10">
                Technology meets <br/>
                <span className="text-slate-400 italic font-light">Human Compassion</span>
              </h3>
              <div className="mt-8 flex gap-4">
                 <div className="px-4 py-2 rounded-full bg-white border border-brand-100 text-xs font-bold uppercase text-brand-700">Non-Invasive</div>
                 <div className="px-4 py-2 rounded-full bg-white border border-brand-100 text-xs font-bold uppercase text-brand-700">Painless</div>
              </div>
           </div>

           {/* 6. Icon Only Card */}
           <div className="col-span-1 bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.5rem] flex items-center justify-center group cursor-pointer hover:bg-white transition-colors" onClick={() => onNavigate('services')}>
              <div className="text-center">
                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-brand-100 group-hover:text-brand-600 transition-all">
                   <ArrowUpRight size={32} />
                 </div>
                 <span className="font-bold text-slate-900 text-sm">View Catalog</span>
              </div>
           </div>
        </div>
      </section>

      {/* 3. SCROLLING/LIST SECTION */}
      <section className="py-24 border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 mb-6 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Awards & Recognition
                </div>
                <h2 className="text-4xl lg:text-5xl font-medium text-slate-900 mb-6">
                  Excellence in<br/>Modern Dentistry.
                </h2>
                <p className="text-slate-500 leading-relaxed max-w-md mb-8">
                  Recognized globally for our contribution to biotechnology and patient care standards. We strive for perfection in every procedure.
                </p>
                <Button variant="outline">Learn About Us</Button>
              </div>

              <div className="space-y-3">
                 {[
                   { year: '2023', title: 'Global Healthcare Design Award', sub: 'Best Clinic Interior' },
                   { year: '2022', title: 'Medical Excellence Medal', sub: 'Patient Safety Protocol' },
                   { year: '2021', title: 'Innovation in Orthodontics', sub: 'Digital Scanning Pioneer' }
                 ].map((item, idx) => (
                   <div key={idx} className="group flex items-center justify-between p-6 bg-white/60 hover:bg-white rounded-3xl border border-white/50 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-default">
                      <div className="flex items-center gap-6">
                         <span className="text-xs font-bold text-slate-300 font-mono">{item.year}</span>
                         <div>
                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{item.sub}</p>
                         </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};