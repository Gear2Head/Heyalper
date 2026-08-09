import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Zap, 
  Plus, 
  User, 
  FolderKanban, 
  GraduationCap, 
  Cpu, 
  FileCheck2, 
  Bot, 
  Download, 
  Palette, 
  ArrowUp, 
  Globe2, 
  Sun, 
  Moon, 
  Lock, 
  ShieldCheck, 
  X, 
  ChevronRight,
  Settings,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickActions: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    openAdminTab, 
    setIsAdminOpen, 
    language, 
    setLanguage, 
    data, 
    updateTheme, 
    t 
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle scroll-to-top visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleAction = (tab: 'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup') => {
    setIsOpen(false);
    openAdminTab(tab);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-72 sm:w-80 rounded-3xl bg-white/90 dark:bg-[#1D1D1F]/95 backdrop-blur-2xl border border-[#D2D2D7]/80 dark:border-[#333336] shadow-2xl p-4 space-y-3 overflow-hidden text-[#1D1D1F] dark:text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#D2D2D7]/50 dark:border-[#333336]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#0066CC] text-white shadow-sm">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1D1D1F] dark:text-white">
                    {t('Hızlı İşlemler', 'Quick Actions')}
                  </h3>
                  <p className="text-[10px] text-[#86868B]">
                    {isAdminAuthenticated 
                      ? t('Yönetici Modu Aktif', 'Admin Session Active') 
                      : t('Erişim & Yönetim Kisayollari', 'Shortcuts & Admin Panel')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#86868B] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Session Badge */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/40 dark:border-[#333336] text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-[#86868B]">
                <ShieldCheck className={`w-3.5 h-3.5 ${isAdminAuthenticated ? 'text-emerald-500' : 'text-amber-500'}`} />
                <span>{isAdminAuthenticated ? 'Administrator' : t('Yönetici Girişi', 'Admin Auth Needed')}</span>
              </span>
              {!isAdminAuthenticated && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-[#0066CC] text-white text-[10px] font-semibold hover:bg-[#0077ED] transition-colors cursor-pointer"
                >
                  {t('Giriş Yap', 'Sign In')}
                </button>
              )}
            </div>

            {/* Quick Action Items List */}
            <div className="space-y-1 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => handleAction('projects')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('Yeni Proje Ekle', 'Add New Project')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('profile')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('Profil & İletişim Düzenle', 'Edit Profile & Contact')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('timeline')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('Akademik Geçmişi Güncelle', 'Update Academic Timeline')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('skills')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('Yetenek & Stack Değiştir', 'Edit Skills & Stack')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('audit')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('İçerik Denetimi Çalıştır', 'Run Content Audit')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('ai')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('AI Kabul Asistanı', 'AI Admissions Assistant')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('backup')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Download className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{t('Yedekle & Dışa Aktar', 'Backup & Export Data')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Universal Toggles Footer */}
            <div className="pt-2 border-t border-[#D2D2D7]/50 dark:border-[#333336] grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E8E8ED] dark:hover:bg-[#3A3A3C] font-semibold transition-colors cursor-pointer"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>{language === 'tr' ? 'EN Switch' : 'TR Switch'}</span>
              </button>

              <button
                onClick={() => updateTheme({ darkMode: !data.theme.darkMode })}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E8E8ED] dark:hover:bg-[#3A3A3C] font-semibold transition-colors cursor-pointer"
              >
                {data.theme.darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                <span>{data.theme.darkMode ? t('Aydınlık', 'Light') : t('Karanlık', 'Dark')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Stack */}
      <div className="flex items-center gap-2">
        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="p-3.5 rounded-full bg-white/80 dark:bg-[#1D1D1F]/90 backdrop-blur-2xl border border-[#D2D2D7]/80 dark:border-[#333336] text-[#1D1D1F] dark:text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={t('En Üste Dön', 'Scroll to Top')}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Quick Actions Floating Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl backdrop-blur-2xl transition-all cursor-pointer border ${
            isOpen
              ? 'bg-[#0066CC] text-white border-[#0066CC]'
              : 'bg-white/85 dark:bg-[#1D1D1F]/90 text-[#1D1D1F] dark:text-white border-[#D2D2D7]/80 dark:border-[#333336] hover:border-[#0066CC]'
          }`}
        >
          <div className="relative">
            <Zap className={`w-4 h-4 ${isOpen ? 'fill-white' : 'text-[#0066CC]'}`} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066CC] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066CC]"></span>
            </span>
          </div>
          <span className="text-xs font-bold hidden sm:inline">
            {isOpen ? t('Kapat', 'Close') : t('Hızlı İşlemler', 'Quick Actions')}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
