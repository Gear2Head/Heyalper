import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Kadir Alper Şener',
    title: 'AI Enthusiast & Community Operations Specialist',
    targetUniversity: '',
    targetMajor: 'Bilgisayar Mühendisliği & Yapay Zeka',
    bio: 'Yazılım dünyasına yüksek merak duyan; SQL veritabanı sorgulamalarına hakim, Claude, OpenAI Codex ve Gemini gibi ileri seviye AI geliştirme araçlarını profesyonel seviyede kullanan ve 297.800+ üyeli toplulukları yöneten operasyon uzmanı.',
    longBio: 'Adalances (296.800+ üye, https://adalances.com/) ve Lutheus (https://lutheus.com/) topluluklarında Kıdemli Moderatör ve Operasyon Lideri olarak görev yapıyorum. wiki.adalances.com ve wiki.lutheus.com bilgi bankası içeriklerinin hazırlanması, yetkili aday başvuru formlarının taranması, mülakatların gerçekleştirilmesi ve yetkililere özel "Yetkili Kitapçığı" rehberlerinin kaleme alınması süreçlerini yönetiyorum. Aynı zamanda Lutheus Manage AI otomasyon panelinin mimarıyım.',
    email: 'senerkadiralper@gmail.com',
    location: 'Türkiye',
    avatarUrl: 'https://github.com/Gear2Head.png',
    resumeUrl: '#',
    githubUrl: 'https://github.com/Gear2Head',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://www.instagram.com/gear2head/',
    gpa: 'OBP: 94.4',
    satScore: 'IELTS: 7.0 (C1)',
    graduationYear: '2026',
    akaName: 'Gear_Head',
    highlights: [
      { label: 'OBP', value: '94.4', subtext: 'Lise Başarı Puanı' },
      { label: 'IELTS', value: '7.0 (C1)', subtext: 'İleri Seviye İngilizce' },
      { label: 'Topluluk', value: '297.8k+', subtext: '3 Sunucuda Toplam Üye' },
      { label: 'AI Araçları', value: 'Uzman', subtext: 'Claude • Codex • Gemini' }
    ]
  },
  projects: [
    {
      id: 'adalances-community',
      title: 'Adalances Community, Wiki & Operations',
      subtitle: '296.800+ Üyeli Adalances Ekosistemi, Wiki (wiki.adalances.com) & Yetkili Mimarisi',
      category: 'Operations & Community',
      description: 'Doğukan Adal liderliğindeki 296.800+ üyeli Türkiye\'nin devasa Minecraft ve Discord topluluğunda kıdemli operasyon yönetimi, wiki.adalances.com içerik mimarisi, yetkili başvuru formlarının taranması, canlı aday mülakatları ve yetkili kitapçığı yazarlığı.',
      fullDetails: 'Adalances (https://adalances.com/), 296.800\'den fazla aktif Discord üyesine ve binlerce anlık oyuncuya ev sahipliği yapan Türkiye\'nin lider topluluk ekosistemidir. Bu devasa operasyonda üstlendiğim temel sorumluluklar ve katkılar:\n\n1. Wiki & Bilgi Mimarisi (https://wiki.adalances.com/):\n- Sunucu kural maddeleri, oyun içi ceza sistemleri, kural ihlal ayrımları ve teyit kılavuzlarının eksiksiz kaleme alınması.\n- Oyuncular ve yetkililer için wiki.adalances.com üzerindeki tüm oryantasyon ve bilgi bankası sayfalarının doldurulması.\n\n2. Form İnceleme & Canlı Aday Mülakatları:\n- Google Forms ve Discord yetkili alım formları üzerinden gelen yüzlerce yetkili adayının başvurusunun taranması ve değerlendirilmesi.\n- Uygun görülen adaylarla birebir sesli mülakatların (kural bilgisi, kriz yönetimi ve iletişim becerisi değerlendirmesi) gerçekleştirilmesi.\n\n3. Adalances Yetkili Kitapçığı (Handbook):\n- Yeni katılan moderatör kadrosunun uymak zorunda olduğu kurallar, ceza kanıtı saklama protokolleri, yetkili hiyerarşisi ve kriz müdahale rehberini içeren "Yetkili Kitapçığı" dokümanının hazırlanması.\n\n4. Anlık Kriz & Moderasyon Operasyonları:\n- Anlık 15.000+ aktif kullanıcının sohbet, ses ve topluluk düzeninin sağlanması, üst düzey anlaşmazlık çözümleri.',
      imageUrl: '/adalances_discord.png',
      tags: ['Adalances.com', 'wiki.adalances.com', 'Yetkili Kitapçığı', 'Mülakat Yönetimi', 'Discord Moderasyon', 'Form Taraması'],
      liveUrl: 'https://adalances.com/',
      wikiUrl: 'https://wiki.adalances.com/',
      manageUrl: 'https://manage.adalances.com/',
      discordUrl: 'https://discord.gg/adal',
      discordSubUrl: 'https://discord.gg/4zwE6YdRQp',
      featured: true,
      date: '2024 - 2026',
      metrics: '296.8k+ Üye • wiki.adalances.com'
    },
    {
      id: 'lutheus-manage',
      title: 'Lutheus Gaming, Wiki & Manage AI',
      subtitle: '918+ Üyeli Lutheus Topluluk Sunucusu (lutheus.com), Manage AI Dashboard & Moderasyon Kitapçığı',
      category: 'AI Operations & SQL Systems',
      description: 'Lutheus (https://lutheus.com/) ekosistemi için geliştirilen Claude, Codex, Gemini AI ve PostgreSQL destekli Discord Manage otomasyon paneli (https://lutheus.vercel.app/), wiki (https://wiki.lutheus.com/) bilgi bankası ve Notion tabanlı "Lutheus Discord Moderasyon Kitapçığı".',
      fullDetails: 'Lutheus (https://lutheus.com/) oyun ve topluluk altyapısı için geliştirilen kapsamlı yönetim ve otomasyon ekosistemidir. Proje bileşenleri:\n\n1. Lutheus Manage AI Dashboard:\n- AI Agent desteği ile canlı veri akışı, yetkili KPI ve performans puanlama tabloları.\n- Ceza işlem günlükleri, YSYM sınav/yerleştirme modülü ve bilet yönetim paneli.\n\n2. Lutheus Wiki (https://wiki.lutheus.com/):\n- Oyuncular ve topluluk üyeleri için rehberler, ceza ayrım kılavuzları, teyit sistemleri ve güncel oyun modları wiki içeriklerinin hazırlanması.\n\n3. Lutheus Discord Moderasyon Kitapçığı:\n- Notion üzerinde hazırlanan evrensel yetkili metni, hiyerarşi kuralları, puanlama sistemleri (Point Train), ceza kontrol protokolleri ve yetkili büro kullanım kılavuzu.\n\n4. Yetkili Seçme & Mülakat Operasyonu:\n- Lutheus yönetim ekibine yetkili alım formlarının taranması, canlı mülakatların gerçekleştirilmesi ve yetkili yerleştirme süreçleri.',
      imageUrl: '/lutheus_dashboard.png',
      tags: ['Lutheus.com', 'wiki.lutheus.com', 'Manage AI Dashboard', 'Claude & Codex AI', 'Moderasyon Kitapçığı', 'PostgreSQL'],
      githubUrl: 'https://github.com/gear2head/lutheus',
      liveUrl: 'https://lutheus.com/',
      wikiUrl: 'https://wiki.lutheus.com/',
      manageUrl: 'https://lutheus.vercel.app/',
      discordUrl: 'https://discord.gg/lutheus',
      discordSubUrl: 'https://discord.gg/s9QcZ2Vrh6',
      featured: true,
      date: '2025 - 2026',
      metrics: '918 Üye • wiki.lutheus.com'
    },
    {
      id: 'wikis-and-handbooks',
      title: 'Adalances & Lutheus Wiki ve Yetkili Kitapçığı Dokümantasyonu',
      subtitle: 'wiki.adalances.com, wiki.lutheus.com, Mülakat Sistemleri ve Kapsamlı Moderasyon Kitapçıkları',
      category: 'Documentation & Knowledge Base',
      description: 'https://wiki.adalances.com/ ve https://wiki.lutheus.com/ wiki sayfalarının içeriklerinin sıfırdan oluşturulması, yetkili başvuru formlarının değerlendirilmesi, canlı aday mülakatları ve yetkililere özel "Yetkili Kitapçığı" yazımı.',
      fullDetails: 'Topluluk yönetiminde kalite standartlarını yükseltmek amacıyla yürütülen kapsamlı dokümantasyon ve yetkili yönetimi çalışmaları:\n\n- Wiki İçerik Üretimi (wiki.adalances.com & wiki.lutheus.com):\n  Adalances ve Lutheus platformlarındaki tüm kural, ceza sistemleri, teyit kanalları ve oyuncu kılavuzlarının eksiksiz doldurulması ve güncel tutulması.\n\n- Yetkili Kitapçığı (Handbook) Yazımı:\n  Yetkililerin kesinlikle uyması gereken kurallar, hiyerarşi sistemi, ceza kanıt yükleme standartları, kriz yönetim adımları ve yetkili puanlama (Point Train) kurallarının el kitapçığı haline getirilmesi.\n\n- Başvuru İnceleme & Mülakat Operasyonları:\n  Google Forms ve Discord başvuru logları üzerinden gelen yetkili adaylarının formlarının filtrelenmesi, teknik/sosyal mülakatların yapılması ve yönetim kuruluna sunulması.',
      imageUrl: '/lutheus_discord.png',
      tags: ['wiki.adalances.com', 'wiki.lutheus.com', 'Yetkili Kitapçığı', 'Form Taraması', 'Aday Mülakatları', 'Notion Knowledge Base'],
      liveUrl: 'https://wiki.adalances.com/',
      featured: true,
      date: '2024 - 2026',
      metrics: '2 Wiki Platformu • Moderasyon Kitapçıkları • Aday Mülakatları'
    },
    {
      id: 'kirged-open-source',
      title: 'Kirged.org Sosyal Sorumluluk & AI Workflows',
      subtitle: 'Sivil Toplum ve Çevre Odaklı Yapay Zeka Destekli Otomasyon Sistemleri (kirged.org)',
      category: 'AI Tools & Automation',
      description: 'Gönüllü faaliyetler ve sivil toplum kuruluşu (KİRGED) için geliştirilen Claude, Codex ve Gemini ile üretilen yapay zeka otomasyon sistemleri, web entegrasyonları ve açık kaynak çalışmalar.',
      fullDetails: 'Bireysel ve ticari topluluklar için yapay zeka entegrasyonlu otomasyon araçları, SQL veritabanı filtreleme sistemleri ve Discord bot yapılandırmaları geliştiriyorum. KİRGED bünyesinde sivil toplum ve çevre projelerine teknolojik çözümler üretiyorum. GitHub üzerinde 19+ repo ve 430+ katkı ile açık kaynak topluluğuna aktif destek veriyorum.',
      imageUrl: 'https://kirged.org/logo.png',
      tags: ['Kirged.org', 'Claude Code', 'OpenAI Codex', 'Gemini API', 'SQL Scripting', 'AI Workflows', 'Automation'],
      githubUrl: 'https://github.com/Gear2Head/Kirged.org',
      liveUrl: 'https://kirged.org/',
      featured: true,
      date: '2026',
      metrics: 'Sosyal Sorumluluk • kirged.org'
    }
  ],
  academicEntries: [
    {
      id: 'ai-prompt-specialization',
      type: 'research',
      title: 'LLM & AI Developer Tools Specialization (Claude, Codex, Gemini)',
      institution: 'Anthropic Claude, OpenAI Codex & Gemini Developer Workflows',
      location: 'Türkiye / Uzaktan',
      period: '2025 - 2026',
      description: 'Yapay zeka sistemleri üzerinde gelişmiş prompt mimarisi (Prompt Engineering), bağlam (context) yönetimi ve kod oluşturma otomasyonu yetkinliği. Karmaşık yazılım süreçlerini AI geliştirici araçlarıyla optimize etme uzmanlığı.',
      achievements: [
        'Claude 3.7 Sonnet & Codex ile Otomatik Modüler Kod Yapılandırması',
        'PostgreSQL İlişkisel Veritabanı için Doğal Dil -> SQL Dönüştürme',
        'Lutheus Manage AI Dashboard Altyapı ve Prompt Mimarisi'
      ],
      featured: true,
      badge: 'AI Systems Specialist'
    },
    {
      id: 'community-leadership-adalances',
      type: 'extracurricular',
      title: 'Kıdemli Topluluk Operasyon Liderliği & Kriz Yönetimi',
      institution: 'Adalances Main (228k), Adalances Secondary (68.5k) & Lutheus (918)',
      location: '297.800+ Toplam Üye',
      period: '2024 - 2026',
      description: 'Türkiye\'nin önde gelen bağımsız Discord ekosistemlerinde 297.800+ toplam üyenin sohbet güvenliği, moderatör kadrosunun eğitimi, anlık 15.900+ peak online trafiğinin yönetimi ve kriz müdahale operasyonları.',
      achievements: [
        'Anlık 15.934 Peak Aktif Kullanıcı Trafiği Altında %99.8 Kesintisiz Düzen',
        'Moderatör Ekibi Performans Ölçümü & KPI Takip Mimarisi',
        'Süreç Biletleri & Anlaşmazlık Çözüm Protokolleri'
      ],
      featured: true,
      badge: '297.8k+ Member Operations'
    },
    {
      id: 'lutheus-manage-system',
      type: 'research',
      title: 'Lutheus Manage: SQL & AI Destekli Moderasyon Veri Paneli',
      institution: 'Lutheus Community Engineering',
      location: 'Açık Kaynak / Proje',
      period: '2026',
      description: 'Sunucu yetkililerinin ceza, kayıt ve başarı metriklerini PostgreSQL veritabanında saklayan, AI prompt analizi ile moderatör verimliliğini puanlayan özel yönetim altyapısı.',
      achievements: [
        '306+ AI Kayıtlı Ceza ve Performans Günlüğü Veri İşleme',
        '%90.8 Doğrulanmış Moderasyon İşlem Başarı Oranı',
        'Gelişmiş Filtreleme, SQL Veri Arama ve İstatistiksel Grafikler'
      ],
      featured: true,
      badge: 'SQL & AI Dashboard'
    },
    {
      id: 'etwinning-award',
      type: 'award',
      title: 'eTwinning Pupil Quality Label (Uluslararası Kalite Etiketi)',
      institution: 'European School Education Platform / National Support Organisation',
      location: 'Türkiye / Avrupa',
      period: '13.10.2024',
      description: '"From Self-Esteem to Happiness, with Love for the Environment: A Roadmap for a Better World" başlıklı uluslararası projede sergilenen başarı sebebiyle verilen resmi eTwinning Kalite Etiketi.',
      achievements: [
        'Avrupa Okul Eğitimi Platformu (ESEP) Resmi Sertifikası',
        'Uluslararası Çevre, Özsaygı ve Dijital İş Birliği Çalışması'
      ],
      featured: true,
      badge: 'eTwinning Quality Label'
    },
    {
      id: 'codeweek-cert',
      type: 'award',
      title: 'EU Code Week 2024 Certificate of Participation',
      institution: 'European Commission (Avrupa Komisyonu)',
      location: 'Avrupa Birliği',
      period: '23.10.2024',
      description: '"Green World Green Literature" kodlama etkinliğinde temel yazılım becerileri geliştirilerek AB Kod Haftası başarısına aktif katkı sağlama katılım ödülü.',
      achievements: [
        'Avrupa Komisyonu Resmi Katılım Sertifikası',
        'Yeşil Dünya & Kodlama Etkinliği Katkısı'
      ],
      featured: true,
      badge: 'EU Code Week 2024'
    },
    {
      id: 'ielts-cert',
      type: 'education',
      title: 'IELTS Academic C1 English Proficiency (7.0 Score)',
      institution: 'British Council / IDP IELTS',
      location: 'Uluslararası',
      period: '2025 - 2026',
      description: 'IELTS Academic sınavından 7.0 Overall Skor ile C1 düzeyinde akıcı ve akademik İngilizce yetkinliği.',
      achievements: [
        'Overall Band Score: 7.0 (C1 Proficient)',
        'Akademik Makale Okuma & Akıcı Sözlü İletişim'
      ],
      featured: true,
      badge: 'IELTS 7.0 (C1)'
    },
    {
      id: 'lise-obp',
      type: 'education',
      title: 'Lise Mezuniyet & Akademik Başarı (OBP: 94.4)',
      institution: 'Ortaöğretim Kurumu',
      location: 'Türkiye',
      period: '2022 - 2026',
      description: '94.4 / 100 Ortaöğretim Başarı Puanı (OBP). Kore Devlet Bursu (GKS) başvurusu için yüksek ders ortalaması.',
      achievements: [
        'Diploma Not Ortalaması (OBP): 94.4 / 100',
        'Yapay Zeka, Proje ve Topluluk Yönetim Başarıları'
      ],
      featured: true,
      badge: 'OBP 94.4 / 100'
    }
  ],
  skillCategories: [
    {
      id: 'cat-ai-sql',
      name: 'Yapay Zeka Araçları & SQL Veritabanı',
      skills: [
        { name: 'Claude, Codex & Gemini AI Tools', level: 98, badge: 'Uzman / Sertifikalı' },
        { name: 'SQL & Relational Querying (PostgreSQL)', level: 92, badge: 'Veri Analizi' },
        { name: 'AI Prompt Engineering & Workflows', level: 96, badge: 'Sistem Mimarisi' },
        { name: 'Yazılım Entegrasyonu & Scripting', level: 85, badge: 'Hobi & Entegrasyon' }
      ]
    },
    {
      id: 'cat-operations',
      name: 'Topluluk Operasyonları & Liderlik',
      skills: [
        { name: 'Kıdemli Moderasyon & Kriz Yönetimi', level: 98, badge: '297.8k+ Üye' },
        { name: 'Moderatör Eğitimi & KPI Metrikleri', level: 95, badge: 'Yönetim' },
        { name: 'Discord Server Architecture', level: 96, badge: 'Sunucu Mimarisi' },
        { name: 'Süreç & Bilet Yönetimi', level: 92, badge: 'SaaS Support' }
      ]
    }
  ],
  certificates: [
    {
      id: 'cert-etwinning',
      title: 'eTwinning Pupil Quality Label Award',
      issuer: 'European School Education Platform / National Support Organisation',
      date: '13 Ekim 2024',
      credentialUrl: '#',
      code: 'eTwinning-2024-KAS'
    },
    {
      id: 'cert-codeweek',
      title: 'EU Code Week 2024 Certificate',
      issuer: 'European Commission',
      date: '23 Ekim 2024',
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
      organization: 'European School Education Platform / National Support Organisation Türkiye',
      date: '13.10.2024',
      certificateTitle: 'eTwinning Pupil Quality Label',
      signatory: 'Mustafa Canlı - National Support Organisation Türkiye',
      recipientName: 'Kadir Alper ŞENER',
      description: 'Avrupa Birliği ESEP platformu bünyesinde gerçekleştirilen uluslararası eTwinning projesinde çevre sevgisi, özsaygı ve toplumsal farkındalık kazandıran dijital iş birliği çalışmaları yürütülmüş, üstün başarı sebebiyle Pupil Quality Label (Öğrenci Kalite Etiketi) ödülü kazanılmıştır.',
      achievements: [
        'European School Education Platform (ESEP) Onaylı Kalite Etiketi',
        'Uluslararası Takım Çalışması, Dijital İçerik Üretimi & eSafety',
        'Çevre Bilinci & Özsaygı Geliştirme Odaklı Öğrenci Projesi'
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
      organization: 'European Commission (Avrupa Komisyonu)',
      date: '23.10.2024',
      certificateTitle: 'EU CODE WEEK Certificate of Participation',
      signatory: 'European Commission',
      recipientName: 'A Kadir Ş',
      description: 'Avrupa Komisyonu tarafından düzenlenen AB Kod Haftası (EU Code Week 2024) kapsamında "Green World Green Literature" etkinliğine katılarak algoritmik düşünme, yazılım geliştirme ve çevre odaklı teknoloji çalışmasına aktif katkı sağlanmıştır.',
      achievements: [
        'Avrupa Komisyonu (European Commission) Resmi Katılım Sertifikası',
        'EU Code Week 2024 Yazılım & Algoritmik Kodlama Etkinliği',
        'Sürdürülebilir Teknoloji ve Dijital Okuryazarlık Katkısı'
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

