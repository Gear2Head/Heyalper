import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Kadir Alper Şener',
    title: 'AI Developer & Community Leader',
    targetUniversity: 'KAIST / Seoul National University',
    targetMajor: 'Computer Science & Artificial Intelligence',
    bio: 'Highly motivated AI prompt engineer and community operations specialist. Proficient in SQL querying, advanced AI development workflows (Claude, Codex, Gemini), and leading systems for 297,800+ users.',
    longBio: 'I act as Senior Operations Lead across major community ecosystems managing over 297,800+ total members (Adalances Main: 228.4k, Lutheus: 918). I specialize in SQL database systems and AI developer tools (Claude, Codex, Gemini) to build automated moderation systems, KPI tools, and analytics dashboards like Lutheus Manage AI.',
    email: 'senerkadiralper@gmail.com',
    location: 'Kırşehir, Turkey',
    avatarUrl: 'https://github.com/Gear2Head.png',
    resumeUrl: '/cv.pdf',
    githubUrl: 'https://github.com/Gear2Head',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://www.instagram.com/gear2head/',
    gpa: 'OBP: 94.4/100',
    satScore: 'IELTS: 7.0 (C1)',
    graduationYear: '2026',
    akaName: 'Gear_Head',
    highlights: [
      { label: 'GPA (OBP)', value: '94.4/100', subtext: 'Top 5% Graduate' },
      { label: 'IELTS Academic', value: '7.0 (C1)', subtext: 'Advanced English' },
      { label: 'Community Scale', value: '297.8k+', subtext: 'Across Managed Servers' },
      { label: 'AI Specialization', value: 'Expert', subtext: 'Claude • Codex • Gemini' }
    ]
  },
  projects: [
    {
      id: 'lutheus-manage',
      title: 'Lutheus Manage AI Dashboard',
      subtitle: 'AI-Powered Discord Management Panel & Automated Moderation Systems',
      category: 'AI Operations & SQL Systems',
      description: 'An AI-powered Discord management panel integrating Claude API, Codex, and PostgreSQL. Features real-time moderator KPIs, automated ban processing, and performance tracking for 918+ community members.',
      fullDetails: 'Lutheus Manage AI Dashboard is a premium community operations platform designed to optimize moderation workflows through AI automation.\n\n1. Prompt Engineering for Moderation:\n- Utilizes custom Claude system prompts to audit messages for policy violations in context.\n- Automates severity levels (low/medium/high/critical) and logs corresponding moderator actions.\n\n2. Natural Language to SQL:\n- Built a query assistant converting natural language questions (e.g., "Find moderators with >100 cases") into raw PostgreSQL queries.\n\n3. Real-time KPI Tracking:\n- Computes performance scores, moderation speeds, and resolution metrics automatically.',
      imageUrl: '/lutheus_dashboard.png',
      tags: ['Claude API', 'PostgreSQL', 'AI Automation', 'React', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/Gear2Head/lutheus',
      liveUrl: 'https://lutheus.vercel.app/',
      wikiUrl: 'https://wiki.lutheus.com/',
      manageUrl: 'https://lutheus.vercel.app/',
      discordUrl: 'https://discord.gg/lutheus',
      featured: true,
      date: '2025 - 2026',
      metrics: '918 Members • wiki.lutheus.com'
    },
    {
      id: 'adalances-community',
      title: 'Adalances Community & Operations',
      subtitle: 'Operations, Wiki Mimarisi & Senior Staff Leadership for 228.4k+ Members',
      category: 'Operations & Community',
      description: 'Senior management, wiki configuration (wiki.adalances.com), moderator recruitment, handbook authoring, and crisis response for one of Turkey\'s largest gaming communities.',
      fullDetails: 'Adalances is a massive gaming ecosystem hosting 228,400+ Discord members. In this role, I served as Operations Lead:\n\n1. Wiki & Information Architecture:\n- Authored the rules, guides, and manuals at wiki.adalances.com.\n\n2. Staff Recruitment & Interviews:\n- Designed applicant screening systems and conducted voice interviews for hundreds of moderator candidates.\n\n3. Crisis Management:\n- Managed real-time safety during high-concurrency peak traffic (up to 15,934 concurrent users).',
      imageUrl: '/adalances_discord.png',
      tags: ['Community Management', 'wiki.adalances.com', 'Staff Handbook', 'Recruitment', 'Crisis Response'],
      liveUrl: 'https://adalances.com/',
      wikiUrl: 'https://wiki.adalances.com/',
      discordUrl: 'https://discord.gg/adal',
      discordSubUrl: 'https://discord.gg/4zwE6YdRQp',
      featured: true,
      date: '2024 - 2026',
      metrics: '228.4k+ Members • wiki.adalances.com'
    },
    {
      id: 'kirged-open-source',
      title: 'Kirged.org Accessibility Initiative',
      subtitle: 'Web Accessibility & Social Responsibility for Vision-Impaired Communities',
      category: 'Social Responsibility & Web Accessibility',
      description: 'Voluntary development and tech integration for kirged.org, focusing on WCAG 2.1 AA web accessibility guidelines for vision-impaired users.',
      fullDetails: 'Kirged.org is a non-governmental organization focused on environmental literacy and social responsibility. For this initiative:\n\n1. Web Accessibility:\n- Implemented semantic HTML, ARIA landmarks, keyboard focus management, and screen-reader optimizations complying with WCAG 2.1 AA standards.\n\n2. AI Workflow Automation:\n- Built automated pipelines using Gemini API and Codex to summarize environmental articles and generate accessible alt text for image uploads.',
      imageUrl: 'https://kirged.org/logo.png',
      tags: ['Web Accessibility', 'WCAG 2.1 AA', 'Volunteerism', 'Semantic HTML', 'AI Workflows'],
      githubUrl: 'https://github.com/Gear2Head/Kirged.org',
      liveUrl: 'https://kirged.org/',
      featured: true,
      date: '2026',
      metrics: 'Social Responsibility • kirged.org'
    }
  ],
  academicEntries: [
    {
      id: 'lise-obp',
      type: 'education',
      title: 'High School Graduation',
      institution: 'Secondary Education Institution',
      location: 'Turkey',
      period: '2022 - 2026',
      description: 'Completed secondary education with a diploma success score (OBP) of 94.4/100, ranking in the top 5% of graduates while leading 297k+ scale community systems.',
      achievements: [
        'Diploma GPA: 94.4 / 100',
        'Academic focus: Mathematics and Science (YKS Sayısal 220k rank)'
      ],
      featured: true,
      badge: 'GPA: 94.4/100'
    },
    {
      id: 'ielts-cert',
      type: 'education',
      title: 'IELTS Academic C1 Certification',
      institution: 'IDP IELTS / British Council',
      location: 'International Exam Centre',
      period: '2025',
      description: 'Achieved an overall band score of 7.0 (C1 Proficient) on the IELTS Academic test, demonstrating fluent, high-level academic communication.',
      achievements: [
        'Listening: 8.0 | Reading: 7.5 | Speaking: 7.0 | Writing: 6.5',
        'C1 Advanced Level Verification'
      ],
      featured: true,
      badge: 'IELTS 7.0 (C1)'
    },
    {
      id: 'etwinning-award',
      type: 'award',
      title: 'eTwinning Pupil Quality Label',
      institution: 'European School Education Platform',
      location: 'European Union / Turkey Support Organisation',
      period: 'Oct 2024',
      description: 'Awarded the European School Education Platform Quality Label for excellent environmental and digital collaboration in the project "From Self-Esteem to Happiness, with Love for the Environment".',
      achievements: [
        'Official ESEP Platform Recognition Certificate',
        'Collaborative digital content creation and eSafety participation'
      ],
      featured: true,
      badge: 'ESEP eTwinning Award'
    },
    {
      id: 'codeweek-cert',
      type: 'award',
      title: 'EU Code Week Certificate of Participation',
      institution: 'European Commission',
      location: 'European Union',
      period: 'Oct 2024',
      description: 'Participation in EU Code Week 2024 coding events focusing on basic software engineering, algorithmic logic, and green technological concepts.',
      achievements: [
        'European Commission Certified Recognition',
        'Contributed to "Green World Green Literature" programming track'
      ],
      featured: true,
      badge: 'EU Code Week 2024'
    }
  ],
  skillCategories: [
    {
      id: 'cat-ai-sql',
      name: 'AI & Prompting',
      skills: [
        { name: 'Claude Prompt Engineering', level: 98, badge: 'Expert' },
        { name: 'LLM Workflows (Codex)', level: 96, badge: 'Automation' },
        { name: 'Gemini API Integration', level: 94, badge: 'Integration' }
      ]
    },
    {
      id: 'cat-full-stack',
      name: 'Full-Stack Development',
      skills: [
        { name: 'React + TypeScript', level: 92, badge: 'Frontend' },
        { name: 'Node.js Backend', level: 90, badge: 'Backend' },
        { name: 'PostgreSQL', level: 92, badge: 'Database' }
      ]
    },
    {
      id: 'cat-operations',
      name: 'Community Operations',
      skills: [
        { name: 'Discord Architecture', level: 96, badge: 'Structures' },
        { name: 'Moderator Training', level: 95, badge: 'Leadership' },
        { name: 'Crisis Management', level: 98, badge: '297.8k Scale' }
      ]
    },
    {
      id: 'cat-misc',
      name: 'Tools & Languages',
      skills: [
        { name: 'Git & GitHub', level: 94, badge: 'Version Control' },
        { name: 'DevOps & Vercel', level: 88, badge: 'Deployment' },
        { name: 'Turkish (Native) / English (C1)', level: 95, badge: 'Bilingual' }
      ]
    }
  ],
  certificates: [
    {
      id: 'cert-etwinning',
      title: 'eTwinning Pupil Quality Label Award',
      issuer: 'European School Education Platform',
      date: 'Oct 2024',
      credentialUrl: '#',
      code: 'eTwinning-2024-KAS'
    },
    {
      id: 'cert-codeweek',
      title: 'EU Code Week Participation Certificate',
      issuer: 'European Commission',
      date: 'Oct 2024',
      credentialUrl: '#',
      code: 'EU-CODEWEEK-2024'
    },
    {
      id: 'cert-ielts',
      title: 'IELTS Academic C1 Certificate (7.0 Score)',
      issuer: 'British Council / IDP',
      date: '2025',
      credentialUrl: '#',
      code: 'IELTS-7.0-C1'
    }
  ],
  internationalProjects: [
    {
      id: 'etwinning-quality-label',
      title: 'From Self-Esteem to Happiness, with Love for the Environment: A Roadmap for a Better World',
      originalTitle: 'From Self-Esteem to Happiness, with Love for the Environment: A Roadmap for a Better World',
      programme: 'eTwinning',
      organization: 'European School Education Platform / Türkiye Support Organisation',
      date: '13.10.2024',
      certificateTitle: 'eTwinning Pupil Quality Label',
      signatory: 'Mustafa Canlı',
      recipientName: 'Kadir Alper ŞENER',
      description: 'Collaborative European school project focusing on digital literacy, eSafety, environmental awareness, and emotional health, rewarded with the Pupil Quality Label for outstanding engagement.',
      achievements: [
        'Official ESEP Platform Quality Label Award',
        'Collaborative digital literacy & eSafety activities',
        'Cross-border communication with European partner schools'
      ],
      badge: 'eTwinning Quality Label',
      badgeColor: 'amber',
      certificateType: 'etwinning'
    },
    {
      id: 'eu-code-week-2024',
      title: 'Green World Green Literature',
      originalTitle: 'Green World Green Literature',
      programme: 'EU Code Week 2024',
      organization: 'European Commission',
      date: '23.10.2024',
      certificateTitle: 'EU Code Week Participation Certificate',
      signatory: 'European Commission',
      recipientName: 'A Kadir Ş',
      description: 'Ab Code Week activity involving basic programming logic, environmental sustainability theme integration, and algorithmic problem-solving tasks.',
      achievements: [
        'Official European Commission Participation Certificate',
        'Algorithmic flow charting and coding exercises',
        'Collaborative digital technology literacy development'
      ],
      badge: 'EU Code Week 2024',
      badgeColor: 'blue',
      certificateType: 'codeweek'
    }
  ],
  theme: {
    borderRadius: '2xl',
    accentColor: 'blue',
    glassBlur: true,
    reducedMotion: false,
    fontStyle: 'sans',
    darkMode: true
  }
};
