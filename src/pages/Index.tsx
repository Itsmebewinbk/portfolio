import { lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold sections — they aren't needed until user scrolls
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const NeuralFluidBackground = lazy(() => import("@/components/NeuralFluidBackground"));

const SectionFallback = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-600/30 dark:selection:text-white font-sans overflow-x-hidden">
      {/* 3D Background — lazy loaded */}
      <Suspense fallback={null}>
        <NeuralFluidBackground />
      </Suspense>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Navbar />
        <HeroSection />
        
        <Suspense fallback={<SectionFallback />}>
          <div className="relative z-10">
            <AboutSection />
            <div className="h-40 bg-gradient-to-b from-transparent to-white/10 dark:to-transparent" />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </div>
        </Suspense>
      </motion.div>

      {/* Soft Bloom / Sunlight Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)] z-20 dark:opacity-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.03)_0%,transparent_50%)] z-20 dark:opacity-0" />
    </div>
  );
};

export default Index;
