'use client'

import { ReactNode } from 'react'

interface GridButtonProps {
  icon: ReactNode;
  label: string;
  href?: string;
  delay?: number;
}

export const GridButton = ({ icon, label, href = '#', delay = 0 }: GridButtonProps) => (
  <button
    onClick={() => {
      if (href && href !== '#') {
        if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
    }}
    style={{
      animation: `fadeInUp 0.5s ease-out ${delay}s both`,
    }}
    className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100 transition-all cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
  >
    <div className="text-primary">{icon}</div>
    <span className="text-[10px] uppercase font-bold tracking-wider text-primary-light">{label}</span>
  </button>
);

interface WideButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'primary' | 'accent';
  href?: string;
  delay?: number;
}

export const WideButton = ({ icon, label, variant = 'primary', href = '#', delay = 0 }: WideButtonProps) => (
  <button
    onClick={() => {
      if (href && href !== '#') {
        if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
    }}
    style={{
      animation: `slideInLeft 0.5s ease-out ${delay}s both`,
    }}
    className={`w-full py-5 px-6 rounded-2xl flex items-center justify-between shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${
      variant === 'accent' 
        ? 'bg-gradient-to-br from-[#FEBC59] to-[#FFCF85] text-slate-900 shadow-accent/20' 
        : 'bg-gradient-to-br from-[#10209C] to-[#2F3DB2] text-white shadow-primary/20'
    }`}
  >
    <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-left pr-4">
      {label}
    </span>
    <div className={variant === 'accent' ? 'text-slate-900' : 'text-accent'}>
      {icon}
    </div>
  </button>
);
