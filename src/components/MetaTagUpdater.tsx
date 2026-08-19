import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const MetaTagUpdater: React.FC = () => {
  const { data, activeSection, setActiveSection, language, t } = usePortfolio();

  // IntersectionObserver to observe sections and update activeSection state
  useEffect(() => {
    const sectionIds = [
      'hero',
      'gks',
      'motivation',
      'impact',
      'projects',
      'academic',
      'international',
      'documents',
      'skills',
      'certificates',
      'contact'
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.25, 0.5, 0.75]
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);

  // Dynamically update document title and meta description tags based on activeSection & language
  useEffect(() => {
    const name = data.profile.fullName || 'Kadir Alper Şener';
    const role = data.profile.title || 'AI Enthusiast & Community Operations Specialist';

    let sectionTitle = '';
    let sectionDescription = '';

    switch (activeSection) {
      case 'hero':
        sectionTitle = t(
          `${name} | Portfolyo & Başvuru Profili`,
          `${name} | Portfolio & Candidate Profile`
        );
        sectionDescription = t(
          `${name} - ${role}. 298.000+ üyeli topluluk yönetimi, Lutheus Manage AI paneli, wiki.adalances.com ve wiki.lutheus.com bilgi bankası dokümantasyon uzmanı.`,
          `${name} - ${role}. Operations lead for 298k+ member Discord communities, architect of Lutheus Manage AI, and author of wiki documentation.`
        );
        break;

      case 'gks':
        sectionTitle = t(
          `GKS Profili & Başarı Metrikleri | ${name}`,
          `GKS Profile & Academic Metrics | ${name}`
        );
        sectionDescription = t(
          `Genel OBP (94.4/100), IELTS C1 dil yeterliliği, 228k+ üyeli Adalances sunucu moderasyonu ve AI operasyon yetkinlikleri özeti.`,
          `High school GPA (94.4/100), IELTS C1 language certification, 228k+ community lead, and AI automation highlights.`
        );
        break;

      case 'motivation':
        sectionTitle = t(
          `Akademik Motivasyon & Vizyon | ${name}`,
          `Academic Motivation & Vision | ${name}`
        );
        sectionDescription = t(
          `Neden Yapay Zeka? Neden Kore? sorularına cevaplar ve Kore devlet bursu başvuru motivasyonu.`,
          `Why AI? Why Korea? Answers to GKS application motivations and vision.`
        );
        break;

      case 'impact':
        sectionTitle = t(
          `Topluluk Etki Metrikleri | ${name}`,
          `Community Scale & Impact | ${name}`
        );
        sectionDescription = t(
          `297.800+ toplam üye, 15.934+ anlık aktif kullanıcı, %90.8 otomasyon ve canlı moderasyon KPI verileri.`,
          `Over 297,800 members, 15,934+ concurrent active online users, and %90.8 automated moderation metric analytics.`
        );
        break;

      case 'projects':
        sectionTitle = t(
          `Önemli Projeler & Sistem Mimarı | ${name}`,
          `Featured Projects & Systems | ${name}`
        );
        sectionDescription = t(
          `Adalances Community, Lutheus Manage AI Dashboard, wiki.adalances.com, wiki.lutheus.com ve Kirged açık kaynak yazılımları.`,
          `Explore Adalances, Lutheus Manage AI Dashboard, wiki.adalances.com, wiki.lutheus.com, and Kirged open source tools.`
        );
        break;

      case 'academic':
        sectionTitle = t(
          `Akademik Geçmiş & Dereceler | ${name}`,
          `Academic History & Honors | ${name}`
        );
        sectionDescription = t(
          `Lise akademik başarı geçmişi, 94.4 OBP, eTwinning Pupil Quality Label (Kalite Etiketi) ve Bilgisayar Mühendisliği hedefi.`,
          `High school academic honors, 94.4 GPA, eTwinning Pupil Quality Label, and Computer Science aspirations.`
        );
        break;

      case 'international':
        sectionTitle = t(
          `Uluslararası Projeler & Erasmus+ | ${name}`,
          `International Projects & Erasmus+ | ${name}`
        );
        sectionDescription = t(
          `Erasmus+ EU Code Week sertifikaları, Avrupa topluluk projeleri ve uluslararası açık kaynak yazılım katkıları.`,
          `Erasmus+ EU Code Week certificates, European collaborative projects, and global open source contributions.`
        );
        break;

      case 'ai-lab':
        sectionTitle = t(
          `Yapay Zeka & SQL Laboratuvarı | ${name}`,
          `AI Operations & SQL Lab | ${name}`
        );
        sectionDescription = t(
          `Claude, Codex ve Gemini Pro modelleri ile canlı Prompt simülasyonu, SQL sorgu analizleri ve otomasyon paneli.`,
          `Interactive prompt testing with Claude, Codex, and Gemini Pro models alongside live SQL query performance analysis.`
        );
        break;

      case 'documents':
        sectionTitle = t(
          `Doğrulanmış Belgeler & Kanıtlar | ${name}`,
          `Verified Credentials & Records | ${name}`
        );
        sectionDescription = t(
          `eTwinning Kalite Etiketi, IELTS C1 sertifikası, wiki.adalances.com ve wiki.lutheus.com resmi dokümantasyon kanıtları.`,
          `Verified eTwinning Pupil Quality Label, IELTS C1 official score, wiki documentation proofs, and community records.`
        );
        break;

      case 'skills':
        sectionTitle = t(
          `Yetenekler & Yetkinlik Mimarisi | ${name}`,
          `Skills & Technical Architecture | ${name}`
        );
        sectionDescription = t(
          `SQL Veritabanı, AI Prompt Engineering, Yetkili Mülakat Yönetimi, Discord Moderasyon Kitapçığı ve Sistem Otomasyonu.`,
          `SQL Database Querying, AI Prompt Engineering, Moderator Interview Management, Handbook Design, and System Automation.`
        );
        break;

      case 'certificates':
        sectionTitle = t(
          `Sertifikalar & Ödüller | ${name}`,
          `Certificates & Distinction | ${name}`
        );
        sectionDescription = t(
          `Avrupa Komisyonu eTwinning sertifikası, EU Code Week, IELTS Academic C1 ve resmi yetkinlik belgeleri.`,
          `European Commission eTwinning Pupil Quality Label, EU Code Week, IELTS Academic C1, and official honors.`
        );
        break;

      case 'contact':
        sectionTitle = t(
          `İletişim & Sosyal Medya | ${name}`,
          `Contact & Social Links | ${name}`
        );
        sectionDescription = t(
          `${name} ile doğrudan iletişim: senerkadiralper@gmail.com, Instagram @gear2head, GitHub ve LinkedIn.`,
          `Get in touch with ${name}: senerkadiralper@gmail.com, Instagram @gear2head, GitHub, and LinkedIn.`
        );
        break;

      default:
        sectionTitle = `${name} | Portfolio`;
        sectionDescription = `${name} - ${role}`;
        break;
    }

    // Update Document Title
    document.title = sectionTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMetaTag('meta[name="description"]', 'name', 'description', sectionDescription);
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', sectionTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', sectionDescription);
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', sectionTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', sectionDescription);
  }, [activeSection, language, data.profile.fullName, data.profile.title, t]);

  return null;
};
