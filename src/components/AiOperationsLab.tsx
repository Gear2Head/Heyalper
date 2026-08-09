import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  Terminal, 
  Database, 
  Sliders, 
  Zap, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Bot, 
  BarChart2, 
  FileText,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AiOperationsLab: React.FC = () => {
  const { data, t } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'sql_ai' | 'calculator' | 'summary'>('sql_ai');

  // SQL & AI Playground State
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // Calculator State
  const [memberCount, setMemberCount] = useState(297800);
  const [peakUsers, setPeakUsers] = useState(15900);
  const [aiEfficiency, setAiEfficiency] = useState(92);

  const sampleQueries = [
    {
      title: t('KPI & Moderatör Skoru Sorgusu', 'KPI & Moderator Score Query'),
      query: t(
        'Son 24 saatte Adalances ve Lutheus sunucularında en yüksek KPI skoruna sahip yetkilileri ve ceza işlem sayılarını getir.',
        'Fetch staff members with highest KPI scores and penalty count over the last 24 hours across Adalances & Lutheus servers.'
      ),
      sql: `SELECT m.moderator_name, COUNT(a.action_id) as total_actions, AVG(m.kpi_score) as avg_kpi\nFROM moderators m\nJOIN moderation_actions a ON m.id = a.moderator_id\nWHERE a.timestamp >= NOW() - INTERVAL '24 hours'\nGROUP BY m.moderator_name\nORDER BY avg_kpi DESC LIMIT 5;`,
      aiResult: t(
        'AI Analizi: Kadir Alper Şener liderliğindeki Lutheus yetkili ekibi son 24 saatte 184 işlem tamamlamıştır. Ortalama müdahale süresi: 1.2 saniye. Başarı skoru %98.4.',
        'AI Analysis: The Lutheus staff team led by Kadir Alper Şener executed 184 moderation actions in 24 hours. Avg response latency: 1.2s. SLA precision: 98.4%.'
      )
    },
    {
      title: t('Topluluk Kriz & Spam Analizi', 'Community Crisis & Anti-Spam Query'),
      query: t(
        '228k üyeli Adalances ana sunucusundaki anlık sohbet hızı ve AI filtresine takılan içerikler.',
        'Analyse real-time chat speed and AI filtering logs on the 228k member Adalances main server.'
      ),
      sql: `SELECT DATE_TRUNC('minute', created_at) as minute_bucket, COUNT(*) as msg_count\nFROM discord_messages\nWHERE guild_id = 'adalances_main'\nGROUP BY minute_bucket\nHAVING COUNT(*) > 120\nORDER BY minute_bucket DESC;`,
      aiResult: t(
        'AI Analizi: Anlık 15.934 peak aktif kullanıcı trafiğinde dakikada 340+ mesaj işlenmektedir. Lutheus Manage AI otomasyonu sayesinde spam içerikler %99.2 oranında engellenmiştir.',
        'AI Analysis: Processing 340+ msg/min under 15,934 peak concurrent online user load. Lutheus Manage AI automation prevented 99.2% of spam messages.'
      )
    },
    {
      title: t('GKS Burs Adaylığı & Akademik Özet', 'GKS Scholarship Candidate Query'),
      query: t(
        'Kadir Alper Şener için Kore Devlet Bursu (GKS) uygunluk ve sertifika dökümünü listele.',
        'Query Korea Global Korea Scholarship (GKS) eligibility and certificate portfolio for Kadir Alper Şener.'
      ),
      sql: `SELECT candidate_name, gpa_score, ielts_level, cert_count, target_university\nFROM candidates\nWHERE email = 'senerkadiralper@gmail.com';`,
      aiResult: t(
        'AI Analizi: OBP: 94.4/100, IELTS: 7.0 C1, Uluslararası eTwinning Kalite Etiketi, EU Code Week 2024 Katılımı. Kore Bilgisayar Mühendisliği bursu için yüksek nitelikli aday.',
        'AI Analysis: GPA: 94.4/100, IELTS: 7.0 C1, International eTwinning Quality Label, EU Code Week 2024. Highly qualified candidate for Computer Science degree in South Korea.'
      )
    }
  ];

  // Calculated metrics
  const estimatedDailyTickets = Math.round((memberCount / 1000) * 1.8);
  const savedHoursPerWeek = Math.round((memberCount / 10000) * (aiEfficiency / 10) * 4.2);
  const responseTimeMs = Math.max(15, Math.round(180 - (aiEfficiency * 1.5)));

  const handleCopySummary = () => {
    const text = t(
      `KADİR ALPER ŞENER - AKADEMİK & AI OPERASYON DOSYASI\nE-Posta: senerkadiralper@gmail.com\nOBP: 94.4/100 | IELTS: 7.0 (C1)\nYönetilen Topluluk Hacmi: 297.800+ Üye (Adalances & Lutheus)\nÖne Çıkan Uzmanlık: Claude, OpenAI Codex, Gemini AI Prompt Engineering, SQL, Moderasyon Operasyonları.\nSertifikalar: eTwinning Quality Label (ESEP), EU Code Week 2024.`,
      `KADIR ALPER SENER - ACADEMIC & AI OPERATIONS DOSSIER\nEmail: senerkadiralper@gmail.com\nGPA: 94.4/100 | IELTS: 7.0 (C1 Proficient)\nManaged Community Scale: 297,800+ Members (Adalances & Lutheus)\nKey Specializations: Claude, OpenAI Codex, Gemini AI Prompt Engineering, SQL Databases, Community Leadership.\nCertifications: eTwinning Quality Label (ESEP), EU Code Week 2024.`
    );
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-lab" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('ETKİLEŞİMLİ AI & OPERASYON LABORATUVARI', 'INTERACTIVE AI & OPERATIONS LAB')}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-white tracking-tight">
            {t('AI Prompt, SQL & Metrik Simülatörü', 'AI Prompting, SQL & Metrics Simulator')}
          </h2>
          <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
            {t(
              'Lutheus Manage AI otomasyon altyapısını, veritabanı sorgularını ve topluluk verimlilik metriklerini canlı olarak test edin.',
              'Test the Lutheus Manage AI infrastructure, database query logic, and live community operational efficiency metrics.'
            )}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#E8E8ED] dark:bg-[#2C2C2E] p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sql_ai')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'sql_ai'
                ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>{t('SQL & AI Playground', 'SQL & AI Lab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>{t('Metrik Hesaplayıcı', 'Impact Calculator')}</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>{t('Aday Özeti', 'Dossier Card')}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Card Container */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-[#333336] shadow-sm">
        {/* Tab 1: SQL & AI Playground */}
        {activeTab === 'sql_ai' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D2D2D7]/50 dark:border-[#333336] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('Doğal Dil -> SQL & AI Analiz Motoru', 'Natural Language -> SQL & AI Pipeline')}</span>
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  {t('Sorgulamak istediğiniz örneği seçin veya canlı SQL dönüşümünü izleyin.', 'Select a sample request to view live SQL generation and AI processing.')}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Lutheus AI Engine Online</span>
              </div>
            </div>

            {/* Query Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {sampleQueries.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPrompt(index)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPrompt === index
                      ? 'bg-[#0066CC] text-white shadow-xs'
                      : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Natural Language Prompt Display */}
            <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-[#333336] space-y-1">
              <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">
                {t('Girdi Prompt (Doğal Dil):', 'Input Prompt (Natural Language):')}
              </span>
              <p className="text-xs font-medium text-[#1D1D1F] dark:text-white">
                "{sampleQueries[selectedPrompt].query}"
              </p>
            </div>

            {/* Dual Grid: Generated SQL & AI Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SQL Window */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-[#333336] text-zinc-100 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-sans border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#0066CC]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Generated PostgreSQL Query</span>
                  </div>
                  <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">Read-Only</span>
                </div>
                <pre className="whitespace-pre-wrap text-emerald-400 text-[11px] leading-relaxed pt-1">
                  {sampleQueries[selectedPrompt].sql}
                </pre>
              </div>

              {/* AI Result Window */}
              <div className="p-4 rounded-2xl bg-[#0066CC]/5 dark:bg-[#0066CC]/10 border border-[#0066CC]/20 text-[#1D1D1F] dark:text-white space-y-2">
                <div className="flex items-center justify-between border-b border-[#0066CC]/20 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#0066CC] dark:text-[#3898FF]">
                    <Bot className="w-4 h-4" />
                    <span>Lutheus Manage AI Summary</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0066CC] text-white">
                    99.4% Match
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#1D1D1F] dark:text-zinc-200 font-medium pt-1">
                  {sampleQueries[selectedPrompt].aiResult}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Community Impact Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D2D2D7]/50 dark:border-[#333336] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('Topluluk Operasyon & AI Verimlilik Hesaplayıcı', 'Community Operations & AI ROI Calculator')}</span>
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  {t('Sürükleyicileri ayarlayarak AI destekli moderasyonun iş yükünü nasıl hafiflettiğini görün.', 'Adjust the sliders to calculate how AI automation reduces community support workload.')}
                </p>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slider 1: Member Count */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E]">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#86868B]">{t('Toplam Topluluk Üyesi', 'Total Community Members')}</span>
                  <span className="text-[#0066CC] font-bold">{memberCount.toLocaleString('tr-TR')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={memberCount}
                  onChange={(e) => setMemberCount(Number(e.target.value))}
                  className="w-full accent-[#0066CC] cursor-pointer"
                />
              </div>

              {/* Slider 2: Peak Users */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E]">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#86868B]">{t('Anlık Peak Online Trafik', 'Peak Online Users')}</span>
                  <span className="text-[#0066CC] font-bold">{peakUsers.toLocaleString('tr-TR')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={peakUsers}
                  onChange={(e) => setPeakUsers(Number(e.target.value))}
                  className="w-full accent-[#0066CC] cursor-pointer"
                />
              </div>

              {/* Slider 3: AI Efficiency */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E]">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#86868B]">{t('AI Otomasyon Seviyesi', 'AI Automation Level')}</span>
                  <span className="text-[#0066CC] font-bold">%{aiEfficiency}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  step="1"
                  value={aiEfficiency}
                  onChange={(e) => setAiEfficiency(Number(e.target.value))}
                  className="w-full accent-[#0066CC] cursor-pointer"
                />
              </div>
            </div>

            {/* Computed Output Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0066CC]/10 border border-[#0066CC]/20 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC]">
                  {t('Tahmini Günlük Bilet', 'Est. Daily Tickets')}
                </span>
                <p className="text-2xl font-extrabold text-[#0066CC]">{estimatedDailyTickets}</p>
                <span className="text-[10px] text-[#86868B] block">{t('Süreç Destek Talebi', 'Support Requests')}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {t('Tasarruf Edilen Süre', 'Saved Time / Wk')}
                </span>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{savedHoursPerWeek} {t('Sa/Hafta', 'Hrs/Wk')}</p>
                <span className="text-[10px] text-[#86868B] block">{t('Otomasyon Kazancı', 'AI Productivity Gain')}</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {t('Yanıt Gecikmesi', 'Response Latency')}
                </span>
                <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">{responseTimeMs} ms</p>
                <span className="text-[10px] text-[#86868B] block">{t('Anlık İşleme Hızı', 'Ultra-fast Processing')}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t('Topluluk Memnuniyeti', 'User Satisfaction')}
                </span>
                <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">%99.4</p>
                <span className="text-[10px] text-[#86868B] block">{t('Kriz Müdahale Skoru', 'SLA Uptime Standard')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Candidate Summary Dossier Card */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D2D2D7]/50 dark:border-[#333336] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('Kadir Alper Şener - Hızlı Başvuru Özet Kartı', 'Kadir Alper Şener - Dossier Card')}</span>
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  {t('Üniversite kabulleri, burs komiteleri ve akademik değerlendirmeler için hazır döküm.', 'Ready-to-copy summary card for admissions, scholarship boards, and academic reviewers.')}
                </p>
              </div>

              <button
                onClick={handleCopySummary}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#0066CC] hover:bg-[#0077ED] text-white transition-colors cursor-pointer w-fit"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('Kopyalandı!', 'Copied!') : t('Metni Kopyala', 'Copy Dossier Text')}</span>
              </button>
            </div>

            {/* Clean Apple Dossier Box */}
            <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7]/60 dark:border-[#333336] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#86868B] font-medium block">{t('Aday Adı & Hedef:', 'Candidate Name & Objective:')}</span>
                  <p className="font-bold text-[#1D1D1F] dark:text-white text-sm">Kadir Alper Şener</p>
                  <p className="text-[#0066CC] font-semibold">{data.profile.targetUniversity} - {data.profile.targetMajor}</p>
                </div>

                <div>
                  <span className="text-[#86868B] font-medium block">{t('Akademik Derece & Dil:', 'Academic GPA & Language:')}</span>
                  <p className="font-bold text-[#1D1D1F] dark:text-white">OBP: 94.4 / 100</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">IELTS Academic: 7.0 (C1 Level)</p>
                </div>

                <div>
                  <span className="text-[#86868B] font-medium block">{t('Yönetilen Topluluk Hacmi:', 'Community Scale:')}</span>
                  <p className="font-bold text-[#1D1D1F] dark:text-white">297.800+ Toplam Üye</p>
                  <p className="text-[#86868B]">Adalances (228k + 68.5k) & Lutheus (918)</p>
                </div>

                <div>
                  <span className="text-[#86868B] font-medium block">{t('Uluslararası Başarılar:', 'International Honors:')}</span>
                  <p className="font-bold text-[#1D1D1F] dark:text-white">eTwinning Pupil Quality Label</p>
                  <p className="text-[#86868B]">EU Code Week 2024 Katılım Sertifikası</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D2D2D7]/50 dark:border-[#333336]">
                <span className="text-[#86868B] text-[11px] font-medium block mb-1">{t('Teknik & Operasyonel Yetkinlikler:', 'Core Competencies:')}</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Claude Prompt Eng.', 'OpenAI Codex', 'Gemini Pro', 'SQL & PostgreSQL', 'Discord Server Architecture', 'Kriz Yönetimi', 'Lutheus Manage AI'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/50 dark:border-[#333336]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
