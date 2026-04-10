'use client'

import React, { ReactNode } from 'react';
import { 
  Edit3, 
  Phone, 
  MessageCircle, 
  Mail, 
  Youtube, 
  Video, 
  Linkedin, 
  Facebook, 
  Instagram, 
  ArrowUpRight, 
  MailWarning, 
  Building2, 
  Home, 
  TrendingUp, 
  BookOpen, 
  Video as VideoIcon
} from 'lucide-react';

const PROFILE_IMAGE = "/images/Gallery/ivan_dibujo.png";

interface GridButtonProps {
  icon: ReactNode;
  label: string;
  href?: string;
}

const GridButton = ({ icon, label, href = '#' }: GridButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100 transition-all cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
  >
    <div className="text-primary">{icon}</div>
    <span className="text-[10px] uppercase font-bold tracking-wider text-primary-light">{label}</span>
  </a>
);

interface WideButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'primary' | 'accent';
  href?: string;
}

const WideButton = ({ icon, label, variant = 'primary', href = '#' }: WideButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
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
  </a>
);

export default function LinkInBio() {
  return (
    <div className="min-h-screen bg-bg-light selection:bg-primary/10">
      <main className="py-12 px-6 max-w-md mx-auto flex flex-col items-center">
        {/* Profile Section */}
        <section className="text-center mb-10 w-full">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-primary blur-3xl opacity-10 scale-150"></div>
            <img 
              src={PROFILE_IMAGE} 
              alt="Ivan Navincopa" 
              className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-primary mb-1">
            Ivan Navincopa
          </h1>
          
          <p className="font-sans text-[10px] tracking-[0.25em] text-primary-light uppercase font-bold mb-4">
            CEO | REAL ESTATE BROKER
          </p>
          
          <a 
            href="https://www.ivannavincopa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 text-sm font-medium hover:text-primary transition-colors flex items-center justify-center gap-1 group"
          >
            www.ivannavincopa.com
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </section>

        {/* Grid Buttons */}
        <section className="w-full mb-10">
          <div className="grid grid-cols-3 gap-3">
            <GridButton icon={<Edit3 className="w-6 h-6" />} label="Asesoría" href="/contactus" />
            <GridButton icon={<Phone className="w-6 h-6" />} label="Llamada" href="tel:+1234567890" />
            <GridButton icon={<MessageCircle className="w-6 h-6" />} label="WhatsApp" href="https://wa.me/1234567890" />
            
            <GridButton icon={<Mail className="w-6 h-6" />} label="Email" href="mailto:contact@ivannavincopa.com" />
            <GridButton icon={<Youtube className="w-6 h-6" />} label="YouTube" href="https://youtube.com" />
            <GridButton icon={<Video className="w-6 h-6" />} label="TikTok" href="https://tiktok.com" />
            
            <GridButton icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" href="https://linkedin.com" />
            <GridButton icon={<Facebook className="w-6 h-6" />} label="Facebook" href="https://facebook.com" />
            <GridButton icon={<Instagram className="w-6 h-6" />} label="Instagram" href="https://instagram.com" />
          </div>
        </section>

        {/* Wide Buttons */}
        <section className="w-full space-y-4 mb-12">
          <WideButton 
            variant="accent"
            icon={<MailWarning className="w-6 h-6" />} 
            label="Suscríbete a mi Newsletter" 
            href="/newsletter"
          />
          <WideButton 
            icon={<Building2 className="w-6 h-6" />} 
            label="Condos: Nuevas Construcciones" 
            href="/properties?type=condo"
          />
          <WideButton 
            icon={<Home className="w-6 h-6" />} 
            label="Casas: Nueva Construcción" 
            href="/properties?type=house"
          />
          <WideButton 
            icon={<TrendingUp className="w-6 h-6" />} 
            label="Blog para Inversionistas" 
            href="/blog"
          />
          <WideButton 
            icon={<BookOpen className="w-6 h-6" />} 
            label="Guías Inmobiliarias Gratis" 
            href="/guides"
          />
          <WideButton 
            icon={<VideoIcon className="w-6 h-6" />} 
            label="Webinars Inmobiliarios Gratis" 
            href="/webinars"
          />
        </section>
      </main>
    </div>
  );
}
