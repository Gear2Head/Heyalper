export interface Profile {
  fullName: string;
  title: string;
  targetUniversity: string;
  targetMajor: string;
  bio: string;
  longBio: string;
  email: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  gpa: string;
  satScore: string;
  graduationYear: string;
  akaName?: string;
  highlights: {
    label: string;
    value: string;
    subtext?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDetails?: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  wikiUrl?: string;
  manageUrl?: string;
  discordUrl?: string;
  discordSubUrl?: string;
  featured: boolean;
  date: string;
  metrics?: string; // e.g., "10k+ Downloads", "%98 Doğruluk"
  archived?: boolean;
}

export interface AcademicEntry {
  id: string;
  type: 'education' | 'research' | 'award' | 'extracurricular';
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
  featured?: boolean;
  badge?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    iconName?: string;
    badge?: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  code?: string;
}

export interface InternationalProject {
  id: string;
  title: string;
  originalTitle: string;
  programme: 'eTwinning' | 'EU Code Week' | 'Erasmus+' | string;
  organization: string;
  date: string;
  certificateTitle: string;
  signatory?: string;
  recipientName: string;
  description: string;
  achievements: string[];
  badge: string;
  badgeColor?: string;
  certificateType: 'etwinning' | 'codeweek' | 'generic';
  imageUrl?: string;
}

export interface ThemeSettings {
  borderRadius: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'; // Apple curves
  accentColor: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate';
  glassBlur: boolean;
  reducedMotion: boolean;
  fontStyle: 'sans' | 'serif' | 'mono';
  darkMode: boolean;
  isThemeLocked?: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  academicEntries: AcademicEntry[];
  skillCategories: SkillCategory[];
  certificates: Certificate[];
  internationalProjects?: InternationalProject[];
  theme: ThemeSettings;
}
