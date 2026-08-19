import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FolderKanban, 
  Search, 
  Grid, 
  List, 
  ExternalLink, 
  Github, 
  Zap, 
  Star,
  Plus,
  ArrowRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubHeatmap } from './GithubHeatmap';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProjectForModal, setIsAdminOpen, isAdminAuthenticated, t } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'github'>('grid');

  const getRadiusClass = () => {
    switch (data.theme.borderRadius) {
      case 'sm': return 'rounded-xl';
      case 'md': return 'rounded-2xl';
      case 'lg': return 'rounded-3xl';
      case 'xl': return 'rounded-[2rem]';
      case 'full': return 'rounded-[2.2rem]';
      default: return 'rounded-2xl';
    }
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('Tümü');
    cats.add('Öne Çıkanlar');
    
    const hasArchived = data.projects.some(p => p.archived);
    data.projects.forEach((p) => {
      if (p.category && !p.archived) cats.add(p.category);
    });

    if (hasArchived) {
      cats.add('Arşiv');
    }
    
    return Array.from(cats);
  }, [data.projects]);

  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      // Archive filtering
      if (selectedCategory === 'Arşiv') {
        if (!project.archived) return false;
      } else {
        if (project.archived) return false;
      }

      // Category match
      if (selectedCategory === 'Öne Çıkanlar' && !project.featured) return false;
      if (selectedCategory !== 'Tümü' && selectedCategory !== 'Öne Çıkanlar' && selectedCategory !== 'Arşiv' && project.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSub = project.subtitle.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesTags = project.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesSub || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [data.projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
            {t('PORTFOLYO & MİMARİ PROJELER', 'PORTFOLIO & SYSTEM PROJECTS')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            {t('Geliştirdiğim ve Yönettiğim Sistemler', 'Projects & Managed Systems')}
          </h2>
          <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
            {t(
              'Açık kaynak paneller, AI otomasyon araçları ve Apple tasarım estetiğine uygun kontrol sistemleri.',
              'Open-source dashboards, AI automation workflows, and Apple design inspired control systems.'
            )}
          </p>
        </div>

        {/* View mode toggle & Admin quick add */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-full bg-[#E8E8ED] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#333336]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-sm font-semibold' 
                  : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
              title="Izgara Görünümü"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-sm font-semibold' 
                  : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
              title="Liste Görünümü"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('github')}
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                viewMode === 'github' 
                  ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-sm font-semibold' 
                  : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
              title="GitHub Profil Görünümü"
            >
              <Github className="w-4 h-4" />
            </button>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0066CC] hover:bg-[#0077ED] text-white transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('Yeni Proje Ekle', 'Add New Project')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-[#1D1D1F] shadow-md'
                  : 'bg-white dark:bg-[#1D1D1F] text-[#86868B] border border-[#D2D2D7] dark:border-[#333336] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {cat === 'Tümü' ? t('Tümü', 'All') : cat === 'Öne Çıkanlar' ? t('Öne Çıkanlar', 'Featured') : t(cat, cat)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <input
            type="text"
            placeholder={t('Proje veya teknoloji ara...', 'Search projects or technologies...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] text-xs text-[#1D1D1F] dark:text-white placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 shadow-sm"
          />
        </div>
      </div>

      {/* Projects List/Grid Display */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center space-y-3 bg-white dark:bg-[#1D1D1F] rounded-[32px] border border-[#D2D2D7] dark:border-[#333336]">
          <FolderKanban className="w-10 h-10 mx-auto text-[#86868B] opacity-60" />
          <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
            {t('Aradığınız Kriterlere Uygun Proje Bulunamadı', 'No Projects Found Matching Your Criteria')}
          </h3>
          <p className="text-xs text-[#86868B] max-w-sm mx-auto">
            {t('Arama sözcüğünüzü değiştirebilir veya tüm projeleri tekrar görüntüleyebilirsiniz.', 'Try changing your search keywords or clear filters to view all projects.')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tümü');
            }}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0066CC] text-white hover:bg-[#0077ED] transition-colors cursor-pointer"
          >
            {t('Filtreleri Temizle', 'Clear Filters')}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProjectForModal(project)}
                className="group relative rounded-[32px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image & Logo Container with Apple Rounded Clipping */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-[#F5F5F7] dark:bg-[#151518] border-b border-[#D2D2D7]/40 dark:border-[#333336]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    onError={(e) => {
                      // Fallback if logo URL has issue
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 dark:from-[#1D1D1F] dark:via-[#1D1D1F]/40 opacity-90 group-hover:opacity-75 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-[#0066CC] text-white shadow-md">
                        <Star className="w-3 h-3 fill-current" /> {t('Öne Çıkan', 'Featured')}
                      </span>
                    )}
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-[10px] font-bold tracking-wider text-[#0066CC] uppercase bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 backdrop-blur-sm">
                      {project.date}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] dark:text-white mt-1 group-hover:text-[#0066CC] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#0066CC]" />
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-[#0066CC] dark:text-[#2997FF]">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-[#86868B] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Quick Highlights Bullet Box */}
                    <div className="p-3 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/40 dark:border-[#333336] space-y-1.5 text-[11px] text-[#1D1D1F] dark:text-[#E5E5E7]">
                      <div className="flex items-center gap-1.5 font-bold text-[#0066CC]">
                        <Zap className="w-3.5 h-3.5 text-[#0066CC]" />
                        <span>{t('Öne Çıkan Sistem Detayları:', 'Key System Features:')}</span>
                      </div>
                      <ul className="space-y-1 pl-1 text-[11px] text-[#515154] dark:text-[#A1A1A6]">
                        {project.id === 'adalances-community' && (
                          <>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span><strong>wiki.adalances.com</strong> {t('Bilgi Bankası Kural & Rehber İçerikleri', 'Knowledge Base Rules & Guides')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span><strong>{t('Adalances Yetkili Kitapçığı', 'Adalances Staff Handbook')}</strong> {t('(Handbook) Prosedür Yazımı', 'Procedure Writing')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('Google Form Aday Taraması & Canlı Mülakat Değerlendirmeleri', 'Google Form Screening & Live Interviews')}</span>
                            </li>
                          </>
                        )}
                        {project.id === 'lutheus-manage' && (
                          <>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span><strong>wiki.lutheus.com</strong> {t('Oyun & Topluluk Rehberleri', 'Game & Community Guides')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span><strong>{t('Lutheus Discord Moderasyon Kitapçığı', 'Lutheus Discord Moderation Handbook')}</strong> {t('& Notion Hiyerarşi', '& Notion Hierarchy')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('Lutheus Manage AI Dashboard, KPI Puanlama & SQL Veri Paneli', 'Lutheus Manage AI Dashboard, KPI Scoring & SQL Panel')}</span>
                            </li>
                          </>
                        )}
                        {project.id === 'wikis-and-handbooks' && (
                          <>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>wiki.adalances.com & wiki.lutheus.com {t('Mimarisi', 'Architecture')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('Moderasyon Kitapçığı, Standart Ceza Prosedürleri & Point Train', 'Moderation Handbook, Penalty Procedures & Point Train')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('Form İnceleme & Canlı Sesli Yetkili Aday Mülakatları', 'Form Evaluation & Live Voice Candidate Interviews')}</span>
                            </li>
                          </>
                        )}
                        {project.id === 'kirged-open-source' && (
                          <>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('Kirged.org AI Workflows & Script Otomasyonları', 'Kirged.org AI Workflows & Script Automations')}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0066CC]" />
                              <span>{t('SQL Veritabanı Sorguları & Analiz Betikleri', 'SQL Database Queries & Analytical Scripts')}</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Direct Link Action Buttons */}
                  <div className="pt-3 border-t border-[#D2D2D7]/50 dark:border-[#333336] space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0066CC]/15 dark:bg-[#0066CC]/10 text-[#0066CC] dark:text-[#2997FF] hover:bg-[#0066CC] hover:text-white dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{project.id === 'kirged-open-source' ? 'kirged.org' : 'Ana Site'}</span>
                        </a>
                      )}

                      {project.manageUrl && (
                        <a
                          href={project.manageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#34C759]/20 dark:bg-[#34C759]/10 text-[#248A3D] dark:text-[#30D158] hover:bg-[#34C759] hover:text-white dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Manage</span>
                        </a>
                      )}

                      {project.wikiUrl && (
                        <a
                          href={project.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#AF52DE]/15 dark:bg-[#AF52DE]/10 text-[#8E2EB2] dark:text-[#BF5AF2] hover:bg-[#AF52DE] hover:text-white dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Wiki</span>
                        </a>
                      )}

                      {project.discordUrl && (
                        <a
                          href={project.discordUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#5865F2]/15 dark:bg-[#5865F2]/10 text-[#404EED] dark:text-[#5865F2] hover:bg-[#5865F2] hover:text-white dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Discord</span>
                        </a>
                      )}

                      {project.discordSubUrl && (
                        <a
                          href={project.discordSubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#5865F2]/15 dark:bg-[#5865F2]/10 text-[#404EED] dark:text-[#5865F2] hover:bg-[#5865F2] hover:text-white dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{project.id === 'adalances-community' ? 'Yedek Sunucu' : 'Hytale Sunucusu'}</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-500/15 dark:bg-[#2C2C2E] text-zinc-700 dark:text-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-500 hover:text-white dark:hover:text-white transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/50 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : viewMode === 'list' ? (
        /* List Mode View */
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProjectForModal(project)}
              className="p-4 sm:p-5 rounded-[24px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] hover:border-[#0066CC] shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#D2D2D7] dark:border-white/10 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#86868B] line-clamp-1">
                    {project.subtitle} — {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#D2D2D7]/50 dark:border-[#333336]">
                {project.metrics && (
                  <span className="text-xs font-bold text-[#0066CC]">
                    {project.metrics}
                  </span>
                )}
                <span className="text-xs text-[#86868B] font-medium">{project.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* GitHub Profile Layout View */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Left Column: Profile Sidebar (3 cols) */}
          <div className="md:col-span-3">
            <div className="space-y-4 text-sm font-sans">
              <div className="space-y-3">
                <img
                  src={data.profile.avatarUrl}
                  alt="Avatar"
                  className="w-32 h-32 md:w-full md:h-auto rounded-full border border-[#d0d7de] dark:border-[#30363d] shadow-sm max-w-[260px]"
                />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-[#1F2328] dark:text-[#f0f6fc] leading-tight">
                    {data.profile.fullName}
                  </h1>
                  <p className="text-base text-[#57606a] dark:text-[#8b949e]">
                    {data.profile.akaName || 'Gear2Head'}
                  </p>
                </div>
              </div>
              
              <p className="text-sm font-normal text-[#1F2328] dark:text-[#f0f6fc] leading-relaxed">
                {data.profile.bio}
              </p>

              <div className="space-y-2 text-xs text-[#57606a] dark:text-[#8b949e] pt-3 border-t border-[#d0d7de] dark:border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8b949e]" />
                  <a href="https://kirged.org" target="_blank" rel="noreferrer" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline font-semibold">
                    kirged.org
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-[#8b949e]" />
                  <a href="https://github.com/Gear2Head" target="_blank" rel="noreferrer" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">
                    github.com/Gear2Head
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Repositories List (9 cols) */}
          <div className="md:col-span-9 space-y-6 font-sans">
            {/* Premium GitHub Contribution Matrix */}
            <GithubHeatmap />
            {/* GitHub style repository tab header */}
            <div className="flex items-center gap-2 pb-2 border-b border-[#d0d7de] dark:border-[#30363d] text-sm text-[#24292f] dark:text-[#adbac7] font-semibold">
              <span className="flex items-center gap-1.5 border-b-2 border-[#fd8c73] px-2 py-1.5 text-[#1F2328] dark:text-[#f0f6fc]">
                <FolderKanban className="w-4 h-4" />
                <span>Repositories</span>
                <span className="bg-[#afb8c1]/20 px-2 py-0.5 rounded-full text-xs font-normal">
                  {filteredProjects.length}
                </span>
              </span>
            </div>

            <div className="divide-y divide-[#d0d7de] dark:divide-[#30363d]">
              {filteredProjects.map((project) => {
                let langColor = '#f1e05a'; // JavaScript default
                let langName = 'JavaScript';
                if (project.tags.includes('TypeScript') || project.tags.includes('React')) {
                  langColor = '#3178c6';
                  langName = 'TypeScript';
                } else if (project.tags.includes('PostgreSQL') || project.tags.includes('SQL')) {
                  langColor = '#0064a5';
                  langName = 'PL/pgSQL';
                } else if (project.tags.includes('Claude Code') || project.tags.includes('Python')) {
                  langColor = '#3572A5';
                  langName = 'Python';
                }

                return (
                  <div key={project.id} className="py-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => setSelectedProjectForModal(project)}
                          className="text-lg font-bold text-[#0969da] dark:text-[#58a6ff] hover:underline cursor-pointer text-left font-mono"
                        >
                          {project.id}
                        </button>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#57606a] dark:text-[#8b949e] border border-[#d0d7de] dark:border-[#30363d]">
                          Public
                        </span>
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                            Pinned
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
                        {project.subtitle} — {project.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 5).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ddf4ff] dark:bg-[#1C2C40] text-[#0969da] dark:text-[#58a6ff]"
                          >
                            {t.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        ))}
                      </div>

                      {/* Repo Stats Footer */}
                      <div className="flex items-center gap-4 text-xs text-[#57606a] dark:text-[#8b949e] pt-2 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: langColor }} />
                          <span>{langName}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          ★ {project.featured ? '18' : '6'}
                        </span>
                        <span className="flex items-center gap-1">
                          ⑂ {project.featured ? '4' : '1'}
                        </span>
                        <span>{t('Güncellendi:', 'Updated:')} {project.date}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-stretch gap-1.5 flex-shrink-0 w-full sm:w-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#21262d] text-xs font-semibold text-[#24292f] dark:text-[#c9d1d9] text-center hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] transition-colors"
                        >
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#21262d] text-xs font-semibold text-[#24292f] dark:text-[#c9d1d9] text-center hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] transition-colors"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
