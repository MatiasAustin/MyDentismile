import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, User, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SERVICES, BRANCHES } from '../constants';

// System instruction to give the AI context about the clinic
const SYSTEM_INSTRUCTION = `
You are the AI Assistant for "MyDentismile", a futuristic and modern dental clinic.
Your tone should be: Professional, Warm, Empathetic, and Concise.

Here is the clinic data you must know:

SERVICES:
${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}

LOCATIONS (BRANCHES):
${BRANCHES.map(b => `- ${b.name}: ${b.address} (Open: ${b.hours})`).join('\n')}

GOALS:
1. Answer questions about our services and locations.
2. If a user wants to book, guide them to the "Reservasi" or "Contact" page.
3. Keep answers short (under 50 words) unless detailed explanation is asked.
4. Use emojis sparingly to be friendly.

If you don't know an answer, politely ask them to contact our WhatsApp or official email.
`;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: 'Halo! 👋 Saya asisten AI MyDentismile. Ada yang bisa saya bantu mengenai perawatan gigi atau reservasi hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Construct history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history
      });

      const result = await chat.sendMessage({ message: userMsg.text });
      const responseText = result.text;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti."
      }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Maaf, koneksi sedang tidak stabil. Silakan hubungi kami via WhatsApp untuk respons lebih cepat."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 group flex items-center justify-center transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Chat"
      >
        <div className="absolute inset-0 bg-brand-400 rounded-full animate-ping opacity-20 duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-white/10 group-hover:-translate-y-1 transition-transform">
          <Sparkles size={20} className="absolute top-3 right-3 text-brand-300 animate-pulse" />
          <Bot size={28} />
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] max-h-[600px] h-[80vh] flex flex-col bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2rem] overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-brand-300 flex items-center justify-center shadow-lg relative">
              <Bot size={20} className="text-white" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">MyDentismile AI</h3>
              <p className="text-[10px] text-brand-300 uppercase tracking-wider font-medium flex items-center gap-1">
                <Sparkles size={8} /> Online • Gemini Powered
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <Minimize2 size={16} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mb-1">
                  <Bot size={14} className="text-brand-600" />
                </div>
              )}
              
              <div 
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mb-1">
                  <User size={14} className="text-slate-500" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start gap-2">
               <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-brand-600" />
                </div>
                <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100">
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang layanan..."
              className="flex-grow bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-brand-500/20"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} className="ml-0.5" />}
            </button>
          </form>
          <div className="text-[10px] text-center text-slate-400 mt-2">
            AI dapat melakukan kesalahan. Silakan verifikasi informasi penting.
          </div>
        </div>
      </div>
    </>
  );
};