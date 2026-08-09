import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Upload, RefreshCw, Check, AlertCircle } from 'lucide-react';

export const BackupRestore: React.FC = () => {
  const { exportJSON, importJSON, resetToDefaults } = usePortfolio();
  const [jsonText, setJsonText] = useState('');
  const [msg, setMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleDownload = () => {
    const dataStr = exportJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolyo_yedek_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!jsonText.trim()) return;
    const ok = importJSON(jsonText);
    if (ok) {
      setMsg({ text: 'Veriler başarıyla içe aktarıldı ve yüklendi!', success: true });
      setJsonText('');
    } else {
      setMsg({ text: 'Geçersiz JSON formatı. Lütfen kontrol edin.', success: false });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tüm kişisel verileri varsayılan örnek verilere sıfırlamak istediğinize emin misiniz?')) {
      resetToDefaults();
      setMsg({ text: 'Varsayılan örneğe sıfırlandı.', success: true });
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="border-b border-black/10 dark:border-white/10 pb-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Veri Yedekleme & Dışa/İçe Aktarma
        </h3>
        <p className="text-zinc-500">
          Tüm portfolyo içeriğinizi JSON dosyası olarak bilgisayarınıza indirin veya başka bir cihazda yükleyin.
        </p>
      </div>

      {msg && (
        <div className={`p-3 rounded-xl flex items-center gap-2 font-semibold ${msg.success ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600'}`}>
          {msg.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Download Backup */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
        <h4 className="font-bold text-zinc-900 dark:text-white">1. Yedeği Bilgisayara İndir (JSON)</h4>
        <p className="text-zinc-500">Tüm projeler, sertifikalar ve biyografi bilgileri tek bir JSON dosyasında saklanır.</p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>JSON Yedeğini İndir</span>
        </button>
      </div>

      {/* Import JSON */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
        <h4 className="font-bold text-zinc-900 dark:text-white">2. Yedek Dosyası Yükle (JSON Yapıştır)</h4>
        <textarea
          rows={4}
          placeholder="İndirdiğiniz JSON metnini buraya yapıştırın..."
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 font-mono text-[11px] text-zinc-900 dark:text-white resize-none"
        />
        <button
          onClick={handleImport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Yedeği Yükle & Çalıştır</span>
        </button>
      </div>

      {/* Reset */}
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
        <h4 className="font-bold text-rose-700 dark:text-rose-400">3. Varsayılan Örneğe Sıfırla</h4>
        <p className="text-zinc-500">Tüm değişiklikleri siler ve ilk başlangıç örnek verilerine döner.</p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-md cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Fabrika Ayarlarına Dön</span>
        </button>
      </div>
    </div>
  );
};
