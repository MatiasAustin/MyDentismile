import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-slate-900 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/10 border border-transparent",
    secondary: "bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-100",
    outline: "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-transparent",
    ghost: "text-slate-500 hover:text-brand-600 hover:bg-brand-50/50",
    glass: "bg-white/70 backdrop-blur-md border border-white/50 text-slate-900 hover:bg-white shadow-sm"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs uppercase tracking-wider",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-5 text-base"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};