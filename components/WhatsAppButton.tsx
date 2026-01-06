import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/6281234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center justify-center p-0 transition-all duration-300 hover:scale-105"
      aria-label="Chat WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-2 group-hover:pr-6 transition-all duration-300">
        <MessageCircle size={28} fill="white" className="text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-semibold">
          Chat Kami
        </span>
      </div>
    </a>
  );
};