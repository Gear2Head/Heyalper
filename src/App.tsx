import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { AcademicTimeline } from './components/AcademicTimeline';
import { InternationalProjectsSection } from './components/InternationalProjectsSection';
import { ImpactMetrics } from './components/ImpactMetrics';
import { DocumentShowcase } from './components/DocumentShowcase';
import { SkillsGrid } from './components/SkillsGrid';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanelModal } from './components/AdminPanel/AdminPanelModal';
import { AdminToast } from './components/AdminToast';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MetaTagUpdater } from './components/MetaTagUpdater';
import { QuickActions } from './components/QuickActions';

const MainContent: React.FC = () => {
  const { data, isAdminAuthenticated } = usePortfolio();

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#0066CC]/30 font-sans ${
      data.theme.darkMode ? 'bg-[#121214] text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      {/* Dynamic SEO Meta Tag Updater */}
      <MetaTagUpdater />

      {/* Scroll Progress Bar at the top of the screen */}
      <ScrollProgressBar />

      {/* Custom Minimalist Apple-like Cursor */}
      <CustomCursor />

      {/* Admin Toast Notification */}
      <AdminToast />

      {/* Background Grid Pattern (Apple subtle canvas) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] -z-20"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <Navbar />
      
      <main className="space-y-12">
        <section id="hero"><Hero /></section>
        <section id="bento"><BentoGrid /></section>
        <section id="impact"><ImpactMetrics /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="academic"><AcademicTimeline /></section>
        <section id="international"><InternationalProjectsSection /></section>
        <section id="documents"><DocumentShowcase /></section>
        <section id="skills"><SkillsGrid /></section>
        <section id="certificates"><CertificatesSection /></section>
        <section id="contact"><ContactSection /></section>
      </main>

      <Footer />

      {/* Floating Quick Actions Menu */}
      {isAdminAuthenticated && <QuickActions />}

      {/* Modals */}
      <ProjectModal />
      <AdminPanelModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}
