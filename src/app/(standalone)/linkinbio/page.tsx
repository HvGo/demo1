import React from 'react';
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
import { getSiteSectionByKey } from '@/lib/queries/content';
import { GridButton, WideButton } from './GridButtonClient';

const PROFILE_IMAGE = "/images/Gallery/ivan_dibujo.png";

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

export default async function LinkInBio() {
  // Get contact info from DB (same as FloatingBubbles)
  const contactSection = await getSiteSectionByKey('contact_page')
  const contactConfig = contactSection?.contentData || {}
  const whatsAppNumber = contactConfig.phone || '+1-801-707-0787'
  const phoneDigits = normalizePhoneNumber(whatsAppNumber)
  const whatsappMessage = encodeURIComponent('Hola, quisiera más información')
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}?text=${whatsappMessage}` : 'https://wa.me'

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
            https://ivanutahrealtor.com/
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </section>

        {/* Grid Buttons */}
        <section className="w-full mb-10">
          <div className="grid grid-cols-3 gap-3">
            <GridButton icon={<Edit3 className="w-6 h-6" />} label="Asesoría" href="/contactus" delay={0.5} />
            <GridButton icon={<Phone className="w-6 h-6" />} label="Llamada" href={`tel:${whatsAppNumber}`} delay={0.55} />
            <GridButton icon={<MessageCircle className="w-6 h-6" />} label="WhatsApp" href={whatsappHref} delay={0.6} />
            
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
