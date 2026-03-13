import { lazy, Suspense, memo, useState, useEffect } from "react";
import { m, useScroll, useTransform } from "framer-motion";
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
const MotionControlPanel = lazy(() => import("@/components/MotionControlPanel"));

const SectionFallback = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const CinematicOverlay = () => {
  const { scrollYProgress } = useScroll();
  const barHeight = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["0%", "8%", "8%", "0%"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);

  return (
    <>
      {/* Cinematic Bars */}
      <m.div style={{ height: barHeight }} className="fixed top-0 left-0 right-0 bg-black z-[60] pointer-events-none" />
      <m.div style={{ height: barHeight }} className="fixed bottom-0 left-0 right-0 bg-black z-[60] pointer-events-none" />
      
      {/* Grain / Noise Filter */}
      <div className="fixed inset-0 z-[70] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Edge Vignette */}
      <m.div 
        style={{ opacity: vignetteOpacity }}
        className="fixed inset-0 z-[65] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" 
      />
    </>
  );
};

const Index = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Delay background initialization to let LCP finish first
    const timer = setTimeout(() => setShowBackground(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-600/30 dark:selection:text-white font-sans overflow-x-hidden">
      {/* 3D Background — deferred initialization */}
      {showBackground && (
        <Suspense fallback={null}>
          <NeuralFluidBackground />
        </Suspense>
      )}
      
      <CinematicOverlay />
      
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Navbar />
        <HeroSection />
        
        <div className="relative z-10">
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <AboutSection />
            </div>
          </Suspense>
          <div className="h-40 bg-gradient-to-b from-transparent to-white/10 dark:to-transparent" />
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <SkillsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <ExperienceSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <ProjectsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <ContactSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <div className="content-lazy">
              <Footer />
            </div>
          </Suspense>
        </div>
      </m.div>

      <Suspense fallback={null}>
        <MotionControlPanel />
      </Suspense>

      {/* Soft Bloom / Sunlight Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)] z-20 dark:opacity-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.03)_0%,transparent_50%)] z-20 dark:opacity-0" />
    </div>
  );
};

export default Index;
