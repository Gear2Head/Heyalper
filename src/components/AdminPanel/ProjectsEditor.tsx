import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { Plus, Trash2, Edit3, Star, Image as ImageIcon, Zap, Check, X } from 'lucide-react';

export const ProjectsEditor: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyProject: Omit<Project, 'id'> = {
    title: '',
    subtitle: '',
    category: 'Yapay Zeka & Derin Öğrenme',
    description: '',
    fullDetails: '',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Python'],
    githubUrl: '',
    liveUrl: '',
    wikiUrl: '',
    manageUrl: '',
    discordUrl: '',
    discordSubUrl: '',
    featured: false,
    date: '2026',
    metrics: '',
    archived: false
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    if (editingProject.id) {
      updateProject(editingProject.id, editingProject);
    } else {
      addProject(editingProject as Omit<Project, 'id'>);
    }
    setEditingProject(null);
    setIsAddingNew(false);
  };

  const handleTagInput = (tagString: string) => {
    const tagsArr = tagString.split(',').map((t) => t.trim()).filter(Boolean);
    setEditingProject((prev) => ({ ...prev, tags: tagsArr }));
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Proje Portfolyo Yönetimi
          </h3>
          <p className="text-zinc-500">
            Yeni görsel, metrik ve açıklama ile projelerinizi yönetin veya yeni proje ekleyin.
          </p>
        </div>

        {!editingProject && (
          <button
            onClick={() => {
              setEditingProject(emptyProject);
              setIsAddingNew(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Proje Oluştur</span>
          </button>
        )}
      </div>

      {/* Form modal or inline editor */}
      {editingProject && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
            <span>{isAddingNew ? 'Yeni Proje Ekle' : `Düzenle: ${editingProject.title}`}</span>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-zinc-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Proje Başlığı</label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Kategori</label>
              <input
                type="text"
                required
                value={editingProject.category || ''}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Kısa Alt Başlık</label>
              <input
                type="text"
                value={editingProject.subtitle || ''}
                onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Görsel URL / Resim Adresi</span>
                <span className="text-[10px] text-zinc-400">Unsplash veya Doğrudan Resim Linki</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={editingProject.imageUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                />
                {editingProject.imageUrl && (
                  <img
                    src={editingProject.imageUrl}
                    alt="Önizleme"
                    className="w-10 h-10 rounded-lg object-cover border border-black/10"
                  />
                )}
              </div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Açıklama</label>
              <textarea
                rows={2}
                value={editingProject.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white resize-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Detaylı Açıklama / Hikaye</label>
              <textarea
                rows={3}
                value={editingProject.fullDetails || ''}
                onChange={(e) => setEditingProject({ ...editingProject, fullDetails: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Etiketler (Virgülle ayırın)</label>
              <input
                type="text"
                value={editingProject.tags ? editingProject.tags.join(', ') : ''}
                onChange={(e) => handleTagInput(e.target.value)}
                placeholder="Python, PyTorch, React"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Metrik / Başarı Rozeti</label>
              <input
                type="text"
                placeholder="%98.4 Doğruluk • 60 FPS"
                value={editingProject.metrics || ''}
                onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">GitHub URL</label>
              <input
                type="text"
                value={editingProject.githubUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Canlı Demo URL</label>
              <input
                type="text"
                value={editingProject.liveUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Wiki URL</label>
              <input
                type="text"
                value={editingProject.wikiUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, wikiUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Manage Panel URL</label>
              <input
                type="text"
                value={editingProject.manageUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, manageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Discord Davet URL</label>
              <input
                type="text"
                value={editingProject.discordUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, discordUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Alt Discord URL</label>
              <input
                type="text"
                value={editingProject.discordSubUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, discordSubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Öne Çıkar</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={editingProject.archived || false}
                  onChange={(e) => setEditingProject({ ...editingProject, archived: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Projeyi Arşivle</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-zinc-700 dark:text-zinc-300"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
              >
                Kaydet
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects List Table / Cards */}
      <div className="space-y-3">
        {data.projects.map((proj) => (
          <div
            key={proj.id}
            className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={proj.imageUrl}
                alt={proj.title}
                className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10 flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-white text-xs">{proj.title}</span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-zinc-950 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> Öne Çıkan
                    </span>
                  )}
                  {proj.archived && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-500 text-white">
                      Arşivlenmiş
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 font-medium">{proj.category} • {proj.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProject(proj);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                title="Düzenle"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteProject(proj.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
