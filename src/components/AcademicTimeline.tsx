import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AcademicTimeline: React.FC = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated, t } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'award' | 'research' | 'extracurricular'>('all');

  const filteredEntries = data.academicEntries.filter((e) => {
    if (activeTab === 'all') return true;
    return e.type === activeTab;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'award': return Award;
      case 'research': return Sparkles;
      case 'extracurricular': return Users;
      default: return GraduationCap;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'education': return t('Eğitim & Lise', 'Education & Academic');
      case 'award': return t('Ödüller & Sertifikalar', 'Awards & Certificates');
      case 'research': return t('AI & Sistem Çalışmaları', 'AI & System Workflows');
      case 'extracurricular': return t('Topluluk Liderliği & Operasyon', 'Community Operations');
      default: return t('Akademik', 'Academic');
    }
  };

  return (
    <section id="academic" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
            {t('AKADEMİK GEÇMİŞ, AI & OPERASYONLAR', 'ACADEMIC TIMELINE & OPERATIONAL MILESTONES')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-white tracking-tight">
            {t('Eğitim, AI Araçları & Topluluk Başarıları', 'Education, AI Tooling & Operational Leadership')}
          </h2>
          <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
            {t(
              'Akademik not ortalamaları, Claude/Codex/Gemini AI uzmanlık süreçleri, 297.8k+ üyeli topluluk yönetimi ve uluslararası sertifikalar.',
              'Academic excellence, advanced LLM prompt engineering specialization, large-scale community management, and EU certifications.'
            )}
          </p>
        </div>

        {isAdminAuthenticated && (
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0066CC] hover:bg-[#0077ED] text-white transition-colors shadow-sm cursor-pointer w-fit"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('Akademik Kayıt Ekle', 'Add Academic Record')}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: t('Tüm Kayıtlar', 'All Records') },
          { id: 'research', label: t('Yapay Zeka & AI', 'AI & Prompt Engineering') },
          { id: 'extracurricular', label: t('Topluluk Operasyonları', 'Community Operations') },
          { id: 'award', label: t('Ödüller & Sertifikalar', 'Awards & Certifications') },
          { id: 'education', label: t('Eğitim & Dil (IELTS)', 'Education & Language') }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-[#1D1D1F] shadow-md'
                : 'bg-white dark:bg-[#1D1D1F] text-[#86868B] border border-[#D2D2D7] dark:border-[#333336] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Entries List */}
      <div className="relative border-l-2 border-[#D2D2D7] dark:border-[#333336] ml-4 sm:ml-6 space-y-6 pt-2">
        <AnimatePresence>
          {filteredEntries.map((entry, index) => {
            const Icon = getIconForType(entry.type);
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline Circle Bullet */}
                <div className="absolute -left-[17px] top-1.5 p-2 rounded-full bg-white dark:bg-[#1D1D1F] border-2 border-[#0066CC] shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="w-3.5 h-3.5 text-[#0066CC]" />
                </div>

                {/* Entry Card */}
                <div className="p-6 sm:p-7 rounded-[28px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D2D2D7]/50 dark:border-[#333336] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#0066CC]">
                          {getTypeLabel(entry.type)}
                        </span>
                        {entry.badge && (
                          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#0066CC] text-white">
                            {entry.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white mt-1.5">
                        {entry.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#86868B]">
                        {entry.institution}
                      </p>
                    </div>

                    <div className="text-left sm:text-right space-y-0.5">
                      <div className="text-xs font-bold text-[#1D1D1F] dark:text-white">
                        {entry.period}
                      </div>
                      {entry.location && (
                        <div className="text-[11px] text-[#86868B] flex items-center gap-1 sm:justify-end font-medium">
                          <MapPin className="w-3 h-3 text-[#0066CC]" />
                          <span>{entry.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#86868B] leading-relaxed">
                    {entry.description}
                  </p>

                  {entry.achievements && entry.achievements.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <p className="text-[11px] font-bold text-[#1D1D1F] dark:text-white">
                        {t('Kazanımlar & Detaylar:', 'Achievements & Key Highlights:')}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#86868B]">
                        {entry.achievements.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
