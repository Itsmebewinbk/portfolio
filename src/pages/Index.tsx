import { lazy, Suspense, memo, useState, useEffect, useCallback } from "react";
import { m, useScroll, useTransform, LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useConnection } from "@/hooks/useConnection";

// Lazy load below-the-fold sections — they aren't needed until user scrolls
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const NeuralFluidBackground = lazy(() => import("@/components/NeuralFluidBackground"));
const MotionControlPanel = lazy(() => import("@/components/MotionControlPanel"));

const SectionFallback = memo(function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center min-h-[300px]">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading section...</span>
    </div>
  );
});

const CinematicOverlay = memo(function CinematicOverlay() {
  const { scrollYProgress } = useScroll();
  const barHeight = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["0%", "8%", "8%", "0%"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);

  return (
    <>
      <m.div style={{ height: barHeight }} className="fixed top-0 left-0 right-0 bg-black z-[60] pointer-events-none" />
      <m.div style={{ height: barHeight }} className="fixed bottom-0 left-0 right-0 bg-black z-[60] pointer-events-none" />
      <div className="fixed inset-0 z-[70] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <m.div 
        style={{ opacity: vignetteOpacity }}
        className="fixed inset-0 z-[65] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" 
      />
    </>
  );
});

const Index = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showMotionControl, setShowMotionControl] = useState(false);
  const { isLite, isSlow } = useConnection();

  useEffect(() => {
    if (isLite) {
      document.body.classList.add('lite-mode');
    } else {
      document.body.classList.remove('lite-mode');
    }
  }, [isLite]);

  useEffect(() => {
    // On Lite versions (slow net OR low end device), we skip the background entirely or delay it much more
    const delay = isLite ? 6000 : 1500;
    
    const task = (window as any).requestIdleCallback 
      ? (window as any).requestIdleCallback(() => setShowBackground(!isLite), { timeout: delay })
      : setTimeout(() => setShowBackground(!isLite), delay);

    return () => {
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(task);
      } else {
        clearTimeout(task);
      }
    };
  }, [isLite]);

  useEffect(() => {
    const task = (window as any).requestIdleCallback 
      ? (window as any).requestIdleCallback(() => setShowMotionControl(true), { timeout: 5000 })
      : setTimeout(() => setShowMotionControl(true), 5000);

    return () => {
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(task);
      } else {
        clearTimeout(task);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-600/30 dark:selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Background — Skip on lite/slow versions */}
      {showBackground && !isLite && (
        <Suspense fallback={<div className="fixed inset-0 z-[-1] bg-[#020617]" />}>
          <NeuralFluidBackground />
        </Suspense>
      )}
      
      {/* Simple fallback background for lite versions to maintain visual intent without CPU overhead */}
      {isLite && (
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-blue-50 to-white dark:bg-[#020617] pointer-events-none" />
      )}
      
      <CinematicOverlay />
      
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
          
          <div className="h-40 bg-gradient-to-b from-transparent to-white/10 dark:to-transparent pointer-events-none" />
          
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

      {showMotionControl && (
        <Suspense fallback={null}>
          <MotionControlPanel />
        </Suspense>
      )}

      {/* Decorative Overlays — Low priority */}
      {!isSlow && (
        <>
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)] z-20 dark:opacity-0" />
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.03)_0%,transparent_50%)] z-20 dark:opacity-0" />
        </>
      )}
    </div>
  );
};

export default Index;
