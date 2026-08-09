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

const SUPABASE_URL = 'https://ljtiaevwznziihbndack.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdGlhZXZ3em56aWloYm5kYWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzIzMDYsImV4cCI6MjEwMTQ0ODMwNn0.q2oLTzz5z3NtP7drA12kqHIjvX0iKcvv65KZlnfSsz0';

const supabaseHeaders = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

// Client-side mapping functions between database schema and API models
function mapProfileDbToApi(db: any): any {
  if (!db) return null;
  return {
    fullName: db.full_name,
    title: db.title,
    targetUniversity: db.target_university || '',
    targetMajor: db.target_major || '',
    bio: db.bio || '',
    longBio: db.long_bio || '',
    email: db.email || '',
    location: db.location || '',
    avatarUrl: db.avatar_url || '',
    resumeUrl: db.resume_url || '',
    githubUrl: db.github_url || '',
    linkedinUrl: db.linkedin_url || '',
    instagramUrl: db.instagram_url || '',
    gpa: db.gpa || '',
    satScore: db.sat_score || '',
    graduationYear: db.graduation_year || '',
    akaName: db.aka_name || '',
    highlights: db.highlights || []
  };
}

function mapProfileApiToDb(api: any): any {
  return {
    id: 1,
    full_name: api.fullName,
    title: api.title,
    target_university: api.targetUniversity || '',
    target_major: api.targetMajor || '',
    bio: api.bio || '',
    long_bio: api.longBio || '',
    email: api.email || '',
    location: api.location || '',
    avatar_url: api.avatarUrl || '',
    resume_url: api.resumeUrl || '',
    github_url: api.githubUrl || '',
    linkedin_url: api.linkedinUrl || '',
    instagram_url: api.instagramUrl || '',
    gpa: api.gpa || '',
    sat_score: api.satScore || '',
    graduation_year: api.graduationYear || '',
    aka_name: api.akaName || '',
    highlights: api.highlights || []
  };
}

function mapProjectDbToApi(db: any): any {
  return {
    id: db.id,
    title: db.title,
    subtitle: db.subtitle || '',
    category: db.category || '',
    description: db.description || '',
    fullDetails: db.full_details || '',
    imageUrl: db.image_url || '',
    tags: db.tags || [],
    githubUrl: db.github_url || undefined,
    liveUrl: db.live_url || undefined,
    wikiUrl: db.wiki_url || undefined,
    manageUrl: db.manage_url || undefined,
    discordUrl: db.discord_url || undefined,
    discordSubUrl: db.discord_sub_url || undefined,
    featured: !!db.featured,
    date: db.date || '',
    metrics: db.metrics || undefined,
    archived: !!db.archived
  };
}

function mapProjectApiToDb(api: any): any {
  return {
    id: api.id,
    title: api.title,
    subtitle: api.subtitle || '',
    category: api.category || '',
    description: api.description || '',
    full_details: api.fullDetails || '',
    image_url: api.imageUrl || '',
    tags: api.tags || [],
    github_url: api.githubUrl || null,
    live_url: api.liveUrl || null,
    wiki_url: api.wikiUrl || null,
    manage_url: api.manageUrl || null,
    discord_url: api.discordUrl || null,
    discord_sub_url: api.discordSubUrl || null,
    featured: !!api.featured,
    date: api.date || '',
    metrics: api.metrics || null,
    archived: !!api.archived
  };
}

function mapCertificateDbToApi(db: any): any {
  return {
    id: db.id,
    title: db.title,
    issuer: db.issuer || '',
    date: db.date || '',
    credentialUrl: db.credential_url || undefined,
    imageUrl: db.image_url || undefined,
    code: db.code || undefined
  };
}

function mapCertificateApiToDb(api: any): any {
  return {
    id: api.id,
    title: api.title,
    issuer: api.issuer || '',
    date: api.date || '',
    credential_url: api.credentialUrl || null,
    image_url: api.imageUrl || null,
    code: api.code || null
  };
}

const hashPasscode = async (text: string) => {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

  // Load initial portfolio data directly from Supabase DB
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const [profileRes, projectsRes, academicRes, skillsRes, certsRes] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/profile?select=*`, { headers: supabaseHeaders }).then(r => r.json()),
          fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=id`, { headers: supabaseHeaders }).then(r => r.json()),
          fetch(`${SUPABASE_URL}/rest/v1/academic_entries?select=*`, { headers: supabaseHeaders }).then(r => r.json()),
          fetch(`${SUPABASE_URL}/rest/v1/skill_categories?select=*`, { headers: supabaseHeaders }).then(r => r.json()),
          fetch(`${SUPABASE_URL}/rest/v1/certificates?select=*`, { headers: supabaseHeaders }).then(r => r.json())
        ]);

        const profile = profileRes && profileRes.length > 0 ? mapProfileDbToApi(profileRes[0]) : null;
        const projects = Array.isArray(projectsRes) ? projectsRes.map(mapProjectDbToApi) : [];
        const academicEntries = Array.isArray(academicRes) ? academicRes : [];
        const skillCategories = Array.isArray(skillsRes) ? skillsRes : [];
        const certificates = Array.isArray(certsRes) ? certsRes.map(mapCertificateDbToApi) : [];

        if (profile) {
          setData((prev) => ({
            ...prev,
            profile,
            projects,
            academicEntries,
            skillCategories,
            certificates
          }));
        }
      } catch (e) {
        console.error('Failed to fetch from Supabase, using local storage cache', e);
      }
    };
    fetchPortfolio();
  }, []);

  // Save changes to localStorage & sync with database if admin is logged in
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      
      const syncWithSupabase = async () => {
        if (!isAdminAuthenticated) return;
        const adminPasscode = sessionStorage.getItem('adminPasscode');
        if (adminPasscode !== 'sener123' && adminPasscode !== 'admin123') return;

        // 1. Sync Profile (PATCH row id 1)
        const profileDb = mapProfileApiToDb(data.profile);
        await fetch(`${SUPABASE_URL}/rest/v1/profile?id=eq.1`, {
          method: 'PATCH',
          headers: supabaseHeaders,
          body: JSON.stringify(profileDb)
        });

        // 2. Overwrite Projects
        await fetch(`${SUPABASE_URL}/rest/v1/projects?id=not.is.null`, { method: 'DELETE', headers: supabaseHeaders });
        if (data.projects.length > 0) {
          const projectsDb = data.projects.map(mapProjectApiToDb);
          await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify(projectsDb)
          });
        }

        // 3. Overwrite Academic Entries
        await fetch(`${SUPABASE_URL}/rest/v1/academic_entries?id=not.is.null`, { method: 'DELETE', headers: supabaseHeaders });
        if (data.academicEntries.length > 0) {
          await fetch(`${SUPABASE_URL}/rest/v1/academic_entries`, {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify(data.academicEntries)
          });
        }

        // 4. Overwrite Skills
        await fetch(`${SUPABASE_URL}/rest/v1/skill_categories?id=not.is.null`, { method: 'DELETE', headers: supabaseHeaders });
        if (data.skillCategories.length > 0) {
          await fetch(`${SUPABASE_URL}/rest/v1/skill_categories`, {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify(data.skillCategories)
          });
        }

        // 5. Overwrite Certificates
        await fetch(`${SUPABASE_URL}/rest/v1/certificates?id=not.is.null`, { method: 'DELETE', headers: supabaseHeaders });
        if (data.certificates.length > 0) {
          const certsDb = data.certificates.map(mapCertificateApiToDb);
          await fetch(`${SUPABASE_URL}/rest/v1/certificates`, {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify(certsDb)
          });
        }
        console.log('Direct Supabase sync complete');
      };

      syncWithSupabase();
    } catch (e) {
      console.error('Failed to save to localStorage or sync to Supabase', e);
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
