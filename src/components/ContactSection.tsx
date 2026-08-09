import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Send, Download, CheckCircle2, Github, Linkedin, Twitter, Instagram, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Üniversite Başvurusu / İşbirliği', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: 'Üniversite Başvurusu / İşbirliği', message: '' });
    }, 4000);
  };

  const getRadiusClass = () => {
    switch (data.theme.borderRadius) {
      case 'sm': return 'rounded-xl';
      case 'md': return 'rounded-2xl';
      case 'lg': return 'rounded-3xl';
      case 'xl': return 'rounded-[2rem]';
      default: return 'rounded-2xl';
    }
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
          İLETİŞİM & DANIŞMANLIK
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-white tracking-tight">
          Benimle İletişime Geçin
        </h2>
        <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
          Üniversite başvuru komiteleri, akademisyenler ve proje ortaklıkları için doğrudan mesaj gönderebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-7 rounded-[32px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
              İletişim Kanalları
            </h3>

            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${data.profile.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/10 hover:border-[#0066CC] transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-[#0066CC] text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#86868B] font-medium">E-Posta</div>
                  <div className="font-bold text-[#1D1D1F] dark:text-white">{data.profile.email}</div>
                </div>
              </a>

              <a
                href={data.profile.instagramUrl || 'https://www.instagram.com/gear2head/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/10 hover:border-pink-500 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#86868B] font-medium">Instagram</div>
                  <div className="font-bold text-[#1D1D1F] dark:text-white">@gear2head</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-[#0066CC] text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#86868B] font-medium">Konum</div>
                  <div className="font-bold text-[#1D1D1F] dark:text-white">{data.profile.location}</div>
                </div>
              </div>
            </div>

            {/* Resume download */}
            {data.profile.resumeUrl && (
              <a
                href={data.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-full bg-[#1D1D1F] text-white dark:bg-white dark:text-[#1D1D1F] font-semibold text-xs transition-opacity hover:opacity-90 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Akademik CV & Özgeçmiş İndir (PDF)</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-7 rounded-[32px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm space-y-4"
          >
            <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
              Anlık Mesaj Gönder
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#86868B]">
                  Adınız & Soyadınız
                </label>
                <input
                  type="text"
                  required
                  placeholder="Prof. Dr. Ahmet Yılmaz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-white/10 text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#86868B]">
                  E-Posta Adresiniz
                </label>
                <input
                  type="email"
                  required
                  placeholder="ahmet@universite.edu.tr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-white/10 text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#86868B]">
                Konu
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-white/10 text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#86868B]">
                Mesajınız
              </label>
              <textarea
                rows={4}
                required
                placeholder="Başvuru dosyanız veya projeniz hakkında detaylı notlarınızı iletebilirsiniz..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-white/10 text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0066CC] hover:bg-[#0077ED] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Mesajınız İletildi! Teşekkürler.</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Mesajı Gönder</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
