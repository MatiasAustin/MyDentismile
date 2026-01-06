import React from 'react';
import { BRANCHES } from '../constants';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '../components/Button';

export const LocationsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white pb-12 pt-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Lokasi Cabang</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan klinik MyDentismile terdekat dari lokasi Anda. Kami hadir di berbagai titik strategis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch) => (
            <div key={branch.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={branch.imageUrl} 
                  alt={branch.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  {branch.name.replace('MyDentismile ', '')}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{branch.name}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin size={20} className="text-brand-500 shrink-0 mt-1" />
                    <span className="text-sm">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={20} className="text-brand-500 shrink-0" />
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock size={20} className="text-brand-500 shrink-0" />
                    <span className="text-sm">{branch.hours}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                   <Button variant="outline" size="sm" fullWidth className="gap-2">
                     <Navigation size={16} /> Petunjuk Arah
                   </Button>
                   <Button variant="primary" size="sm" fullWidth>
                     Reservasi
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};