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
  delay?: number;
}

const GridButton = ({ icon, label, href = '#', delay = 0 }: GridButtonProps) => (
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

const WideButton = ({ icon, label, variant = 'primary', href = '#', delay = 0 }: WideButtonProps) => (
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

export default function LinkInBio() {
  return (
    <div className="min-h-screen bg-bg-light selection:bg-primary/10">
      <main className="pt-28 pb-12 px-6 max-w-md mx-auto flex flex-col items-center">
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
            href="https://datanetworks.lat/"
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
            <GridButton icon={<Edit3 className="w-6 h-6" />} label="Asesoría" href="/contactus" delay={0.5} />
            <GridButton icon={<Phone className="w-6 h-6" />} label="Llamada" href="tel:+8017079787" delay={0.55} />
            <GridButton icon={<MessageCircle className="w-6 h-6" />} label="WhatsApp" href="https://wa.me/+8017079787" delay={0.6} />
            
            <GridButton icon={<Mail className="w-6 h-6" />} label="Email" href="mailto:Ivan@teambluekeyrealty.com" delay={0.65} />
            <GridButton icon={<Youtube className="w-6 h-6" />} label="YouTube" href="https://youtube.com/@ivanutahrealtor?si=6qY8fj7ZdnLwpCKY" delay={0.7} />
            <GridButton icon={<Video className="w-6 h-6" />} label="TikTok" href="https://www.tiktok.com/@ivan.utah.realtor?_r=1&_t=ZT-94047Kly72b" delay={0.75} />
            
            <GridButton icon={<Facebook className="w-6 h-6" />} label="Facebook" href="https://www.facebook.com/share/1a7uYhXra2/?mibextid=wwXIfr" delay={0.85} />
            <GridButton icon={<Instagram className="w-6 h-6" />} label="Instagram" href="https://www.instagram.com/ivanutahrealtor?igsh=MWowb2lwcWQ3ZHlhaQ%3D%3D&utm_source=qr" delay={0.9} />

          </div>
        </section>

        {/* Wide Buttons */}
        <section className="w-full space-y-4 mb-12">
          <WideButton 
            variant="accent"
            icon={<MailWarning className="w-6 h-6" />} 
            label="Suscríbete a mi Newsletter" 
            href="/contactus"
            delay={1.0}
          />
          <WideButton 
            icon={<Building2 className="w-6 h-6" />} 
            label="Condos: Nuevas Construcciones" 
            href="/properties"
            delay={1.1}
          />
          <WideButton 
            icon={<Home className="w-6 h-6" />} 
            label="Casas: Nueva Construcción" 
            href="/properties"
            delay={1.2}
          />
          <WideButton 
            icon={<TrendingUp className="w-6 h-6" />} 
            label="Blog para Inversionistas" 
            href="/blog"
            delay={1.3}
          />
          <WideButton 
            icon={<BookOpen className="w-6 h-6" />} 
            label="Guías Inmobiliarias Gratis" 
            href="/blog"
            delay={1.4}
          />
        </section>

        {/* Footer */}
        <footer className="w-full py-8 flex flex-col items-center gap-4 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            © 2024 IVAN NAVINCOPA. LUXURY REAL ESTATE CURATOR.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-primary transition-colors">
              Legal Notice
            </a>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
