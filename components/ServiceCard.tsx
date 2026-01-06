import React, { useState } from 'react';
import { Service } from '../types';
import { ArrowUpRight, ImageOff } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'image';
  image?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, variant = 'default', image }) => {
  const Icon = service.icon;
  const [imgError, setImgError] = useState(false);

  if (variant === 'image' && image) {
    return (
      <div className="group relative h-full w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-500 bg-slate-200">
        {!imgError ? (
          <img 
            src={image} 
            alt={service.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center">
             <div className="text-white/20">
               <Icon size={120} strokeWidth={0.5} />
             </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90 opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Glass Badge */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
           <ArrowUpRight size={18} />
        </div>

        <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/90">
                Premium Care
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 max-w-[90%] leading-relaxed">
            {service.description}
            </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      
      {/* Subtle Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 to-brand-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
            <Icon size={26} className="text-brand-600" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">{service.title}</h3>
          
          <p className="text-slate-500 leading-relaxed text-sm flex-grow">
            {service.description}
          </p>
          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-500 transition-colors">Learn More</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <ArrowUpRight size={14} />
            </div>
          </div>
      </div>
    </div>
  );
};