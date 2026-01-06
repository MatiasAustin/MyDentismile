import React from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../constants';

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-slate-50 pb-20 pt-32 rounded-b-[3rem] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-6 shadow-sm">
            Comprehensive Care
          </div>
          <h1 className="text-5xl lg:text-7xl font-medium text-slate-900 mb-6 tracking-tight">
            Layanan<br/>Kami
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Berbagai perawatan gigi komprehensif untuk menjaga kesehatan mulut dan keindahan senyum Anda sekeluarga dengan teknologi terkini.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 4-column grid for 8 items (Perfect fit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="h-[340px] animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard 
                service={service} 
                variant="image"
                image={service.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};