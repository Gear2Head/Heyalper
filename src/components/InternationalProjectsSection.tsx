import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { InternationalProject } from '../types';
import { 
  Globe2, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Maximize2, 
  X, 
  Download, 
  ShieldCheck, 
  Calendar, 
  UserCheck, 
  Building2,
  FileCheck2,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InternationalProjectsSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<InternationalProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Tümü' | 'eTwinning' | 'EU Code Week'>('Tümü');

  const allProjects = data.internationalProjects || [];

  const filteredProjects = activeCategory === 'Tümü'
    ? allProjects
    : allProjects.filter(p => {
        if (activeCategory === 'eTwinning') return p.programme.toLowerCase().includes('etwinning');
        if (activeCategory === 'EU Code Week') return p.programme.toLowerCase().includes('code week');
        return true;
      });

  return (
    <section id="international" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066CC]/10 dark:bg-white/10 text-[#0066CC] dark:text-blue-400 border border-[#0066CC]/20 dark:border-white/15"
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>{t('ULUSLARARASI DİJİTAL PROJELER & E-TWINNING', 'INTERNATIONAL DIGITAL PROJECTS & E-TWINNING')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white"
        >
          {t('eTwinning & EU Code Week Sertifikaları', 'eTwinning & EU Code Week Certifications')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#86868B] leading-relaxed"
        >
          {t(
            'Avrupa Okul Eğitimi Platformu (ESEP) ve Avrupa Komisyonu onaylı eTwinning Kalite Etiketi (Pupil Quality Label) ve AB Kod Haftası başarı belgeleri.',
            'Official eTwinning Quality Label (Pupil Quality Label) and EU Code Week certificates approved by ESEP and the European Commission.'
          )}
        </motion.p>

        {/* Category Filter Controls */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-4">
          {(['Tümü', 'eTwinning', 'EU Code Week'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0066CC] text-white shadow-lg scale-105'
                  : 'bg-white/80 dark:bg-[#2C2C2E]/80 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white border border-[#D2D2D7]/40 dark:border-white/10'
              }`}
            >
              {cat === 'Tümü'
                ? t('Tüm Projeler', 'All Projects')
                : cat === 'eTwinning'
                ? t('eTwinning Kalite Etiketi', 'eTwinning Quality Label')
                : 'EU Code Week 2024'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of International Projects & Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, delay: idx * 0.1 }}
              className="group relative flex flex-col rounded-3xl bg-white/80 dark:bg-[#1D1D1F]/80 backdrop-blur-xl border border-[#D2D2D7]/60 dark:border-[#333336] overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#0066CC]/40 dark:hover:border-blue-500/40 transition-all duration-300"
            >
            {/* Certificate Artwork Render Container */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#F5F5F7] to-white dark:from-[#151517] dark:to-[#1D1D1F] border-b border-[#D2D2D7]/40 dark:border-[#333336]">
              
              {/* Official Certificate Visual Render Box */}
              <div 
                onClick={() => setSelectedProject(proj)}
                className="relative cursor-pointer rounded-2xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 transition-transform duration-300 group-hover:scale-[1.015] overflow-hidden select-none"
              >
                {proj.certificateType === 'etwinning' ? (
                  /* eTwinning Pupil Quality Label Visual Layout */
                  <div className="relative min-h-[220px] sm:min-h-[250px] flex flex-col justify-between font-sans">
                    {/* Top Decorative Geometric Accents */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {/* Cyan Circle Art */}
                        <div className="w-10 h-10 rounded-full border-2 border-teal-500/80 flex items-center justify-center bg-teal-50">
                          <div className="w-4 h-4 rounded-full bg-teal-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-indigo-950">eTwinning</span>
                            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              Pupil Quality label
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recipient & Project Details */}
                    <div className="my-6 text-center space-y-2">
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 border-b border-slate-200 pb-1 inline-block px-4">
                        {proj.recipientName}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 italic">
                        has been awarded with the eTwinning Quality label as a pupil for the project:
                      </p>
                      <h4 className="text-sm sm:text-base font-bold text-amber-600 leading-snug px-2">
                        "{proj.title}"
                      </h4>
                    </div>

                    {/* Bottom Metadata & Official Signatory */}
                    <div className="flex justify-between items-end pt-3 border-t border-slate-100 text-[10px] sm:text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-800">Date:</span> {proj.date}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="w-4 h-4 bg-blue-900 text-yellow-400 rounded flex items-center justify-center text-[9px] font-bold">★</div>
                          <span className="text-[9px] text-slate-500 font-medium">European School Education Platform</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-serif italic font-semibold text-slate-900 border-b border-slate-400 pb-0.5 inline-block text-xs">
                          Mustafa Canlı
                        </div>
                        <div className="text-[9px] text-slate-500">National Support Organisation Türkiye</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EU Code Week Certificate Visual Layout */
                  <div className="relative min-h-[220px] sm:min-h-[250px] flex flex-col justify-between font-sans border-4 border-amber-100 p-4 rounded-xl">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-rose-600 tracking-wider">CodeWeek.</span>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950">
                          EU CODE WEEK
                        </h3>
                        <p className="text-[10px] font-semibold text-indigo-800">Certificate of Participation</p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-600">
                          <div className="w-4 h-3 bg-blue-700 text-yellow-300 flex items-center justify-center text-[7px]">★</div>
                          European Commission
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="my-4 text-center space-y-2">
                      <p className="text-[10px] text-slate-500">presents this certificate to</p>
                      <div className="text-xl sm:text-2xl font-extrabold text-rose-600">
                        {proj.recipientName}
                      </div>
                      <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                        for actively participating in an EU Code Week coding event
                      </p>
                      <div className="text-sm sm:text-base font-bold text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-lg border border-amber-200">
                        "{proj.title}"
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end text-[10px] text-slate-600">
                      <div>
                        <span className="font-semibold">CodeWeek 2024</span> • {proj.date}
                      </div>
                      <div className="w-8 h-8 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-[8px] text-slate-400 font-mono">
                        QR
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Inspect Badge Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]">
                  <Maximize2 className="w-4 h-4" />
                  <span>{t('Sertifikayı Büyüt & Detaylı İncele', 'Expand Certificate & Verify')}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    proj.badgeColor === 'amber'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  }`}>
                    {proj.badge}
                  </span>
                  <span className="text-xs text-[#86868B] font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {proj.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white leading-snug">
                  {proj.title}
                </h3>

                <p className="text-sm text-[#86868B] leading-relaxed">
                  {t(
                    proj.description,
                    proj.id === 'etwinning-quality-label'
                      ? 'Conducted digital collaboration projects under the EU ESEP platform focusing on environmental love, self-esteem, and social awareness, earning the prestigious Pupil Quality Label for outstanding performance.'
                      : 'Participated in the Green World Green Literature event during EU Code Week 2024 organized by the European Commission, actively contributing to algorithmic thinking and software development.'
                  )}
                </p>
              </div>

              {/* Key Achievements Bullet Checklist */}
              <div className="space-y-2 pt-2 border-t border-[#D2D2D7]/40 dark:border-[#333336]">
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white uppercase tracking-wider block mb-2">
                  {t('Öne Çıkan Başarılar:', 'Key Highlights & Achievements:')}
                </span>
                {proj.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2 text-xs text-[#1D1D1F] dark:text-[#E5E5E7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        ach,
                        ach === 'Avrupa Okul Eğitimi Platformu (ESEP) Onaylı Kalite Etiketi'
                          ? 'European School Education Platform (ESEP) Approved Quality Label'
                          : ach === 'Uluslararası Takım Çalışması, Dijital İçerik Üretimi & eSafety'
                          ? 'International Teamwork, Digital Content Creation & eSafety'
                          : ach === 'Çevre Sevgisi & Özsaygı Konulu Öğrenci Projesi'
                          ? 'Environmental Love & Self-Esteem Student Project'
                          : ach === 'Avrupa Komisyonu Onaylı Resmi Katılım Sertifikası'
                          ? 'Official Certificate of Participation from European Commission'
                          : ach === 'EU Code Week 2024 Yazılım & Algoritmik Kodlama Etkinliği'
                          ? 'EU Code Week 2024 Software & Algorithmic Coding Event'
                          : ach === 'Sürdürülebilir Teknoloji & Dijital Okuryazarlık Katkısı'
                          ? 'Sustainable Technology & Digital Literacy Contribution'
                          : ach
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedProject(proj)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#0066CC] hover:text-white dark:hover:bg-[#0066CC] text-[#1D1D1F] dark:text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <FileCheck2 className="w-4 h-4 text-[#0066CC] group-hover/btn:text-white transition-colors" />
                <span>{t('Resmi Belgeyi & İmzaları Doğrula', 'Verify Official Certificate & Signatures')}</span>
              </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      {/* Interactive Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#1D1D1F] rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#D2D2D7]/40 dark:border-[#333336] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] dark:text-white">
                      {selectedProject.certificateTitle}
                    </h3>
                    <p className="text-xs text-[#86868B]">
                      {selectedProject.organization} • {selectedProject.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Document Preview */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Full Visual Certificate Display Box */}
                <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-xl relative font-sans">
                  {selectedProject.certificateType === 'etwinning' ? (
                    <div className="space-y-8">
                      {/* Top Header */}
                      <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-indigo-950">eTwinning</span>
                            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md border border-amber-300">
                              Pupil Quality label
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">European School Education Platform</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-400">OFFICIAL AWARD DOCUMENT</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center py-6 space-y-4">
                        <p className="text-sm text-slate-500">This Pupil Quality Label is officially presented to:</p>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 border-b-2 border-slate-900 inline-block px-8 pb-1">
                          {selectedProject.recipientName}
                        </h2>
                        <p className="text-sm text-slate-600 max-w-md mx-auto pt-2">
                          for outstanding active participation and project contributions in:
                        </p>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-xl mx-auto">
                          <h3 className="text-lg sm:text-xl font-extrabold text-amber-800">
                            "{selectedProject.title}"
                          </h3>
                        </div>
                      </div>

                      {/* Signatures & Footer */}
                      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-8 h-8 text-emerald-600" />
                          <div>
                            <div className="font-bold text-slate-800">Verified eTwinning Award</div>
                            <div>Date Issued: {selectedProject.date}</div>
                          </div>
                        </div>

                        <div className="text-center sm:text-right">
                          <div className="font-serif italic text-base font-bold text-slate-900">
                            Mustafa Canlı
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            National Support Organisation Türkiye
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 border-4 border-amber-200 p-6 sm:p-8 rounded-2xl">
                      <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                        <div>
                          <span className="text-sm font-bold text-rose-600">CodeWeek.eu</span>
                          <h2 className="text-3xl font-black text-indigo-950">EU CODE WEEK</h2>
                          <p className="text-xs font-bold text-indigo-800">Certificate of Participation</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-600">European Commission</div>
                          <div className="text-[10px] text-slate-400">EU Code Week 2024</div>
                        </div>
                      </div>

                      <div className="text-center py-6 space-y-4">
                        <p className="text-xs text-slate-500">The European Commission presents this certificate to</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-600">
                          {selectedProject.recipientName}
                        </h2>
                        <p className="text-xs text-slate-600 max-w-md mx-auto">
                          who has developed essential coding skills and contributed to the success of EU Code Week 2024 by actively participating in an EU Code Week coding event:
                        </p>
                        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 max-w-lg mx-auto">
                          <h3 className="text-lg font-bold text-rose-900">
                            "{selectedProject.title}"
                          </h3>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
                        <div>
                          <span className="font-bold text-slate-800">Date:</span> {selectedProject.date}
                        </div>
                        <div className="font-semibold text-rose-600">
                          Official EU Commission Certification
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] space-y-2">
                    <span className="text-xs font-bold text-[#86868B] uppercase">Verilen Kurum / Kuruluş</span>
                    <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#0066CC]" />
                      {selectedProject.organization}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] space-y-2">
                    <span className="text-xs font-bold text-[#86868B] uppercase">Resmi İmza Yöneticisi</span>
                    <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-500" />
                      {selectedProject.signatory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-[#D2D2D7]/40 dark:border-[#333336] flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0077ED] text-white font-medium text-xs transition-colors cursor-pointer shadow-md"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
