import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Profile, Project, AcademicEntry, SkillCategory, Certificate, ThemeSettings } from '../types';
import { initialPortfolioData } from '../data/initialData';

export type Language = 'tr' | 'en';

interface PortfolioContextType {
  data: PortfolioData;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends React.ReactNode>(tr: T, en: T) => T;
  updateProfile: (profile: Partial<Profile>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  addAcademicEntry: (entry: Omit<AcademicEntry, 'id'>) => void;
  updateAcademicEntry: (id: string, entry: Partial<AcademicEntry>) => void;
  deleteAcademicEntry: (id: string) => void;
  addSkillCategory: (category: Omit<SkillCategory, 'id'>) => void;
  updateSkillCategory: (id: string, category: Partial<SkillCategory>) => void;
  deleteSkillCategory: (id: string) => void;
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  deleteCertificate: (id: string) => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  toggleThemeLock: () => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, passcode: string) => Promise<boolean>;
  logoutAdmin: () => void;
  selectedProjectForModal: Project | null;
  setSelectedProjectForModal: (p: Project | null) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  adminActiveTab: 'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup';
  setAdminActiveTab: (tab: 'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup') => void;
  openAdminTab: (tab: 'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'apple_portfolio_kore_gks_v3';
const LANG_STORAGE_KEY = 'apple_portfolio_lang';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'en' || savedLang === 'tr') return savedLang;
    } catch (e) {
      console.error('Failed to load language', e);
    }
    return 'tr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const t = <T extends React.ReactNode>(tr: T, en: T): T => {
    return language === 'en' ? en : tr;
  };

  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure "Full-Stack" is overridden if old data is stored
        if (parsed?.profile?.title?.includes('Full-Stack')) {
          return initialPortfolioData;
        }
        return { ...initialPortfolioData, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load portfolio from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [adminActiveTab, setAdminActiveTab] = useState<'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup'>('profile');

  const openAdminTab = (tab: 'profile' | 'projects' | 'timeline' | 'skills' | 'theme' | 'ai' | 'audit' | 'backup') => {
    setAdminActiveTab(tab);
    setIsAdminOpen(true);
  };

  // Load initial portfolio data from Supabase DB via our Express backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const result = await res.json();
        if (result.success && result.data && result.data.profile) {
          setData((prev) => ({
            ...prev,
            ...result.data
          }));
        }
      } catch (e) {
        console.error('Failed to fetch from DB, using local storage cache', e);
      }
    };
    fetchPortfolio();
  }, []);

  // Save changes to localStorage & sync with database if admin is logged in
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      
      if (isAdminAuthenticated) {
        fetch('/api/portfolio', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-passcode': sessionStorage.getItem('adminPasscode') || ''
          },
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(res => {
          if (res.success) console.log('Portfolio auto-synced to database');
        })
        .catch(err => console.error('Database auto-sync failed', err));
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data, isAdminAuthenticated]);

  // Auto time-based dark mode switcher (7 PM to 7 AM: Dark, 7 AM to 7 PM: Light)
  useEffect(() => {
    const checkAndApplyAutoTheme = () => {
      if (!data.theme.isThemeLocked) {
        const hour = new Date().getHours();
        const shouldBeDark = hour >= 19 || hour < 7;
        if (data.theme.darkMode !== shouldBeDark) {
          setData((prev) => ({
            ...prev,
            theme: { ...prev.theme, darkMode: shouldBeDark }
          }));
        }
      }
    };

    checkAndApplyAutoTheme();
    const interval = setInterval(checkAndApplyAutoTheme, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [data.theme.isThemeLocked, data.theme.darkMode]);

  // Sync dark class on document element
  useEffect(() => {
    if (data.theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.theme.darkMode]);

  const updateProfile = (profile: Partial<Profile>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, projectPartial: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...projectPartial } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setData((prev) => ({
      ...prev,
      projects: newProjects
    }));
  };

  const addAcademicEntry = (entry: Omit<AcademicEntry, 'id'>) => {
    const newEntry: AcademicEntry = {
      ...entry,
      id: `entry-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      academicEntries: [newEntry, ...prev.academicEntries]
    }));
  };

  const updateAcademicEntry = (id: string, entryPartial: Partial<AcademicEntry>) => {
    setData((prev) => ({
      ...prev,
      academicEntries: prev.academicEntries.map((e) => (e.id === id ? { ...e, ...entryPartial } : e))
    }));
  };

  const deleteAcademicEntry = (id: string) => {
    setData((prev) => ({
      ...prev,
      academicEntries: prev.academicEntries.filter((e) => e.id !== id)
    }));
  };

  const addSkillCategory = (category: Omit<SkillCategory, 'id'>) => {
    const newCat: SkillCategory = {
      ...category,
      id: `cat-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, newCat]
    }));
  };

  const updateSkillCategory = (id: string, categoryPartial: Partial<SkillCategory>) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((c) => (c.id === id ? { ...c, ...categoryPartial } : c))
    }));
  };

  const deleteSkillCategory = (id: string) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((c) => c.id !== id)
    }));
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert]
    }));
  };

  const deleteCertificate = (id: string) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id)
    }));
  };

  const updateTheme = (themePartial: Partial<ThemeSettings>) => {
    setData((prev) => {
      // If user toggles darkMode explicitly without specifying isThemeLocked, lock the theme selection
      const isManualToggle = 'darkMode' in themePartial && !('isThemeLocked' in themePartial);
      return {
        ...prev,
        theme: {
          ...prev.theme,
          ...themePartial,
          ...(isManualToggle ? { isThemeLocked: true } : {})
        }
      };
    });
  };

  const toggleThemeLock = () => {
    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        isThemeLocked: !prev.theme.isThemeLocked
      }
    }));
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && Array.isArray(parsed.projects)) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  const loginAdmin = async (email: string, passcode: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passcode })
      });
      const result = await response.json();
      if (result.success) {
        sessionStorage.setItem('adminPasscode', passcode);
        setIsAdminAuthenticated(true);
        return true;
      }
    } catch (e) {
      console.error('Login request failed', e);
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        language,
        setLanguage,
        t,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addAcademicEntry,
        updateAcademicEntry,
        deleteAcademicEntry,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        addCertificate,
        deleteCertificate,
        updateTheme,
        toggleThemeLock,
        resetToDefaults,
        exportJSON,
        importJSON,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        selectedProjectForModal,
        setSelectedProjectForModal,
        activeSection,
        setActiveSection,
        adminActiveTab,
        setAdminActiveTab,
        openAdminTab
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
