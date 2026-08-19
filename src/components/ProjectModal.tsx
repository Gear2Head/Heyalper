import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, Zap, Github, Globe, BookOpen, Terminal, MessageSquare, ArrowRight, Check, Users, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to render text with clickable markdown links [text](url) or raw URLs
const renderTextWithMarkdownLinks = (text: string) => {
  const mdRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = mdRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const linkText = match[1];
    const linkUrl = match[2];

    if (matchIndex > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, matchIndex) });
    }

    parts.push({ type: 'link', text: linkText, url: linkUrl });
    lastIndex = mdRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  const finalElements: React.ReactNode[] = [];
  
  parts.forEach((part, idx) => {
    if (part.type === 'link') {
      finalElements.push(
        <a
          key={`link-${idx}`}
          href={part.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0066CC] hover:text-[#0077ED] dark:text-[#2997FF] dark:hover:text-blue-300 font-semibold underline decoration-[#0066CC]/30 hover:decoration-[#0077ED] transition-colors"
        >
          {part.text}
        </a>
      );
    } else {
      const rawUrlRegex = /(https?:\/\/[^\s)]+)/g;
      const subText = part.content || '';
      const subParts = subText.split(rawUrlRegex);
      
      subParts.forEach((subPart, sIdx) => {
        if (rawUrlRegex.test(subPart)) {
          let cleanUrl = subPart;
          if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
          let label = cleanUrl.replace(/^https?:\/\/(www\.)?/, '');

          finalElements.push(
            <a
              key={`raw-${idx}-${sIdx}`}
              href={subPart}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066CC] hover:text-[#0077ED] dark:text-[#2997FF] dark:hover:text-blue-300 font-semibold underline decoration-[#0066CC]/30 hover:decoration-[#0077ED] transition-colors"
            >
              {label}
            </a>
          );
        } else {
          finalElements.push(subPart);
        }
      });
    }
  });

  return finalElements.length > 0 ? finalElements : text;
};

// Helper function to parse details text, split lists vertically and format links
const parseDetailsAndLists = (text: string) => {
  if (!text) return null;

  // Split text by numbered list markers (e.g. 1., 2., 3.) while keeping the marker
  const parts = text.split(/(?=\b\d+\.\s+)/);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        const content = part.trim();
        if (!content) return null;

        const isListItem = /^\d+\.\s+/.test(content);
        const textContent = renderTextWithMarkdownLinks(content);

        if (isListItem) {
          return (
            <div key={index} className="pl-4 border-l-2 border-[#0066CC]/20 dark:border-blue-500/20 py-1.5 my-2">
              <p className="text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E8E8ED]">
                {textContent}
              </p>
            </div>
          );
        }

        return (
          <p key={index} className="text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E8E8ED]">
            {textContent}
          </p>
        );
      })}
    </div>
  );
};

// Specialized Lutheus Case Study Component
const LutheusCaseStudy: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'prompt' | 'sql' | 'flow'>('prompt');
  
  return (
    <div className="space-y-6 pt-4 border-t border-[#D2D2D7]/30 dark:border-white/5">
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Lutheus Interactive Case Study</h4>
        <div className="flex flex-wrap gap-2 border-b border-[#D2D2D7]/30 dark:border-white/5 pb-2">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'prompt' ? 'bg-[#0066CC] text-white' : 'bg-black/5 dark:bg-white/5 text-[#86868B]'
            }`}
          >
            AI Moderation Prompt
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'sql' ? 'bg-[#0066CC] text-white' : 'bg-black/5 dark:bg-white/5 text-[#86868B]'
            }`}
          >
            Natural Language to SQL
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'flow' ? 'bg-[#0066CC] text-white' : 'bg-black/5 dark:bg-white/5 text-[#86868B]'
            }`}
          >
            System Integration Flow
          </button>
        </div>
      </div>

      {activeTab === 'prompt' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-white/5">
            <span className="text-zinc-500">// Prompt Engineering for Moderation (Claude API)</span>
            <pre className="mt-2 text-zinc-100 whitespace-pre-wrap">{`Analyze this Discord message for violations...
Messages: \${messageHistory}
Determine: severity level, action type, warning/ban
Output: JSON with {action, reason, severity}`}</pre>
          </div>
          <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/5 text-xs text-[#86868B]">
            <strong>Expected Output:</strong> <code className="text-xs bg-black/5 dark:bg-black/35 px-1.5 py-0.5 rounded font-mono text-[#0066CC] dark:text-blue-400">{`{ "action": "warn", "reason": "Toxic behavior detected in logs", "severity": "medium" }`}</code>
          </div>
        </div>
      )}

      {activeTab === 'sql' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-white/5">
            <span className="text-zinc-500">// SQL Generation Prompt (Codex/Claude)</span>
            <pre className="mt-2 text-zinc-100 whitespace-pre-wrap">{`Convert to SQL for PostgreSQL:
"Find moderators with >100 total cases and >80% accuracy"`}</pre>
            <span className="text-zinc-500 mt-4 block">// Claude generates:</span>
            <code className="text-[#34C759] font-mono block mt-1">{`SELECT * FROM moderators WHERE total_cases > 100 AND accuracy_rate > 80;`}</code>
          </div>
        </div>
      )}

      {activeTab === 'flow' && (
        <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/5 flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">System Architecture Integration Flow</span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <div className="px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#0066CC] dark:text-blue-400 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Discord Server
            </div>
            <ArrowRight className="w-4 h-4 text-[#86868B]" />
            <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Node.js Webhook
            </div>
            <ArrowRight className="w-4 h-4 text-[#86868B]" />
            <div className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[#AF52DE] dark:text-purple-400 flex items-center gap-1.5">
              <Database className="w-4 h-4" /> PostgreSQL DB
            </div>
            <ArrowRight className="w-4 h-4 text-[#86868B]" />
            <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> React Dashboard
            </div>
          </div>
        </div>
      )}

      {/* Visual Counters Breakdown */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/40 dark:border-white/5 text-center">
          <div className="text-2xl font-bold text-[#1D1D1F] dark:text-white">306</div>
          <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mt-0.5">Total Cases Logged</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/40 dark:border-white/5 text-center">
          <div className="text-2xl font-bold text-emerald-500">278</div>
          <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mt-0.5">Resolved Actions</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/40 dark:border-white/5 text-center">
          <div className="text-2xl font-bold text-[#0066CC]">90.8%</div>
          <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mt-0.5">Action Accuracy</div>
        </div>
      </div>
    </div>
  );
};

// Specialized Adalances Case Study Component
const AdalancesCaseStudy: React.FC = () => {
  return (
    <div className="space-y-6 pt-4 border-t border-[#D2D2D7]/30 dark:border-white/5">
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Organizational Structure</h4>
        <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/50 dark:border-white/5 space-y-4">
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs">
              Operations Lead (Kadir Alper Şener)
            </div>
            <div className="w-[2px] h-4 bg-[#D2D2D7] dark:bg-[#333336]" />
            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#0066CC] dark:text-blue-400 font-bold text-xs">
              Senior Moderators (Staff)
            </div>
            <div className="w-[2px] h-4 bg-[#D2D2D7] dark:bg-[#333336]" />
            <div className="flex gap-4">
              <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Moderator Team
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Support & Tickets
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Operations Timeline (2024 - 2026)</h4>
        <div className="space-y-4 border-l-2 border-[#D2D2D7] dark:border-[#333336] pl-4 ml-2 text-xs">
          <div className="relative">
            <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-[#0066CC]" />
            <div className="font-bold text-[#1D1D1F] dark:text-white">Late 2024</div>
            <div className="text-[#86868B] mt-0.5">Wiki launch (wiki.adalances.com) & handbook configuration.</div>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-[#0066CC]" />
            <div className="font-bold text-[#1D1D1F] dark:text-white">2025</div>
            <div className="text-[#86868B] mt-0.5">Recruited & audited performance of over 150+ staff moderators.</div>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-[#0066CC]" />
            <div className="font-bold text-[#1D1D1F] dark:text-white">2026</div>
            <div className="text-[#86868B] mt-0.5">Managed crisis safety during massive traffic peak reaching 15,934 concurrent users.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Specialized Kirged Case Study Component
const KirgedCaseStudy: React.FC = () => {
  return (
    <div className="space-y-6 pt-4 border-t border-[#D2D2D7]/30 dark:border-white/5">
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">WCAG 2.1 AA Accessibility Standards Implemented</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
            <Check className="w-4 h-4 flex-shrink-0" /> Semantic HTML Layout Structure
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
            <Check className="w-4 h-4 flex-shrink-0" /> Screen Reader Compatibility & ALT Tags
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
            <Check className="w-4 h-4 flex-shrink-0" /> Color Contrast compliance (AA level)
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
            <Check className="w-4 h-4 flex-shrink-0" /> Full Keyboard Focus & Tab Navigation
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectModal: React.FC = () => {
  const { selectedProjectForModal, setSelectedProjectForModal, t } = usePortfolio();

  return (
    <AnimatePresence>
      {selectedProjectForModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          {/* Page Sheet Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setSelectedProjectForModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Apple Page Sheet Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
            className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] bg-white dark:bg-[#1D1D1F] border-t sm:border border-[#D2D2D7] dark:border-[#333336] rounded-t-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Apple Drag Indicator Bar */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-[#D2D2D7] dark:bg-[#333336]" />
            </div>

            {/* Header Image */}
            <div className="relative h-60 sm:h-80 w-full overflow-hidden flex-shrink-0 bg-[#F5F5F7] dark:bg-[#151518] border-b border-[#D2D2D7]/40 dark:border-[#333336]">
              <img
                src={selectedProjectForModal.imageUrl}
                alt={selectedProjectForModal.title}
                className="w-full h-full object-contain p-6 sm:p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors cursor-pointer z-20"
                title={t('projects.close')}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-6 right-6 space-y-2 z-20">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0066CC] text-white shadow-md">
                    {selectedProjectForModal.category}
                  </span>
                  {selectedProjectForModal.metrics && (
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#34C759] text-white shadow-md flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{selectedProjectForModal.metrics}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedProjectForModal.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/80">
                  {selectedProjectForModal.subtitle}
                </p>
              </div>
            </div>

            {/* Scrollable Details Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1D1D1F] dark:text-[#F5F5F7] custom-scrollbar">
              <div className="flex items-center justify-between text-xs text-[#86868B] pb-3 border-b border-[#D2D2D7]/50 dark:border-[#333336]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('projects.periodLabel')} {selectedProjectForModal.date}</span>
                </span>
                <span className="font-mono">ID: {selectedProjectForModal.id}</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">
                  {t('projects.detailsTitle')}
                </h3>
                <div className="font-normal">
                  {parseDetailsAndLists(selectedProjectForModal.fullDetails || selectedProjectForModal.description)}
                </div>
              </div>

              {/* Conditional Specialized Renderers */}
              {selectedProjectForModal.id === 'lutheus-manage' && <LutheusCaseStudy />}
              {selectedProjectForModal.id === 'adalances-community' && <AdalancesCaseStudy />}
              {selectedProjectForModal.id === 'kirged-open-source' && <KirgedCaseStudy />}

              {/* Tech Stack */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">
                  {t('projects.techUsed')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectForModal.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/60 dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#D2D2D7]/50 dark:border-[#333336] flex flex-wrap items-center justify-end gap-2">
                {selectedProjectForModal.githubUrl && (
                  <a
                    href={selectedProjectForModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t('projects.github')}</span>
                  </a>
                )}

                {selectedProjectForModal.liveUrl && (
                  <a
                    href={selectedProjectForModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{t('projects.viewLive')}</span>
                  </a>
                )}

                {selectedProjectForModal.wikiUrl && (
                  <a
                    href={selectedProjectForModal.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#AF52DE]/15 hover:bg-[#AF52DE]/25 dark:bg-[#AF52DE]/10 dark:hover:bg-[#AF52DE]/20 text-xs font-semibold text-[#8E2EB2] dark:text-[#BF5AF2] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t('projects.wiki')}</span>
                  </a>
                )}

                {selectedProjectForModal.manageUrl && (
                  <a
                    href={selectedProjectForModal.manageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-[#30D158] transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>{t('projects.manage')}</span>
                  </a>
                )}

                {selectedProjectForModal.discordUrl && (
                  <a
                    href={selectedProjectForModal.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 dark:bg-[#5865F2]/10 dark:hover:bg-[#5865F2]/20 text-xs font-semibold text-[#404EED] dark:text-[#5865F2] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('projects.discord')}</span>
                  </a>
                )}

                {selectedProjectForModal.discordSubUrl && (
                  <a
                    href={selectedProjectForModal.discordSubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 dark:bg-[#5865F2]/10 dark:hover:bg-[#5865F2]/20 text-xs font-semibold text-[#404EED] dark:text-[#5865F2] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('projects.altDiscord')}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
