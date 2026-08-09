import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  FolderKanban, 
  Terminal, 
  Award, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  Settings,
  Mail,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BentoGrid: React.FC = () => {
  const { data, setSelectedProjectForModal, setIsAdminOpen, isAdminAuthenticated, t } = usePortfolio();

  const featuredProject = data.projects.find((p) => p.featured) || data.projects[0];

  return (
    <section id="bento" className="py-12 px-4 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
            {t('AKADEMİK & TEKNİK BENTO PANOSU', 'ACADEMIC & TECHNICAL BENTO BOARD')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            {t('Portfolyo Özet Görünümü', 'Portfolio Overview')}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Featured Project (Spans 8 cols) */}
        {featuredProject && (
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProjectForModal(featuredProject)}
            className="md:col-span-8 bg-white dark:bg-[#1D1D1F] rounded-[32px] p-8 sm:p-10 shadow-sm border border-[#D2D2D7] dark:border-[#333336] relative overflow-hidden flex flex-col justify-between cursor-pointer group"
          >
            <div className="absolute top-6 right-6">
              <div className="w-11 h-11 rounded-full border border-[#D2D2D7] dark:border-[#333336] flex items-center justify-center bg-white/80 dark:bg-black/50 group-hover:bg-[#0066CC] group-hover:border-[#0066CC] group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight className="w-5 h-5 text-[#1D1D1F] dark:text-white group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Background image ambient layer */}
            <div className="absolute right-[-60px] bottom-[-40px] w-[380px] h-[380px] rounded-full overflow-hidden opacity-15 dark:opacity-25 pointer-events-none group-hover:scale-105 transition-transform duration-700">
              <img
                src={featuredProject.imageUrl}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="z-10 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-[#0066CC]/10 px-3 py-1 rounded-full">
                  {t('Öne Çıkan Çalışma', 'Featured Work')} • {featuredProject.category}
                </span>
                <span className="text-xs font-semibold text-[#86868B]">{featuredProject.date}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.1] max-w-xl">
                {featuredProject.title}
              </h3>

              <p className="text-[#86868B] text-base sm:text-lg max-w-lg leading-relaxed">
                {featuredProject.subtitle || featuredProject.description}
              </p>
            </div>

            <div className="z-10 pt-6 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#D2D2D7]/50 dark:border-[#333336]">
              <div className="flex flex-wrap gap-2">
                {featuredProject.tags.slice(0, 4).map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/60 dark:border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {featuredProject.metrics && (
                <span className="text-xs font-bold text-[#0066CC] dark:text-blue-400 flex items-center gap-1.5 bg-[#0066CC]/10 px-3 py-1 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{featuredProject.metrics}</span>
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Card 2: CMS / Content Management System Panel Card (4 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={`md:col-span-4 rounded-[32px] p-8 flex flex-col justify-between border transition-all duration-300 ${
            data.theme.darkMode
              ? 'bg-[#1D1D1F] text-white border-[#333336] shadow-lg'
              : 'bg-white text-[#1D1D1F] border-[#D2D2D7] shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-medium tracking-tight">{t('İçerik Yönetim Sistemi', 'Content Management')}</h3>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" title="Canlı Veri Senkronu" />
            </div>

            <div className="space-y-3">
              <div className={`p-4 rounded-2xl border transition-colors ${
                data.theme.darkMode
                  ? 'bg-[#2C2C2E] border-[#333336]'
                  : 'bg-[#F5F5F7] border-[#D2D2D7]/80'
              }`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#86868B] mb-1">
                  {t('Yönetim Durumu', 'Admin Status')}
                </div>
                <div className={`text-xs font-semibold ${data.theme.darkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  {data.projects.length} {t('Proje', 'Projects')} • {data.certificates.length} {t('Sertifika', 'Certificates')}
                </div>
                <div className={`h-1 rounded-full w-full mt-3 overflow-hidden ${data.theme.darkMode ? 'bg-[#333336]' : 'bg-[#E8E8ED]'}`}>
                  <div className="bg-[#0066CC] h-full w-full rounded-full" />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-colors ${
                data.theme.darkMode
                  ? 'bg-[#2C2C2E] border-[#333336]'
                  : 'bg-[#F5F5F7] border-[#D2D2D7]/80'
              }`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#86868B] mb-1">
                  {data.profile.targetUniversity ? t('Hedef Üniversite', 'Target University') : t('Hedef Bölüm & OBP', 'Target Major & OBP')}
                </div>
                <div className={`text-xs font-semibold flex items-center justify-between ${data.theme.darkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  <span>{data.profile.targetUniversity ? data.profile.targetUniversity : t(data.profile.targetMajor, 'Computer Science & Software Engineering')}</span>
                  <span className="text-emerald-500 font-bold">{data.profile.gpa}</span>
                </div>
              </div>
            </div>
          </div>

          {isAdminAuthenticated ? (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="mt-6 bg-[#0066CC] hover:bg-[#0077ED] transition-colors py-3.5 rounded-2xl text-center text-sm font-semibold text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>{t('Bilgi & Görsel Girişi Yap', 'Open Content Editor')}</span>
            </button>
          ) : (
            <div className={`mt-6 py-2.5 rounded-2xl text-center text-xs text-[#86868B] font-medium border flex items-center justify-center gap-2 ${
              data.theme.darkMode
                ? 'bg-[#2C2C2E]/60 border-[#333336]'
                : 'bg-[#F5F5F7] border-[#D2D2D7]/60'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('Sistem Durumu: Aktif & Senkronize', 'System Status: Active & Synced')}</span>
            </div>
          )}
        </motion.div>

        {/* Card 3: Metrics & Stats Card (4 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-4 bg-white dark:bg-[#1D1D1F] rounded-[32px] p-8 shadow-sm border border-[#D2D2D7] dark:border-[#333336] flex items-center justify-between gap-4"
        >
          <div className="flex-1">
            <div className="text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              {data.projects.length}+
            </div>
            <div className="text-xs font-bold text-[#86868B] uppercase tracking-wider mt-1">
              {t('Yönetilen Proje', 'Managed Projects')}
            </div>
          </div>

          <div className="w-[1px] h-12 bg-[#D2D2D7] dark:bg-[#333336]" />

          <div className="flex-1">
            <div className="text-4xl font-bold tracking-tight text-[#0066CC]">
              {data.certificates.length + 5}
            </div>
            <div className="text-xs font-bold text-[#86868B] uppercase tracking-wider mt-1">
              {t('Sertifika & Yetkinlik', 'Certifications')}
            </div>
          </div>
        </motion.div>

        {/* Card 4: Academic Questions & Values (4 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-4 bg-[#E8E8ED] dark:bg-[#2C2C2E] rounded-[32px] p-8 flex flex-col justify-between border border-[#D2D2D7] dark:border-[#333336]"
        >
          <div className="w-12 h-12 bg-white dark:bg-[#1D1D1F] rounded-2xl shadow-sm flex items-center justify-center text-2xl mb-4">
            ✨
          </div>
          <div>
            <h4 className="font-semibold text-lg text-[#1D1D1F] dark:text-white mb-3">
              {t('Akademik & Mühendislik Değerleri:', 'Academic & Engineering Focus:')}
            </h4>
            <ul className="text-xs text-[#424245] dark:text-zinc-300 space-y-2 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                <span>{t(data.profile.targetMajor, 'Computer Science & Software Engineering')} {t('Odaklı Araştırmalar', 'Focused Research')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                <span>{t('AI Prompt Mühendisliği & SQL Entegrasyonu', 'AI Prompting & SQL Systems')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                <span>{t('Apple Tasarım Estetiği & Minimalist Akış', 'Apple Design & Minimalist UI')}</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Card 5: Quick Contact & Status (4 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={`md:col-span-4 rounded-[32px] p-8 flex items-center justify-between border transition-all duration-300 ${
            data.theme.darkMode
              ? 'bg-[#1D1D1F] text-white border-[#333336] shadow-lg'
              : 'bg-white text-[#1D1D1F] border-[#D2D2D7] shadow-sm'
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-1">
              {t('İletişim & Başvuru', 'Contact & Inquiries')}
            </div>
            <div className={`text-base font-semibold truncate ${data.theme.darkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>
              {data.profile.email}
            </div>
            <div className="text-[11px] text-[#86868B] mt-1">
              {t(data.profile.location, 'Istanbul, Türkiye')}
            </div>
          </div>
          <a
            href={`mailto:${data.profile.email}`}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 shadow-sm ${
              data.theme.darkMode
                ? 'bg-white text-black hover:bg-[#0066CC] hover:text-white'
                : 'bg-[#F5F5F7] text-zinc-800 hover:bg-[#0066CC] hover:text-white border border-[#D2D2D7]/60'
            }`}
            title="E-Posta Gönder"
          >
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

