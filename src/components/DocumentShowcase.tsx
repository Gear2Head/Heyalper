import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  X, 
  ShieldCheck, 
  Image as ImageIcon,
  Layers,
  ZoomIn
} from 'lucide-react';

interface ShowcaseDocument {
  id: string;
  title: string;
  category: 'Sertifika & Ödül' | 'Topluluk & Panel Kanıtı' | 'Akademik Başarı';
  issuer: string;
  date: string;
  badge: string;
  badgeColor: string;
  description: string;
  type: 'etwinning' | 'codeweek' | 'dashboard' | 'adalances' | 'ielts' | 'wiki' | 'handbook';
  proofMetrics?: string;
  details: string[];
}

const documentList: ShowcaseDocument[] = [
  {
    id: 'doc-adalances-proof',
    title: 'Adalances Discord Community & Operations',
    category: 'Topluluk & Panel Kanıtı',
    issuer: 'Adalances.com / Doğukan Adal Discord',
    date: '2024 - 2026',
    badge: '228,350+ Üye',
    badgeColor: 'emerald',
    description: 'Türkiye\'nin en büyük Discord ve oyun topluluklarından Adalances sunucusunda 228.350+ üye, anlık 9.800+ aktif kullanıcı, wiki.adalances.com içerikleri ve yetkili kitapçığı yazarlığı.',
    type: 'adalances',
    proofMetrics: '228,359 Üye • 9,896 Anlık Online',
    details: [
      'Resmi Adalances.com Portalı & Verified Guild',
      'wiki.adalances.com Bilgi Bankası Doldurulması',
      'Yetkili Alım Formu İnceleme & Canlı Mülakatlar',
      'Adalances Yetkili Kitapçığı Yazar & Moderasyon Lideri'
    ]
  },
  {
    id: 'doc-lutheus-dashboard',
    title: 'Lutheus Manage SaaS Dashboard & Wiki',
    category: 'Topluluk & Panel Kanıtı',
    issuer: 'Lutheus.com / Gear_Head',
    date: '2025 - 2026',
    badge: 'lutheus.com & wiki',
    badgeColor: 'purple',
    description: 'Lutheus (lutheus.com) topluluk yönetim paneli, wiki.lutheus.com bilgi bankası, yetkili mülakat sistemleri ve Notion moderasyon kitapçığı.',
    type: 'dashboard',
    proofMetrics: 'lutheus.com • wiki.lutheus.com',
    details: [
      'Lutheus.com Resmi Oyun & Topluluk Altyapısı',
      'wiki.lutheus.com Oyuncu & Yetkili Rehberleri',
      'Notion Lutheus Discord Moderasyon Kitapçığı',
      'AI Agent & KPI Sınav / Yerleştirme Modülü'
    ]
  },
  {
    id: 'doc-wikis-handbooks',
    title: 'wiki.adalances.com & wiki.lutheus.com Bilgi Bankaları',
    category: 'Topluluk & Panel Kanıtı',
    issuer: 'Adalances & Lutheus Wiki Portalları',
    date: '2024 - 2026',
    badge: 'Wiki & Kitapçık',
    badgeColor: 'amber',
    description: 'https://wiki.adalances.com/ ve https://wiki.lutheus.com/ wiki sayfalarının doldurulması, yetkili kitapçıklarının kaleme alınması ve mülakat formları.',
    type: 'wiki',
    proofMetrics: '2 Wiki Portalı • Yetkili Kitapçığı',
    details: [
      'wiki.adalances.com Tüm Kural & Rehber İçerikleri',
      'wiki.lutheus.com Bilgi & Sistem Dokümantasyonu',
      'Özel Yetkili Kitapçığı (Moderasyon Kılavuzu)',
      'Google Forms & Discord Yetkili Mülakatları'
    ]
  },
  {
    id: 'doc-etwinning',
    title: 'eTwinning Pupil Quality Label (Kalite Etiketi)',
    category: 'Sertifika & Ödül',
    issuer: 'European School Education Platform / NSO Türkiye',
    date: '13.10.2024',
    badge: 'eTwinning Quality Label',
    badgeColor: 'amber',
    description: 'Avrupa Birligi ESEP platformunda "From Self-Esteem to Happiness, with Love for the Environment" projesindeki dijital katkılar sebebiyle kazanılan resmi Öğrenci Kalite Etiketi.',
    type: 'etwinning',
    proofMetrics: 'Mustafa Canlı NSO Imzalı',
    details: [
      'European School Education Platform Onaylı',
      'Uluslararası Dijital Proje & eSafety Takımı',
      'Avrupa Birligi Fonlu Eğitim Projesi'
    ]
  },
  {
    id: 'doc-codeweek',
    title: 'EU Code Week 2024 Certificate of Participation',
    category: 'Sertifika & Ödül',
    issuer: 'European Commission (Avrupa Komisyonu)',
    date: '23.10.2024',
    badge: 'EU Code Week 2024',
    badgeColor: 'blue',
    description: 'Avrupa Komisyonu "Green World Green Literature" yazılım ve algoritmik kodlama etkinligine aktif katılım ve başarı belgesi.',
    type: 'codeweek',
    proofMetrics: 'European Commission Official',
    details: [
      'Avrupa Komisyonu Resmi Katılım Sertifikası',
      'Yeşil Teknoloji & Algoritma Etkinligi',
      'EU Code Week 2024 Sertifikalı Katkı'
    ]
  },
  {
    id: 'doc-ielts',
    title: 'IELTS Academic C1 English Proficiency',
    category: 'Akademik Başarı',
    issuer: 'British Council / IDP IELTS',
    date: '2025 - 2026',
    badge: 'IELTS Band 7.0 (C1)',
    badgeColor: 'sky',
    description: 'IELTS Academic sınavından 7.0 Overall skor alarak C1 düzeyinde akıcı ve akademik İngilizce yetkinliği.',
    type: 'ielts',
    proofMetrics: 'Band 7.0 Overall (C1)',
    details: [
      'Akademik & İleri Seviye İngilizce Yetkinliği',
      'Uluslararası Sertifikalı C1 Dil Seviyesi',
      'Global Üniversite Başvuru Standardı'
    ]
  }
];

export const DocumentShowcase: React.FC = () => {
  const { t } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'Tümü' | 'Sertifika & Ödül' | 'Topluluk & Panel Kanıtı' | 'Akademik Başarı'>('Tümü');
  const [lightboxDoc, setLightboxDoc] = useState<ShowcaseDocument | null>(null);

  const filteredDocs = activeTab === 'Tümü'
    ? documentList
    : documentList.filter(d => d.category === activeTab);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredDocs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredDocs.length) % filteredDocs.length);
  };

  const currentDoc = filteredDocs[currentIndex] || filteredDocs[0];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Glow background */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066CC]/10 dark:bg-white/10 text-[#0066CC] dark:text-blue-400 border border-[#0066CC]/20 dark:border-white/15"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t('BELGE VE KANIT SERGİSİ', 'CREDENTIALS & PROOF SHOWCASE')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white"
        >
          {t('Sertifikalar & Operasyonel Görseller', 'Certificates & Operational Proofs')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#86868B]"
        >
          {t(
            'Tüm eTwinning, AB Kod Haftası, Lutheus Dashboard ve Topluluk yönetimi kanıtlarını interaktif Apple stili vitrinde inceleyin.',
            'Inspect all eTwinning, EU Code Week, Lutheus Dashboard, and community management credentials in an interactive Apple-style showcase.'
          )}
        </motion.p>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-4">
          {(['Tümü', 'Sertifika & Ödül', 'Topluluk & Panel Kanıtı', 'Akademik Başarı'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#0066CC] text-white shadow-md scale-105'
                  : 'bg-white/80 dark:bg-[#2C2C2E]/80 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white border border-[#D2D2D7]/40 dark:border-white/10'
              }`}
            >
              {tab === 'Tümü'
                ? t('Tümü', 'All')
                : tab === 'Sertifika & Ödül'
                ? t('Sertifika & Ödül', 'Certificates & Awards')
                : tab === 'Topluluk & Panel Kanıtı'
                ? t('Topluluk & Panel Kanıtı', 'Community & Dashboard Proofs')
                : t('Akademik Başarı', 'Academic Excellence')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Showcase Carousel */}
      <div className="relative max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {currentDoc && (
            <motion.div
              key={currentDoc.id}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white/90 dark:bg-[#1D1D1F]/90 backdrop-blur-2xl border border-[#D2D2D7]/60 dark:border-[#333336] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[460px]"
            >
              {/* Left Side: Document Visual Card Container (7 cols) */}
              <div className="lg:col-span-7 bg-gradient-to-br from-[#F5F5F7] to-[#E5E5EA] dark:from-[#151517] dark:to-[#222226] p-6 sm:p-10 flex flex-col justify-center items-center relative group">
                <div 
                  onClick={() => setLightboxDoc(currentDoc)}
                  className="w-full max-w-md bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-zinc-800 relative cursor-pointer hover:scale-[1.02] transition-transform duration-300 overflow-hidden flex items-center justify-center min-h-[280px]"
                >
                  {currentDoc.type === 'etwinning' && (
                    <img src="/etwinning.png" alt={currentDoc.title} className="w-full max-h-[260px] object-contain rounded-lg" />
                  )}

                  {currentDoc.type === 'codeweek' && (
                    <img src="/codeweek.png" alt={currentDoc.title} className="w-full max-h-[260px] object-contain rounded-lg" />
                  )}

                  {currentDoc.type === 'dashboard' && (
                    <img src="/lutheus_dashboard.png" alt={currentDoc.title} className="w-full max-h-[260px] object-contain rounded-lg" />
                  )}

                  {currentDoc.type === 'adalances' && (
                    <img src="/adalances_discord.png" alt={currentDoc.title} className="w-full max-h-[260px] object-contain rounded-lg" />
                  )}

                  {currentDoc.type === 'wiki' && (
                    <img src="/lutheus_dashboard.png" alt={currentDoc.title} className="w-full max-h-[260px] object-contain rounded-lg" />
                  )}

                  {currentDoc.type === 'ielts' && (
                    <div className="w-full max-w-xs font-sans bg-sky-950 text-white p-5 rounded-xl border border-sky-800 text-center">
                      <div className="flex justify-between items-center border-b border-sky-800 pb-2">
                        <span className="font-bold text-sky-400 text-sm">IELTS ACADEMIC</span>
                        <span className="text-xs bg-sky-900 px-2 py-0.5 rounded text-sky-200">C1 LEVEL</span>
                      </div>
                      <div className="text-center py-4">
                        <div className="text-3xl font-black text-sky-300">7.0</div>
                        <div className="text-xs text-sky-200 mt-1">Overall Band Score</div>
                      </div>
                      <div className="text-[10px] text-sky-300/80 pt-2 border-t border-sky-800">
                        British Council / IDP Approved Official Certification
                      </div>
                    </div>
                  )}

                  {/* Zoom Badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]">
                    <ZoomIn className="w-4 h-4" />
                    <span>{t('Büyüt ve İncele', 'Expand & Inspect')}</span>
                  </div>
                </div>

                <span className="mt-4 text-xs text-[#86868B] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  {currentDoc.proofMetrics || t('Doğrulanmış Orijinal İçerik', 'Verified Authentic Record')}
                </span>
              </div>

              {/* Right Side: Document Metadata & Details (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0066CC]/10 text-[#0066CC] dark:text-blue-400 border border-[#0066CC]/20">
                      {currentDoc.badge}
                    </span>
                    <span className="text-xs text-[#86868B] font-semibold">
                      {currentDoc.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-white leading-tight">
                    {currentDoc.title}
                  </h3>

                  <p className="text-sm text-[#86868B] leading-relaxed">
                    {currentDoc.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#D2D2D7]/40 dark:border-[#333336]">
                    <span className="text-xs font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider block">
                      {t('Detay Özellikler:', 'Key Specifications:')}
                    </span>
                    {currentDoc.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#1D1D1F] dark:text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspect Button & Carousel Navigation */}
                <div className="space-y-3 pt-4 border-t border-[#D2D2D7]/40 dark:border-[#333336]">
                  <button
                    onClick={() => setLightboxDoc(currentDoc)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#0066CC] hover:bg-[#0077ED] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>{t('Tüm Belgeyi & İmzaları İncele', 'Inspect Full Credential & Signatures')}</span>
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-[#86868B] font-medium">
                      {currentIndex + 1} / {filteredDocs.length} {t('Belge', 'Documents')}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="p-2 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#0066CC] hover:text-white dark:hover:bg-[#0066CC] text-[#1D1D1F] dark:text-white transition-colors cursor-pointer"
                        title={t('Önceki', 'Previous')}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="p-2 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#0066CC] hover:text-white dark:hover:bg-[#0066CC] text-[#1D1D1F] dark:text-white transition-colors cursor-pointer"
                        title={t('Sonraki', 'Next')}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxDoc(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#1D1D1F] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D2D2D7] dark:border-[#333336] z-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-[#D2D2D7]/40 dark:border-[#333336] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white">{lightboxDoc.title}</h3>
                  <p className="text-xs text-[#86868B]">{lightboxDoc.issuer} • {lightboxDoc.date}</p>
                </div>
                <button
                  onClick={() => setLightboxDoc(null)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Left Side: Document Full Visual (7 cols) */}
                <div className="md:col-span-7 bg-[#F5F5F7] dark:bg-black/30 rounded-2xl p-4 flex items-center justify-center border border-[#D2D2D7]/50 dark:border-[#333336] overflow-hidden min-h-[320px] shadow-inner">
                  {lightboxDoc.type === 'etwinning' && (
                    <img src="/etwinning.png" alt={lightboxDoc.title} className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md" />
                  )}
                  {lightboxDoc.type === 'codeweek' && (
                    <img src="/codeweek.png" alt={lightboxDoc.title} className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md" />
                  )}
                  {lightboxDoc.type === 'dashboard' && (
                    <img src="/lutheus_dashboard.png" alt={lightboxDoc.title} className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md" />
                  )}
                  {lightboxDoc.type === 'adalances' && (
                    <img src="/adalances_discord.png" alt={lightboxDoc.title} className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md" />
                  )}
                  {lightboxDoc.type === 'wiki' && (
                    <img src="/lutheus_dashboard.png" alt={lightboxDoc.title} className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md" />
                  )}
                  {lightboxDoc.type === 'ielts' && (
                    <div className="w-full max-w-xs font-sans bg-sky-950 text-white p-6 rounded-xl border border-sky-800 text-center shadow-lg my-auto">
                      <div className="flex justify-between items-center border-b border-sky-800 pb-2">
                        <span className="font-bold text-sky-400 text-sm">IELTS ACADEMIC</span>
                        <span className="text-xs bg-sky-900 px-2 py-0.5 rounded text-sky-200">C1 LEVEL</span>
                      </div>
                      <div className="text-center py-6">
                        <div className="text-4xl font-black text-sky-300">7.0</div>
                        <div className="text-xs text-sky-200 mt-1">Overall Band Score</div>
                      </div>
                      <div className="text-[10px] text-sky-300/80 pt-2 border-t border-sky-800">
                        British Council / IDP Approved Official Certification
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Verification Details (5 cols) */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t('DOĞRULANMIŞ RESMİ BELGE', 'VERIFIED OFFICIAL CREDENTIAL')}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-[#1D1D1F] dark:text-white leading-tight">
                        {lightboxDoc.title}
                      </h4>
                      <p className="text-xs text-[#86868B] font-semibold">{lightboxDoc.issuer}</p>
                    </div>

                    <p className="text-sm text-[#86868B] leading-relaxed">
                      {lightboxDoc.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-[#D2D2D7]/40 dark:border-[#333336]">
                      <span className="text-xs font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider block">
                        {t('Belge Kazanımları ve Detayları:', 'Credential Specifications & Details:')}
                      </span>
                      {lightboxDoc.details.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#1D1D1F] dark:text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D2D2D7]/40 dark:border-[#333336]">
                    <button
                      onClick={() => setLightboxDoc(null)}
                      className="w-full py-3 px-4 rounded-xl bg-[#0066CC] hover:bg-[#0077ED] text-white font-semibold text-xs transition-colors cursor-pointer text-center shadow-md"
                    >
                      {t('Doğrulamayı Kapat', 'Close Verification')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
