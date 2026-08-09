import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Check, Copy, ArrowRight, GraduationCap, Bot } from 'lucide-react';

export const UniversityAiAssistant: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [answers, setAnswers] = useState({
    major: data.profile.targetMajor || 'Bilgisayar Mühendisliği & Yapay Zeka',
    keyHighlight: 'TÜBİTAK Proje Derecesi ve Tıbbi Yapay Zeka Uygulaması',
    motivation: 'Açık kaynak yazılımlar ve insan yararına çalışan algoritmalar üretmek istiyorum.',
    tone: 'Özgüvenli, Mühendislik Odaklı, Somut Verilere Dayalı'
  });

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const generateStatement = async () => {
    setLoading(true);
    setCopied(false);
    setApplied(false);
    try {
      const promptText = `Üniversite Başvurusu için Niyet Beyanı / Biyografi Üretimi:
- Başvurulacak Bölüm: ${answers.major}
- En Önemli Başarı / Proje: ${answers.keyHighlight}
- Motivasyon ve Gelecek Hedefi: ${answers.motivation}
- Başvuru Tonu: ${answers.tone}

Lütfen kabul komitesini etkileyecek, basma kalıp AI cümleleri (örneğin 'I am excited to share', 'supercharge' vb.) içermeyen; somut, disiplinli ve Apple tarzı minimalist ve etkileyici 1-2 paragraflık bir Türkçe biyografi metni oluştur.`;

      const res = await fetch('/api/ai/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          contextType: 'Üniversite Kabul Beyanı',
          targetUniversity: data.profile.targetUniversity
        })
      });
      const resData = await res.json();
      if (resData.enhancedText) {
        setGeneratedResult(resData.enhancedText);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const applyToProfile = () => {
    if (!generatedResult) return;
    updateProfile({ longBio: generatedResult });
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="border-b border-black/10 dark:border-white/10 pb-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Bot className="w-4 h-4 text-amber-500" />
          <span>Gemini AI Üniversite Kabul & Niyet Beyanı Asistanı</span>
        </h3>
        <p className="text-zinc-500 mt-0.5">
          Üniversite başvuru kuruluna özel, insan elinden çıkmış hissi veren profesyonel akademik biyografiler oluşturun.
        </p>
      </div>

      <div className="space-y-3 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">1. Hangi Bölüme Başvuruyorsun?</label>
          <input
            type="text"
            value={answers.major}
            onChange={(e) => setAnswers({ ...answers, major: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">2. Öne Çıkarmak İstediğin Ana Başarı veya Projen Nedir?</label>
          <input
            type="text"
            value={answers.keyHighlight}
            onChange={(e) => setAnswers({ ...answers, keyHighlight: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">3. Gelecek Hedefin & Motivasyonun Nedir?</label>
          <input
            type="text"
            value={answers.motivation}
            onChange={(e) => setAnswers({ ...answers, motivation: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <button
          onClick={generateStatement}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'AI Metin Hazırlıyor...' : 'Akademik Niyet Beyanını Üret'}</span>
        </button>
      </div>

      {generatedResult && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Üretilen Niyet Beyanı</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-lg bg-white/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>

              <button
                onClick={applyToProfile}
                className="p-1.5 px-3 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer shadow-sm"
              >
                {applied ? <Check className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                <span>{applied ? 'Profilde Güncellendi!' : 'Profile Uygula'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed italic bg-white/60 dark:bg-zinc-900/60 p-3 rounded-xl border border-black/5 dark:border-white/5">
            "{generatedResult}"
          </p>
        </div>
      )}
    </div>
  );
};
