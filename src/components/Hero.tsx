import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Settings,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated, t } = usePortfolio();
  const [showLongBio, setShowLongBio] = useState(false);

  // Dynamic rounding class
  const getRadiusClass = () => {
    switch (data.theme.borderRadius) {
      case 'sm': return 'rounded-lg';
      case 'md': return 'rounded-xl';
      case 'lg': return 'rounded-2xl';
      case 'xl': return 'rounded-3xl';
      case 'full': return 'rounded-3xl';
      default: return 'rounded-2xl';
    }
  };

  const getAccentBgClass = () => {
    switch (data.theme.accentColor) {
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20';
      case 'amber': return 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20';
      case 'rose': return 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20';
      case 'slate': return 'bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-white shadow-zinc-500/20';
      default: return 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20';
    }
  };

  const getAccentTextClass = () => {
    switch (data.theme.accentColor) {
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'emerald': return 'text-emerald-600 dark:text-emerald-400';
      case 'amber': return 'text-amber-600 dark:text-amber-400';
      case 'rose': return 'text-rose-600 dark:text-rose-400';
      case 'slate': return 'text-zinc-700 dark:text-zinc-300';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background ambient lighting effects (Apple style smooth radial blur) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column - Main Details */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Target University Status Pill */}
          {data.profile.targetUniversity && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] text-xs font-semibold text-[#1D1D1F] dark:text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066CC] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066CC]"></span>
              </span>
              <GraduationCap className="w-3.5 h-3.5 text-[#0066CC]" />
              <span className="text-[#86868B]">{t('Hedef Üniversite:', 'Target University:')}</span>
              <span className="font-bold text-[#0066CC]">{t(data.profile.targetUniversity, data.profile.targetUniversity)}</span>
            </div>
          )}

          {/* Headline Name & Title */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.08]">
                {data.profile.fullName}
              </h1>
              {data.profile.akaName && (
                <p className="text-sm sm:text-base text-[#86868B]/85 dark:text-[#86868B]/80 font-medium tracking-normal mt-0.5">
                  aka {data.profile.akaName}
                </p>
              )}
            </div>
            <p className="text-xl sm:text-2xl font-medium tracking-tight text-[#0066CC]">
              {t(data.profile.title, 'AI Enthusiast & Community Operations Specialist')}
            </p>
          </div>

          {/* Short Bio */}
          <p className="text-[#86868B] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {t(
              data.profile.bio,
              'Tech enthusiast skilled in SQL querying, leveraging advanced AI developer tools (Claude, Codex, Gemini) at expert proficiency while leading operations for 297,800+ community members.'
            )}
          </p>

          {/* Highlights Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {data.profile.highlights.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-[24px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm hover:border-[#0066CC] transition-all"
              >
                <div className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
                  {t(item.value, item.value === 'Uzman' ? 'Expert' : item.value)}
                </div>
                <div className="text-xs font-semibold text-[#86868B]">
                  {t(
                    item.label,
                    item.label === 'Topluluk' ? 'Community' : item.label === 'AI Araçları' ? 'AI Tools' : item.label
                  )}
                </div>
                {item.subtext && (
                  <div className="text-[10px] text-[#86868B] truncate mt-0.5 font-medium">
                    {t(
                      item.subtext,
                      item.subtext === 'Lise Başarı Puanı' ? 'High School GPA' :
                      item.subtext === 'İleri Seviye İngilizce' ? 'Advanced English' :
                      item.subtext === '3 Sunucuda Toplam Üye' ? 'Total Across 3 Servers' :
                      item.subtext
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[#0066CC] hover:bg-[#0077ED] text-white shadow-md transition-all cursor-pointer"
            >
              <span>{t('Projelerimi İncele', 'Explore Projects')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all shadow-sm cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>{t('Yönetim Paneli', 'Admin Panel')}</span>
              </button>
            )}

            {data.profile.resumeUrl && (
              <a
                href={data.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full font-medium text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV (PDF)</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Column - Avatar & Academic Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="relative w-full max-w-sm p-8 rounded-[32px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm space-y-5 text-center">
            
            {/* Avatar Image with Apple Glow */}
            <div className="relative mx-auto w-36 h-36">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0066CC] via-purple-500 to-emerald-500 blur-md opacity-30 animate-pulse-slow" />
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.fullName}
                className="relative w-full h-full object-cover rounded-full border-2 border-white dark:border-zinc-800 shadow-lg"
              />
              <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#0066CC] text-white border-2 border-white dark:border-zinc-900 shadow-md" title="Aktif Aday & Araştırmacı">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info Summary */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white">
                {data.profile.fullName}
              </h3>
              {data.profile.akaName && (
                <p className="text-xs text-[#86868B]/75 dark:text-[#86868B]/65 font-medium">
                  aka {data.profile.akaName}
                </p>
              )}
              <p className="text-xs text-[#86868B] flex items-center justify-center gap-1 font-medium pt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t(data.profile.location, 'Istanbul, Türkiye')}</span>
              </p>
            </div>

            {/* Application Goals Badge */}
            <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-white/10 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-[#86868B] font-medium">
                <span>{t('Başvuru Hedefi:', 'Target Major:')}</span>
                <span className="text-[#1D1D1F] dark:text-white font-bold">{t(data.profile.targetMajor, 'Computer Science & Software Engineering')}</span>
              </div>
              <div className="flex items-center justify-between text-[#86868B] font-medium">
                <span>{t('Not Ortalaması:', 'GPA / OBP:')}</span>
                <span className="text-[#0066CC] font-bold">{data.profile.gpa}</span>
              </div>
              <div className="flex items-center justify-between text-[#86868B] font-medium">
                <span>{t('Dil Yeterliliği:', 'English Proficiency:')}</span>
                <span className="text-[#0066CC] font-bold">{data.profile.satScore}</span>
              </div>
            </div>

            {/* Long Bio Expansion Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowLongBio(!showLongBio)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('Akademik Niyet Beyanı', 'Academic Statement of Purpose')}</span>
                </span>
                {showLongBio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showLongBio && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-left"
                  >
                    <p className="mt-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic border border-black/5 dark:border-white/5">
                      "{t(
                        data.profile.longBio,
                        'I serve as Senior Operations Lead across major communities with 297,800+ total members (Adalances Main 228k, Adalances Secondary 68k, Lutheus 918). Rather than a traditional full-stack role, I specialize in SQL databases and AI developer tools (Claude, Codex, Gemini Pro) to build automated moderation and KPI tools like Lutheus Manage.'
                      )}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 pt-1">
              {data.profile.githubUrl && (
                <a
                  href={data.profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {data.profile.linkedinUrl && (
                <a
                  href={data.profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {data.profile.instagramUrl && (
                <a
                  href={data.profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-pink-600 dark:text-pink-400 transition-colors"
                  title="Instagram (@gear2head)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {data.profile.twitterUrl && (
                <a
                  href={data.profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-colors"
                  title="X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${data.profile.email}`}
                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="E-Posta"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
