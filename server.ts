import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Statement Enhancer Route for University Application & Portfolio Content
  app.post('/api/ai/enhance-text', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY environment variable is missing.'
        });
      }

      const { prompt, contextType, targetUniversity } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Sen dünya çapında prestijli üniversitelerin (İTÜ, Boğaziçi, MIT, ETH Zürich vb.) kabul komitelerini etkileyebilecek düzeyde profesyonel bir akademik ve yazılım kariyer danışmanısın.
Kullanıcının girdiği metni orijinal yapısını bozmadan, gereksiz AI kalıplarından (örneğin 'I am excited to announce', 'supercharge', 'revolutionary' vb. basma kalıp laflardan) arındırarak; net, somut başarılara dayalı, özgün, mühendislik disiplinine yakışır ve Apple tarzı minimalist ve etkileyici bir dille yeniden yaz.
Kullanıcının hedef üniversitesi: ${targetUniversity || 'Prestijli Üniversiteler'}.
İçerik türü: ${contextType || 'Proje/Biyografi açıklaması'}.
Lütfen doğrudan geliştirilmiş Türkçe metni döndür (ekstra selamlama veya açıklama ekleme, doğrudan kullanıcının formu dolduracağı metin olsun).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\nKullanıcının Taslak Metni:\n${prompt}`
      });

      const enhancedText = response.text || prompt;
      res.json({ success: true, enhancedText });
    } catch (error: any) {
      console.error('Gemini API error:', error);
      res.status(500).json({
        error: error.message || 'AI metin geliştirme esnasında bir hata oluştu.'
      });
    }
  });

  // Helper mapping functions between Supabase snake_case schema and Frontend camelCase model
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

  // GET Endpoint to fetch portfolio database status
  app.get('/api/portfolio', async (req, res) => {
    try {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_KEY;
      if (!url || !key) {
        return res.status(500).json({ error: 'Supabase environment variables are missing.' });
      }

      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      };

      // Fetch all tables
      const [profileRes, projectsRes, academicRes, skillsRes, certsRes] = await Promise.all([
        fetch(`${url}/rest/v1/profile?select=*`, { headers }).then(r => r.json()),
        fetch(`${url}/rest/v1/projects?select=*`, { headers }).then(r => r.json()),
        fetch(`${url}/rest/v1/academic_entries?select=*`, { headers }).then(r => r.json()),
        fetch(`${url}/rest/v1/skill_categories?select=*`, { headers }).then(r => r.json()),
        fetch(`${url}/rest/v1/certificates?select=*`, { headers }).then(r => r.json())
      ]);

      // If database is empty, return default empty structure to allow initial push
      const profile = profileRes && profileRes.length > 0 ? mapProfileDbToApi(profileRes[0]) : null;
      const projects = Array.isArray(projectsRes) ? projectsRes.map(mapProjectDbToApi) : [];
      const academicEntries = Array.isArray(academicRes) ? academicRes : [];
      const skillCategories = Array.isArray(skillsRes) ? skillsRes : [];
      const certificates = Array.isArray(certsRes) ? certsRes.map(mapCertificateDbToApi) : [];

      res.json({
        success: true,
        data: {
          profile,
          projects,
          academicEntries,
          skillCategories,
          certificates
        }
      });
    } catch (e: any) {
      console.error('Failed to get portfolio from Supabase:', e);
      res.status(500).json({ error: e.message || 'Supabase read error' });
    }
  });

  // POST Endpoint to overwrite/backup database state
  app.post('/api/portfolio', async (req, res) => {
    try {
      // Validate administrative passcode from request header to secure database against leakage/writes
      const adminPasscode = req.headers['x-admin-passcode'];
      const expectedPasscode = process.env.ADMIN_PASSCODE || 'sener123';
      if (adminPasscode !== expectedPasscode) {
        return res.status(401).json({ error: 'Yetkisiz erişim. Veri yazma izniniz bulunmuyor.' });
      }

      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_KEY;
      if (!url || !key) {
        return res.status(500).json({ error: 'Supabase environment variables are missing.' });
      }

      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      };

      const payload = req.body;
      if (!payload || !payload.profile) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      // 1. Sync Profile (Upsert row id 1)
      const profileDb = mapProfileApiToDb(payload.profile);
      await fetch(`${url}/rest/v1/profile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(profileDb)
      });

      // 2. Overwrite Projects
      await fetch(`${url}/rest/v1/projects?id=not.is.null`, { method: 'DELETE', headers });
      if (Array.isArray(payload.projects) && payload.projects.length > 0) {
        const projectsDb = payload.projects.map(mapProjectApiToDb);
        await fetch(`${url}/rest/v1/projects`, {
          method: 'POST',
          headers,
          body: JSON.stringify(projectsDb)
        });
      }

      // 3. Overwrite Academic Entries
      await fetch(`${url}/rest/v1/academic_entries?id=not.is.null`, { method: 'DELETE', headers });
      if (Array.isArray(payload.academicEntries) && payload.academicEntries.length > 0) {
        await fetch(`${url}/rest/v1/academic_entries`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload.academicEntries)
        });
      }

      // 4. Overwrite Skills
      await fetch(`${url}/rest/v1/skill_categories?id=not.is.null`, { method: 'DELETE', headers });
      if (Array.isArray(payload.skillCategories) && payload.skillCategories.length > 0) {
        await fetch(`${url}/rest/v1/skill_categories`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload.skillCategories)
        });
      }

      // 5. Overwrite Certificates
      await fetch(`${url}/rest/v1/certificates?id=not.is.null`, { method: 'DELETE', headers });
      if (Array.isArray(payload.certificates) && payload.certificates.length > 0) {
        const certsDb = payload.certificates.map(mapCertificateApiToDb);
        await fetch(`${url}/rest/v1/certificates`, {
          method: 'POST',
          headers,
          body: JSON.stringify(certsDb)
        });
      }

      res.json({ success: true, message: 'Sync complete' });
    } catch (e: any) {
      console.error('Failed to sync with Supabase:', e);
      res.status(500).json({ error: e.message || 'Supabase write error' });
    }
  });

  // Admin login API endpoint (checks server-side credentials only)
  app.post('/api/admin/login', (req, res) => {
    const { email, passcode } = req.body;
    const correctEmail = process.env.ADMIN_EMAIL || 'senerkadiralper@gmail.com';
    const correctPasscode = process.env.ADMIN_PASSCODE || 'sener123';

    if (email?.trim().toLowerCase() === correctEmail.trim().toLowerCase() && passcode === correctPasscode) {
      return res.json({ success: true });
    }
    res.status(401).json({ success: false, error: 'Yetkisiz erişim. Geçersiz e-posta veya şifre.' });
  });

  // Vite middleware in dev, static serving in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
