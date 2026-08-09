import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProfileEditor } from './ProfileEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { TimelineEditor } from './TimelineEditor';
import { SkillsEditor } from './SkillsEditor';
import { ThemeCustomizer } from './ThemeCustomizer';
import { UniversityAiAssistant } from './UniversityAiAssistant';
import { BackupRestore } from './BackupRestore';
import { ContentAuditTool } from './ContentAuditTool';
import { 
  X, 
  Lock, 
  Settings, 
  User, 
  FolderKanban, 
  GraduationCap, 
  Award, 
  Palette, 
  Bot, 
  Download, 
  LogOut, 
  KeyRound,
  Mail,
  Sparkles,
  Eye,
  FileCheck2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminPanelModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    adminActiveTab,
    setAdminActiveTab,
    t
  } = usePortfolio();

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const activeTab = adminActiveTab;
  const setActiveTab = setAdminActiveTab;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await loginAdmin(email, passcode);
    if (!ok) {
      setErrorMsg(t('Hatalı e-posta veya şifre! Lütfen kontrol edin.', 'Invalid email or passcode! Please check.'));
    } else {
      setErrorMsg('');
      setPasscode('');
      setEmail('');
    }
  };

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          {/* Page Sheet Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setIsAdminOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl"
          />

          {/* Apple Page Sheet Modal Window */}
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-white dark:bg-[#1D1D1F] border-t sm:border border-[#D2D2D7] dark:border-[#333336] rounded-t-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Apple Drag Indicator Bar */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-[#D2D2D7] dark:bg-[#333336]" />
            </div>

            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#D2D2D7]/60 dark:border-[#333336] bg-[#F5F5F7]/80 dark:bg-[#2C2C2E]/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#0066CC] text-white shadow-sm">
                  <Settings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                    <span>{t('Portfolyo Yönetim Paneli', 'Portfolio Control Panel')}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759] font-bold border border-[#34C759]/20">
                      {t('Canlı Düzenleme', 'Live Editing')}
                    </span>
                  </h2>
                  <p className="text-[11px] text-[#86868B] font-medium">
                    {t('Görsel yükleyin, projelerinizi ekleyin ve üniversite başvurunuzu kişiselleştirin.', 'Upload assets, manage projects, and customize your scholarship application.')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#E8E8ED] dark:bg-[#2C2C2E] hover:bg-[#D2D2D7] dark:hover:bg-[#3A3A3C] text-[#1D1D1F] dark:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>{t('Canlı Önizlemeye Dön', 'Back to Live Preview')}</span>
                </button>

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 rounded-full hover:bg-[#E8E8ED] dark:hover:bg-[#2C2C2E] text-[#86868B] transition-colors cursor-pointer"
                  title={t('Kapat', 'Close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {!isAdminAuthenticated ? (
              /* Login Form Screen */
              <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center border border-[#0066CC]/20 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white">
                    {t('Yönetim Paneline Giriş', 'Admin Panel Sign In')}
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    {t('Görsel ve bilgi girişi yapmak için erişim şifrenizi girin.', 'Enter your passcode to manage content and upload assets.')}
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
                    <input
                      type="email"
                      required
                      placeholder={t('E-Posta Adresi', 'Email Address')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#333336] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50"
                    />
                  </div>

                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
                    <input
                      type="password"
                      required
                      placeholder={t('Yönetici Şifresi', 'Admin Passcode')}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#333336] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#0066CC] hover:bg-[#0077ED] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    {t('Yönetici Olarak Giriş Yap', 'Sign In as Administrator')}
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin View: Sidebar + Content Area */
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-56 p-3 border-b md:border-b-0 md:border-r border-[#D2D2D7]/60 dark:border-[#333336] bg-[#F5F5F7]/50 dark:bg-[#1D1D1F] flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible flex-shrink-0">
                  {[
                    { id: 'profile', label: t('Profil Bilgileri', 'Profile Info'), icon: User },
                    { id: 'projects', label: t('Projeler Yönetimi', 'Projects Manager'), icon: FolderKanban },
                    { id: 'timeline', label: t('Akademik & Ödül', 'Academic Timeline'), icon: GraduationCap },
                    { id: 'skills', label: t('Sertifikalar', 'Certificates'), icon: Award },
                    { id: 'theme', label: t('Apple Görünüm', 'Theme Customizer'), icon: Palette },
                    { id: 'ai', label: t('AI Kabul Asistanı', 'AI Admission Agent'), icon: Bot },
                    { id: 'audit', label: t('İçerik Denetimi', 'Content Audit Tool'), icon: FileCheck2 },
                    { id: 'backup', label: t('Yedekle / Yükle', 'Backup & Restore'), icon: Download },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#0066CC] text-white shadow-sm'
                            : 'text-[#86868B] hover:bg-[#E8E8ED] dark:hover:bg-[#2C2C2E] hover:text-[#1D1D1F] dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}

                  <div className="hidden md:block flex-1" />

                  <button
                    onClick={logoutAdmin}
                    className="hidden md:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('Çıkış Yap', 'Sign Out')}</span>
                  </button>
                </div>

                {/* Main Tab Content with smooth fade animation */}
                <div className="flex-1 p-5 sm:p-7 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'profile' && <ProfileEditor />}
                      {activeTab === 'projects' && <ProjectsEditor />}
                      {activeTab === 'timeline' && <TimelineEditor />}
                      {activeTab === 'skills' && <SkillsEditor />}
                      {activeTab === 'theme' && <ThemeCustomizer />}
                      {activeTab === 'ai' && <UniversityAiAssistant />}
                      {activeTab === 'audit' && <ContentAuditTool />}
                      {activeTab === 'backup' && <BackupRestore />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
