import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { PageView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: PageView }[] = [
    { label: 'Beranda', value: 'home' },
    { label: 'Layanan', value: 'services' },
    { label: 'Tentang Kami', value: 'about' },
    { label: 'Lokasi', value: 'locations' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-slate-50/50">
      
      {/* AMBIENT LIGHT TRAILS (Background) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Glass Header */}
      <header className={`fixed top-6 left-0 right-0 z-50 px-4 sm:px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-full px-6 py-4 flex justify-between items-center transition-all duration-500 border ${scrolled ? 'bg-white/70 backdrop-blur-xl border-white/40 shadow-lg shadow-slate-200/10' : 'bg-white/40 backdrop-blur-md border-white/30'}`}>
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-brand-500 to-brand-300 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                 <span className="text-white font-bold text-sm">MD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-800 leading-none">
                  MYDENTISMILE
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Future Care</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-white/50 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    currentPage === item.value 
                      ? 'bg-white text-brand-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:block">
               <Button 
                variant="primary" 
                size="sm"
                className="rounded-full px-6 group"
                onClick={() => handleNavClick('contact')}
              >
                Reservasi <ArrowUpRight size={16} className="ml-1 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-600 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full backdrop-blur-md border border-white/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-24 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300 z-50">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-left py-4 px-6 rounded-2xl text-sm font-bold ${
                  currentPage === item.value 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              fullWidth 
              onClick={() => handleNavClick('contact')}
              className="mt-2 py-4"
            >
              Reservasi Sekarang
            </Button>
          </div>
        )}
      </header>

      {/* Main Content - Wrapped in Glass Container style concept */}
      <main className="flex-grow pt-32 pb-10 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-10rem)]">
           {children}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-slate-200/60 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="font-bold tracking-tight text-slate-900">MYDENTISMILE</span>
              <p className="text-xs text-slate-500 mt-1">© 2024. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6">
               <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-white transition-all">
                 <Instagram size={18} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-white transition-all">
                 <Facebook size={18} />
               </a>
            </div>
            
            <div className="text-xs text-slate-400 flex gap-4">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};