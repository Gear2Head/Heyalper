# 🚀 Anti-Gravity Mega Prompt - Portfolio Site Generator

## CONTEXT & IDENTITY

You are generating a **premium portfolio website** for **Kadir Alper Şener**, a high-school graduate applying for the **Global Korea Scholarship (GKS)** and positioning himself for international tech opportunities.

**Key Identity Points:**
- Age: 18 (will be 18 on Sept 5, 2026)
- Title: "Vibe Coder" - AI Prompt Engineer with 2+ years expertise
- Expertise: Full-stack web development via AI agents (Claude, Codex, Gemini)
- GitHub: https://github.com/Gear2Head (430+ contributions, 10+ active projects)
- Discord Leadership: 297.8k+ total community members across Adalances (228k) & Lutheus (918)
- Academic: OBP 94.4/100, IELTS 7.0 (C1), YKS Sayısal: 220k rank
- Motivation: AI specialization + Korean education + global tech career
- Live URL: https://heyalper.vercel.app/ → Domain: heyalper.me

---

## REQUIREMENTS MATRIX

| Requirement | Priority | Implementation |
|-------------|----------|-----------------|
| Motivasyon Section | 1️⃣ **CRITICAL** | Hero + "Why AI? Why Korea?" narrative |
| Impact Metrics | 2️⃣ **HIGH** | 297.8k users, 15.9k peak, 99.8% uptime, 3+ yrs leadership |
| CV + Referrals | 3️⃣ **HIGH** | Downloadable PDF + contact section |
| Lutheus Case Study | **BONUS** | Code snippets + Visual screenshots + Live demo link |
| Bilingual Support | **CRITICAL** | EN primary, TR toggle (top-right corner) |
| Context-Aware Cursor | **CRITICAL** | Normal/Pointer/Text/Grab/Discord/PDF/Video icons |
| Discord Embeds | **HIGH** | Static server cards (Adalances + Lutheus) with join buttons |
| Scroll Animations | **MEDIUM** | Stagger cards, fade-in sections, counter animations |
| Interactive Components | **CRITICAL** | All project cards → modal on click, skills → hover details |
| Static Discord Data | **CRITICAL** | NO API calls, hardcoded: Adalances (228.4k), Lutheus (918) |

---

## SECTION BREAKDOWN

### 1. NAVBAR (Bilingual Toggle + Navigation)

```typescript
Components needed:
- Logo (L icon - Lutheus inspired)
- Nav links: Home | Why AI? | Leadership | Projects | Academic | Contact
- Language Toggle: 🇬🇧 EN / 🇹🇷 TR (top-right)
- Scroll indicator (thin line)

Content structure:
EN: "Kadir Alper Şener - AI Developer & Community Leader"
TR: "Kadir Alper Şener - Yapay Zeka Geliştirici & Topluluk Lideri"
```

### 2. HERO SECTION (Motivasyon Priority #1)

```typescript
Hero structure:
┌─ Gradient background (Dark navy → Purple accent)
├─ Profile section:
│  ├─ GitHub avatar image: https://github.com/Gear2Head.png
│  ├─ Name: Kadir Alper Şener
│  └─ Tagline: "Vibe Coder | AI Enthusiast | Community Leader"
├─ Hero text (EN):
│  "I build AI-powered solutions that scale. 297,800+ users trust systems I've architected.
│   Now pursuing Computer Science in Korea to deepen AI expertise and impact globally."
├─ Hero text (TR):
│  "Yapay zeka ile ölçeklenen çözümler inşa ediyorum. 297.800+ kullanıcı tasarladığım sistemlere güveniyor.
│   Şimdi Kore'de Bilgisayar Mühendisliğini öğrenmek istiyorum, yapay zeka uzmanlığını derinleştirmek için."
└─ CTA: "Explore My Work" + GitHub link (external icon)

Animation: Fade-in + slide-up on load (Framer Motion)
```

### 3. GKS APPLICATION CARD (Impact Snapshot)

```typescript
Card structure:
┌─ Header: 📋 Global Korea Scholarship Profile
├─ Stats grid (2x2):
│  ├─ Academic: OBP 94.4 | IELTS 7.0 (C1)
│  ├─ Leadership: 297.8k+ Users | 3+ Years
│  ├─ Technical: AI/ML, Full-stack, SQL
│  └─ Global: eTwinning + EU Code Week
└─ "Download Application Summary" → PDF link

Color: Gradient with Korean flag accent (red/blue)
```

### 4. WHY AI? WHY KOREA? SECTION

```typescript
Content structure:

ENGLISH:
┌─ "Why Artificial Intelligence?"
├─ Paragraph 1:
│  "I've spent 2+ years mastering AI tools (Claude, Codex, Gemini).
│   Built automation systems serving 297,800+ Discord users.
│   Witnessed firsthand: AI solves real problems, scales impact.
│   But Türkiye lacks AI R&D infrastructure. Korea is the answer."
│
├─ "Why Korea?"
├─ Paragraph 2:
│  "Korea leads global AI innovation: KAIST, Seoul National University,
│   Samsung, LG, NAVER research labs. World's fastest internet.
│   1-year Korean language training + 4-year degree = positioned for
│   international AI careers."
│
└─ CTA: "View my Projects" → scroll to projects section

TURKISH: (Same structure, translated)

Animation: Stagger paragraphs on scroll (Framer Motion staggerContainer)
```

### 5. IMPACT METRICS SECTION (Priority #2)

```typescript
Grid structure (4 columns):

Metric 1: SCALE
┌─ 297.8k+
├─ Community Members Managed
└─ Across Adalances (228.4k) & Lutheus (918)
   Hover: Show breakdown → 3 years of consistent growth

Metric 2: PEAK LOAD
┌─ 15,934
├─ Concurrent Active Users
└─ Real-time management during peak hours
   Hover: "Never missed a beat - 99.8% uptime"

Metric 3: LEADERSHIP
┌─ 150+
├─ Moderators Trained & Managed
└─ Recruitment, performance evaluation, crisis response
   Hover: Show operational breakdown (forms, interviews, training)

Metric 4: INNOVATION
┌─ 10+
├─ GitHub Projects (Active)
└─ AI-powered automation, web solutions, social impact
   Hover: "430+ contributions, 2+ years AI expertise"

Animation: Counter animate (0 → final number) on scroll into view
Color: Accent colors (blue, teal, purple, amber)
```

### 6. PROJECTS SECTION (Lutheus Case Study - B+C+D)

```typescript
Project layout:

PROJECT 1: LUTHEUS MANAGE AI DASHBOARD
┌─ Visual card:
│  ├─ Thumbnail: /lutheus_dashboard.png (from uploads)
│  └─ On click: Expand full modal
│
├─ Card header:
│  ├─ Title: "Lutheus Manage AI Dashboard"
│  ├─ Date: "2025-2026"
│  └─ Tags: [Claude API] [PostgreSQL] [AI Automation]
│
├─ Card body:
│  └─ "AI-powered Discord management panel. Real-time moderator KPIs,
│      automated ban processing, performance tracking for 918+ community members."
│
└─ Interactive modal on click:
   ├─ Full project description
   ├─ Tech breakdown:
   │  ├─ Frontend: React + TypeScript + Tailwind
   │  ├─ Backend: Node.js + Express + PostgreSQL
   │  ├─ AI: Claude API for prompt engineering + Codex for code generation
   │  └─ Deployment: Vercel + Railway
   │
   ├─ CODE SHOWCASE (B):
   │  ├─ Example 1: "Prompt Engineering for Moderation"
   │  │  ```typescript
   │  │  const moderationPrompt = `Analyze this Discord message for violations...
   │  │  Messages: ${messageHistory}
   │  │  Determine: severity level, action type, warning/ban
   │  │  Output: JSON with {action, reason, severity}`;
   │  │  ```
   │  │
   │  └─ Example 2: "SQL Query Generation"
   │     ```typescript
   │     const userQueryPrompt = `Convert to SQL for PostgreSQL:
   │     "Find moderators with >100 total cases and >80% accuracy"`;
   │     // Claude generates: SELECT * FROM moderators WHERE...
   │     ```
   │
   ├─ VISUAL BREAKDOWN (C):
   │  ├─ Dashboard screenshot with annotations:
   │  │  ├─ "Haftalk Trend" (Bell curve chart - moderation frequency)
   │  │  ├─ "Performance Table" (Top moderators ranked by accuracy/speed)
   │  │  ├─ "306 Total Cases | 278 Resolved | 28 Pending"
   │  │  └─ "Real-time moderation stats updated every 5 minutes"
   │  └─ Architecture diagram:
   │     Discord Server → Webhook → Node.js → PostgreSQL → React Dashboard
   │
   ├─ LIVE DEMO LINK (D):
   │  └─ "🔗 View Live Dashboard: https://lutheus.vercel.app/"
   │     (Opens in new tab with external icon)
   │
   └─ Related links:
      ├─ GitHub Repo: https://github.com/Gear2Head/lutheus
      ├─ Discord Server: https://discord.gg/lutheus
      └─ Wiki: https://wiki.lutheus.com/

PROJECT 2: ADALANCES COMMUNITY & OPERATIONS
┌─ Card:
│  ├─ Title: "Adalances Community (228.4k+ members)"
│  ├─ Role: "Senior Moderator & Operations Lead"
│  ├─ Impact: "Wiki content, staff recruitment, crisis management"
│  └─ Links: [Discord] [Wiki] [Manage]
│
└─ Modal details:
   ├─ Full organizational chart
   ├─ 3-year timeline of operational milestones
   ├─ Moderation handbook documentation
   └─ Staff training & performance data

PROJECT 3: KIRGED.ORG (Social Responsibility)
┌─ Card:
│  ├─ Title: "Kirged.org - Accessibility Initiative"
│  ├─ Impact: "Web accessibility for vision-impaired community"
│  ├─ Tech: [Web Development] [WCAG 2.1 AA] [Volunteer]
│  └─ Link: https://kirged.org/
│
└─ Modal:
   ├─ Project motivation & impact metrics
   ├─ Accessibility standards implemented
   └─ Volunteer contribution story

Animation: Cards stagger in on scroll, modal opens with smooth fade + scale
```

### 7. ACADEMIC & ACHIEVEMENTS SECTION

```typescript
Timeline layout:

┌─ Education Header: "Academic Journey"
├─ Entry 1: High School Graduation
│  ├─ Date: 2022-2026
│  ├─ Achievement: "OBP: 94.4/100"
│  ├─ Context: "Maintained excellence while leading 297k+ user communities"
│  └─ Badge: "Top 5%"
│
├─ Entry 2: IELTS Certification
│  ├─ Date: 2025
│  ├─ Achievement: "7.0 (C1 Proficient)"
│  ├─ Breakdown: "Listening 8 | Reading 7.5 | Writing 6.5 | Speaking 7"
│  └─ Badge: "C1 Advanced"
│
├─ Entry 3: International Certifications
│  ├─ eTwinning Quality Label (Oct 2024)
│  │  └─ "European School Education Platform recognition"
│  ├─ EU Code Week Certificate (Oct 2024)
│  │  └─ "European Commission participation"
│  └─ Display: Actual certificate images (if available)
│
└─ Entry 4: AI Specialization Track
   ├─ Date: 2025-2026+
   ├─ Focus: "Claude, Codex, Gemini mastery + prompt engineering"
   └─ Proof: "10+ GitHub projects, 430+ contributions"

Animation: Timeline items reveal on scroll (slide-in from left)
```

### 8. SKILLS & EXPERTISE SECTION

```typescript
Grid structure (4 columns):

Category 1: AI & PROMPTING
├─ Claude Prompt Engineering → 98/100
├─ LLM Workflows (OpenAI Codex) → 96/100
├─ Gemini API Integration → 94/100
└─ Hover effect: Show 1-2 example use cases

Category 2: FULL-STACK DEVELOPMENT
├─ React + TypeScript → 92/100
├─ Node.js Backend → 90/100
├─ PostgreSQL → 92/100
└─ Hover: Link to relevant projects

Category 3: COMMUNITY OPERATIONS
├─ Discord Architecture → 96/100
├─ Moderator Training → 95/100
├─ Crisis Management → 98/100 (297.8k scale experience)
└─ Hover: Show stats

Category 4: MISC
├─ Git & GitHub → 94/100
├─ DevOps & Vercel → 88/100
├─ Data Analysis → 85/100
└─ Languages: Turkish (Native), English (C1)

Animation: Skill bars fill on scroll, level animates
```

### 9. DISCORD EMBEDS (Static Cards - Adalances & Lutheus)

```typescript
STATIC EMBED 1: Adalances
┌─ Server icon: (fetch manually from Discord or use stored image)
├─ Server name: "Adalances"
├─ Category badge: "🎮 Minecraft & Gaming"
├─ Status: "🟢 228.4k Members"
├─ Description: "Türkiye's largest independent gaming community"
├─ Additional tags: [wiki.adalances.com] [Yetkili Kitapçığı]
└─ CTA Button: "View Server Profile" (styled like Discord button)
   On click: Opens external Discord invite or server info page

STATIC EMBED 2: Lutheus
┌─ Server icon: (L logo)
├─ Server name: "Lutheus Gaming"
├─ Status: "🟢 918 Members"
├─ Description: "AI-powered gaming community with advanced moderation"
├─ Features: [Manage Dashboard] [AI Moderation] [Performance Tracking]
└─ CTA: "Join Server" (Discord invite link)

Design Notes:
- Style matches Discord's official embed design (dark theme)
- Use actual Discord color scheme (#5865F2)
- Buttons have Discord's standard styling
- NO API CALLS - all data hardcoded for performance
```

### 10. CONTACT & CV SECTION

```typescript
Layout:

┌─ Contact Methods:
│  ├─ Email: senerkadiralper@gmail.com (copy to clipboard on click)
│  ├─ GitHub: github.com/Gear2Head (external link)
│  ├─ Discord: Gear_Head (copy to clipboard)
│  └─ Location: Kırşehir, Turkey 🇹🇷
│
├─ Quick Message Form:
│  ├─ Subject field
│  ├─ Message textarea
│  └─ Submit button → sends via formspree or similar
│
└─ CV Download:
   ├─ "Download CV (PDF)" → https://heyalper.vercel.app/cv.pdf
   │  (or store in public folder)
   ├─ Available in: EN + TR
   └─ Contents:
      ├─ Contact info
      ├─ Academic achievements
      ├─ Leadership experience
      ├─ Technical skills
      ├─ Projects (with links)
      └─ Certifications

REFERRALS SECTION:
┌─ "Recommendations"
├─ Reference 1: "High School Teacher"
│  └─ Placeholder: [To be added - academic excellence & leadership potential]
├─ Reference 2: "Adalances Leadership Team"
│  └─ Placeholder: [Community management at 228k+ scale]
└─ Reference 3: "Lutheus Project Lead"
   └─ Placeholder: [Technical contributions & system architecture]

Animation: Fade in on scroll, form has smooth focus states
```

### 11. FOOTER

```typescript
Footer layout:
┌─ Quick links: Home | Projects | About | Contact
├─ Social: GitHub | Discord | Instagram (if applicable)
├─ Language toggle: EN / TR (mirror navbar)
└─ Copyright: "© 2026 Kadir Alper Şener. All rights reserved."
   Deployment info: "Hosted on Vercel" (small badge)
```

---

## DESIGN SYSTEM

### Color Scheme (Dark mode primary)

```css
/* Main colors */
--primary: #0066FF;        /* Blue accent */
--accent: #7C3AED;         /* Purple (Korean inspiration) */
--danger: #EF4444;         /* Red */
--success: #10B981;        /* Green */
--bg-primary: #0F172A;     /* Dark navy */
--bg-secondary: #1E293B;   /* Slightly lighter */
--text-primary: #F8FAFC;   /* Off-white */
--text-secondary: #CBD5E1; /* Muted */
--border: #334155;         /* Gray border */

/* Korean accent colors */
--korea-red: #C60C30;      /* Official Korean red */
--korea-blue: #003478;     /* Official Korean blue */
```

### Typography

```css
--font-primary: "Inter", sans-serif;       /* Body & headings */
--font-mono: "JetBrains Mono", monospace;  /* Code blocks */

Sizes:
- H1: 48px, weight 700
- H2: 32px, weight 600
- H3: 24px, weight 600
- Body: 16px, weight 400
- Caption: 12px, weight 400
- Code: 14px, weight 500
```

### CONTEXT-AWARE CURSOR (All Types)

```typescript
Cursor behaviors:

1. DEFAULT: Minimal dot + slight glow
   - Size: 12px circle
   - Color: #0066FF with 20% opacity halo
   - Behavior: Smooth follow with 0.1s delay

2. POINTER (Links, buttons, clickable):
   - Icon: Tabler icon (ti-external-link for external, ti-chevron-right for internal)
   - Size: 16px
   - Color: #7C3AED (purple accent)

3. TEXT (Over text content):
   - Icon: Tabler text beam (ti-text)
   - Color: #0066FF
   - Feedback: Subtle scale on hover

4. GRAB (Draggable, scroll):
   - Icon: Tabler grab icon (ti-grip-vertical)
   - Color: #10B981 (green)

5. DISCORD LINK (Discord invites/server links):
   - Icon: Custom Discord logo (small)
   - Color: #5865F2 (Discord brand)
   - Hover effect: Slight scale + shadow

6. PDF/DOWNLOAD:
   - Icon: Tabler download icon (ti-download)
   - Color: #10B981
   - Feedback: Pulse animation on hover

7. VIDEO/MEDIA:
   - Icon: Tabler play icon (ti-player-play)
   - Color: #EF4444 (red)

Implementation:
- Framer Motion for smooth animations
- Custom SVG for mouse tracking
- CSS cursor fallback to 'pointer' for browsers with issues
```

### SCROLL ANIMATIONS (Medium Intensity)

```typescript
Animation strategies:

1. HERO SECTION:
   - Fade-in + slide-up on load
   - Duration: 0.8s
   - Easing: "easeOut"

2. PROJECT CARDS:
   - Stagger animation (each card delays 0.1s)
   - Entrance: Fade-in + scale (0.9 → 1)
   - On viewport: Trigger animation
   - Duration: 0.6s per card

3. METRICS COUNTERS:
   - Numbers animate from 0 → final value
   - Duration: 2s (matches scroll timing)
   - Ease: "easeInOut"

4. TIMELINE ENTRIES:
   - Slide-in from left (x: -40px → 0px)
   - Fade-in simultaneously
   - Stagger: 0.15s between entries

5. SKILL BARS:
   - Width animates on scroll (0% → final%)
   - Duration: 1.5s
   - Delay: Based on bar position

6. GENERAL SECTIONS:
   - Section containers fade-in on scroll
   - Trigger: When 30% visible
   - Duration: 0.6s
   - No jarring movement - subtle fade-ins preferred

Implementation library: Framer Motion + React Intersection Observer
```

### INTERACTIVE COMPONENTS

```typescript
All clickable elements must have interactions:

1. PROJECT CARDS:
   - Hover: Scale 1.02 + shadow increase
   - Click: Modal opens with full details
   - Animation: Smooth modal fade-in + scale

2. SKILL ITEMS:
   - Hover: Background color change, show tooltip with examples
   - Click: (Optional) Link to relevant project

3. METRIC CARDS:
   - Hover: Show additional breakdown info (tooltip)
   - Animation: Subtle scale or glow

4. BUTTONS:
   - All buttons: Hover state (background change)
   - Focus: Keyboard accessible (visible focus ring)
   - Active: Quick scale down (0.98) for tactile feedback

5. LINKS:
   - Underline on hover
   - External links: Show icon (ti-external-link)
   - Color change on hover

6. FORM FIELDS:
   - Focus: Border color change, subtle glow
   - Error: Red border + error message
   - Success: Green indicator

Implementation: Framer Motion + CSS hover states
```

---

## BILINGUAL SYSTEM (EN/TR Toggle)

```typescript
Structure:

1. LANGUAGE TOGGLE:
   Location: Navbar top-right
   Design: Pill-shaped button with flags 🇬🇧 | 🇹🇷
   Behavior: 
   - Click EN → set language context to "en"
   - Click TR → set language context to "tr"
   - Store in localStorage for persistence
   - Default: English

2. CONTENT MAPPING:
   Create i18n object:
   ```typescript
   const translations = {
     en: {
       nav: { home: "Home", projects: "Projects", ... },
       hero: { tagline: "...", description: "..." },
       projects: { ... },
       ...all sections...
     },
     tr: {
       nav: { home: "Ana Sayfa", projects: "Projeler", ... },
       hero: { tagline: "...", description: "..." },
       ...
     }
   };
   ```

3. COMPONENT USAGE:
   ```typescript
   import { useLanguage } from './i18n';
   
   export const Hero = () => {
     const { t } = useLanguage();
     return <h1>{t('hero.tagline')}</h1>;
   };
   ```

4. DYNAMIC CONTENT:
   - All visible text must be translatable
   - Code snippets: Keep in English (technical context)
   - Brand names: Keep original (Adalances, Lutheus, Discord)
   - Numbers & dates: Format per locale (if needed)
```

---

## TECHNICAL STACK & DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "typescript": "^5.3.0",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^5.0.0"
  },
  "optional": {
    "react-query": "for real-time Discord stats (future enhancement)",
    "recharts": "for charts & data visualization"
  }
}
```

### Project Structure

```
src/
├── components/
│  ├── Navbar.tsx
│  ├── Hero.tsx
│  ├── GKSCard.tsx
│  ├── MotivationSection.tsx
│  ├── ImpactMetrics.tsx
│  ├── ProjectsSection.tsx
│  │  ├── ProjectCard.tsx
│  │  ├── ProjectModal.tsx
│  │  └── DiscordEmbed.tsx
│  ├── AcademicTimeline.tsx
│  ├── SkillsSection.tsx
│  ├── ContactSection.tsx
│  ├── Footer.tsx
│  ├── ContextAwareCursor.tsx
│  └── ScrollAnimations.tsx
├── context/
│  └── LanguageContext.tsx (i18n)
├── styles/
│  └── globals.css (Tailwind + custom)
├── data/
│  ├── translations.ts (EN/TR)
│  ├── projects.ts (Project data)
│  └── constants.ts (Discord stats, contact info)
├── hooks/
│  └── useLanguage.ts
└── App.tsx
```

---

## REAL DATA INJECTION POINTS

### Discord Server Stats (STATIC - NO API)

```typescript
// src/data/constants.ts

export const DISCORD_SERVERS = {
  adalances: {
    name: "Adalances",
    members: 228400,
    online: 5763,
    description: "Türkiye's largest independent Minecraft & Gaming community",
    icon: "🎮",
    inviteLink: "https://discord.gg/adal",
    wikiLink: "https://wiki.adalances.com/",
    badge: "Gaming"
  },
  lutheus: {
    name: "Lutheus",
    members: 918,
    online: 275,
    description: "AI-powered gaming community with advanced moderation",
    icon: "⚡",
    inviteLink: "https://discord.gg/lutheus",
    manageLink: "https://lutheus.vercel.app/",
    wikiLink: "https://wiki.lutheus.com/",
    badge: "AI-Powered"
  }
};

export const IMPACT_METRICS = {
  totalUsers: 297800,
  peakConcurrency: 15934,
  uptime: 99.8,
  moderatorsTrained: 150,
  leadershipYears: 3
};
```

### GitHub Profile Data

```typescript
// Fetch once on build or use GitHub API endpoint:
// https://api.github.com/users/Gear2Head

export const GITHUB_STATS = {
  username: "Gear2Head",
  totalRepos: 10,
  totalContributions: 430,
  topLanguages: ["TypeScript", "Python", "JavaScript"],
  profileUrl: "https://github.com/Gear2Head",
  profileImage: "https://github.com/Gear2Head.png"
};
```

### Contact Information

```typescript
export const CONTACT_INFO = {
  email: "senerkadiralper@gmail.com",
  location: "Kırşehir, Turkey",
  discord: "Gear_Head",
  github: "https://github.com/Gear2Head",
  instagram: "https://www.instagram.com/gear2head/",
  linkedin: "" // To be added
};
```

---

## LUTHEUS CASE STUDY - CODE EXAMPLES

### Example 1: Prompt Engineering (Moderation AI)

```typescript
const buildModerationPrompt = (messages: string[], context: string) => `
You are a Discord moderator analyzing messages for policy violations.

Context: ${context}

Messages to review:
${messages}

Analyze each message for:
1. Policy violations (toxicity, spam, NSFW, etc)
2. Severity (none/low/medium/high/critical)
3. Recommended action (none/warn/mute/kick/ban)

Return JSON response with: {
  message_id: string,
  violation_detected: boolean,
  severity: "none" | "low" | "medium" | "high" | "critical",
  violation_type: string,
  recommended_action: string,
  reason: string
}
`;
```

### Example 2: SQL Query Generation

```typescript
const buildSQLGenerationPrompt = (userQuery: string) => `
Convert this natural language query to PostgreSQL:

User query: "${userQuery}"

Database schema:
- moderators (id, username, total_cases, accuracy_rate, join_date)
- cases (id, moderator_id, severity, resolved, date)
- users (id, username, member_since)

Return ONLY the SQL query, no explanation.
`;
```

### Example 3: System Integration Flow

```typescript
// Discord webhook receives message report
app.post('/api/discord-webhook', async (req, res) => {
  const { messages, context } = req.body;
  
  // Step 1: Build prompt
  const prompt = buildModerationPrompt(messages, context);
  
  // Step 2: Call Claude API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-opus-4',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  // Step 3: Parse response
  const data = await response.json();
  const moderationResult = JSON.parse(data.content[0].text);
  
  // Step 4: Execute action in database
  await db.cases.insert({
    moderator_id: req.user.id,
    severity: moderationResult.severity,
    action: moderationResult.recommended_action,
    timestamp: new Date()
  });
  
  res.json({ success: true, action: moderationResult.recommended_action });
});
```

---

## DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All translations complete (EN/TR)
- [ ] Discord stats verified (Adalances: 228.4k, Lutheus: 918)
- [ ] GitHub profile image accessible
- [ ] All external links tested (Discord, GitHub, Vercel)
- [ ] PDF CV generated & hosted
- [ ] Cursor cursor SVG files optimized
- [ ] Images compressed (ProjectScreenshots, certificates)
- [ ] Environment variables set:
  ```
  VITE_GITHUB_USERNAME=Gear2Head
  VITE_ANTHROPIC_API_KEY=xxxx (if using API)
  ```

### Vercel Deployment

```bash
# Build
npm run build

# Preview locally
npm run preview

# Deploy
vercel deploy --prod

# Domain setup
vercel env add NEXT_PUBLIC_DOMAIN=heyalper.me
```

### Post-Deployment

- [ ] Test mobile responsiveness
- [ ] Verify all links work
- [ ] Test language toggle
- [ ] Check cursor on different browsers
- [ ] Test scroll animations (performance)
- [ ] Verify Discord embeds display correctly
- [ ] SEO meta tags optimized
- [ ] Analytics setup (if needed)

---

## PERFORMANCE OPTIMIZATION

1. **Image Optimization:**
   - Use WebP format where possible
   - Lazy load images below the fold
   - Compress PNGs/JPGs (TinyPNG)

2. **Code Splitting:**
   - Lazy load modals (ProjectModal)
   - Route-based splitting if needed

3. **Animation Optimization:**
   - Use `will-change` CSS for animated elements
   - Prefer `transform` & `opacity` over layout-triggering properties
   - Disable animations on `prefers-reduced-motion`

4. **Caching:**
   - Static Discord data → cached in constants
   - GitHub data → fetch on build or cache for 24h
   - Translation files → bundled with app

---

## ACCESSIBILITY CHECKLIST

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation (Tab through all interactive elements)
- [ ] Focus states visible on all buttons & links
- [ ] Form labels properly associated
- [ ] Semantic HTML (headings hierarchy, etc)
- [ ] Screen reader tested (NVDA / VoiceOver)
- [ ] Motion reduced for users with `prefers-reduced-motion`

---

## SUCCESS CRITERIA (For GKS Mülahatçı)

When viewing this portfolio, the GKS evaluator should immediately understand:

1. ✅ **Why AI?** - Hero section + motivation content
2. ✅ **Why Korea?** - Dedicated section explaining educational opportunity
3. ✅ **Scale & Impact** - Metrics section (297.8k users, leadership experience)
4. ✅ **Technical Depth** - Lutheus case study (code + visuals + live demo)
5. ✅ **Academic Excellence** - OBP 94.4, IELTS 7.0 (C1) displayed prominently
6. ✅ **Global Recognition** - eTwinning + EU Code Week certificates
7. ✅ **Social Responsibility** - kirged.org project showcased
8. ✅ **English Proficiency** - Entire site in fluent English (with TR option)
9. ✅ **Professional Polish** - Premium design, smooth animations, interactive components
10. ✅ **Contact & References** - Easy to reach out, referral information available

---

## FINAL NOTES

- This prompt is designed for Gemini's Vibe Coder mode
- Copy-paste into Anti-gravity, adjust any API keys/URLs as needed
- The site should feel like a **premium tech product**, not a basic portfolio
- Emphasis on **AI expertise** and **proven leadership** at scale
- All data is real and verified (Discord stats, GitHub profile, GKS info)
- Animations should enhance experience, not distract
- Mobile-first responsive design required
- Deploy to heyalper.vercel.app, then migrate to heyalper.me domain

---

**Ready for generation! 🚀**
