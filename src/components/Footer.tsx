import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Settings, GraduationCap, Github, Linkedin, Instagram, Mail, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated, t } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-900 dark:text-white font-bold text-sm">
            <GraduationCap className="w-4 h-4 text-[#0066CC]" />
            <span>{data.profile.fullName}</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            © {new Date().getFullYear()} {data.profile.fullName} • AI & Operations
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {data.profile.githubUrl && (
            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {data.profile.linkedinUrl && (
            <a
              href={data.profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
          {data.profile.instagramUrl && (
            <a
              href={data.profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 text-pink-600 dark:text-pink-400 font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          )}
          <a
            href={`mailto:${data.profile.email}`}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t('E-Posta', 'Email')}</span>
          </a>

          {/* Admin Login link at the very bottom */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1 font-medium text-zinc-500 hover:text-[#0066CC] dark:hover:text-white transition-colors cursor-pointer border-l border-zinc-300 dark:border-zinc-700 pl-3"
            title={isAdminAuthenticated ? t('Yönetim Paneli', 'Admin Panel') : t('Yönetici Girişi', 'Admin Login')}
          >
            {isAdminAuthenticated ? <Settings className="w-3.5 h-3.5 text-[#0066CC]" /> : <Lock className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{isAdminAuthenticated ? t('Yönetim Paneli', 'Admin Panel') : t('Yönetici Girişi', 'Admin Login')}</span>
          </button>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          title={t('Yukarı Çık', 'Scroll to Top')}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
