import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  User, 
  FolderKanban, 
  GraduationCap, 
  Globe2,
  Cpu, 
  Award, 
  Mail, 
  Settings, 
  Sun, 
  Moon, 
  Lock,
  Unlock,
  Clock,
  Sparkles,
  ExternalLink,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { data, updateTheme, toggleThemeLock, setIsAdminOpen, isAdminAuthenticated, activeSection, setActiveSection, language, setLanguage, t } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('Hakkımda', 'About'), icon: User },
    { id: 'bento', label: t('Özet', 'Summary'), icon: Sparkles },
    { id: 'projects', label: t('Projeler', 'Projects'), icon: FolderKanban },
    { id: 'academic', label: t('Akademik', 'Academic'), icon: GraduationCap },
    { id: 'international', label: t('Uluslararası', 'International'), icon: Globe2 },
    { id: 'skills', label: t('Yetenekler', 'Skills'), icon: Cpu },
    { id: 'certificates', label: t('Sertifikalar', 'Certificates'), icon: Award },
    { id: 'contact', label: t('İletişim', 'Contact'), icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apple accent color mappings
  const getAccentBgClass = () => {
    switch (data.theme.accentColor) {
      case 'purple': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'emerald': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'amber': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'rose': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'slate': return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20';
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 transition-all duration-300 rounded-full border shadow-xl backdrop-blur-2xl ${
          scrolled 
            ? 'bg-white/85 dark:bg-[#1D1D1F]/90 border-[#D2D2D7]/80 dark:border-[#333336]/80 shadow-black/5 dark:shadow-black/40' 
            : 'bg-white/70 dark:bg-[#1D1D1F]/70 border-[#D2D2D7]/50 dark:border-[#333336]/50'
        }`}
      >
        {/* Nav links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1D1D1F] dark:text-white font-semibold'
                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/15 shadow-inner"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-[#D2D2D7] dark:bg-[#333336] mx-0.5 sm:mx-1" />

        {/* Dark mode & Auto time-lock control */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => updateTheme({ darkMode: !data.theme.darkMode })}
            aria-label="Tema Değiştir"
            className="p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title={data.theme.darkMode ? t('Aydınlık Moda Geç (Seçim Kilitlenir)', 'Switch to Light Mode (Locks Selection)') : t('Karanlık Moda Geç (Seçim Kilitlenir)', 'Switch to Dark Mode (Locks Selection)')}
          >
            {data.theme.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleThemeLock}
            className={`p-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
              data.theme.isThemeLocked
                ? 'text-[#0066CC] hover:bg-[#0066CC]/10'
                : 'text-emerald-500 hover:bg-emerald-500/10'
            }`}
            title={
              data.theme.isThemeLocked
                ? t('Tema Manuel Kilitli. Otomatik moda dönmek için tıklayın.', 'Theme Locked. Click to enable Auto Time-Based Theme.')
                : t('Otomatik Tema Aktif (19:00 - 07:00 Gece). Manuel kilitlemek için tıklayın.', 'Auto Theme Active (7 PM - 7 AM Dark). Click to lock manually.')
            }
          >
            {data.theme.isThemeLocked ? (
              <Lock className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3 text-emerald-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Apple Minimalist Language Switcher Segmented Control */}
        <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[11px] font-bold">
          <button
            onClick={() => setLanguage('tr')}
            className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
              language === 'tr'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm'
                : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
            title="Türkçe"
          >
            TR
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
              language === 'en'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm'
                : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
            title="English"
          >
            EN
          </button>
        </div>

        {/* Admin Management Panel trigger (only visible when authenticated as senerkadiralper@gmail.com) */}
        {isAdminAuthenticated && (
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0066CC] hover:bg-[#0077ED] text-white shadow-md transition-colors cursor-pointer ml-1"
            title={t('Yönetim Adresi & İçerik Düzenleyici', 'Admin & Content Editor')}
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden lg:inline">{t('Yönetim Paneli', 'Admin Panel')}</span>
          </button>
        )}
      </motion.nav>
    </header>
  );
};
