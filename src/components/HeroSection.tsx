import { m, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import profileImg from "@/assets/profile.webp";
import { useConnection } from "@/hooks/useConnection";

const displaySkills = [
  "Building the Future", "Architecting Dreams", "Modern Engineering", "Innovative Solutions"
];

const TypingEffect = memo(function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = displaySkills[index % displaySkills.length];
    
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2500);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % displaySkills.length);
        }
      }
    }, deleting ? 30 : 70);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="font-sans text-blue-600 font-bold dark:font-mono dark:text-blue-500">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLite } = useConnection();
  const prefersReducedMotion = useReducedMotion();
  const optimizeForLite = isLite || prefersReducedMotion;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects — reduced or disabled on lite/mobile
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", optimizeForLite ? "10%" : "50%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", optimizeForLite ? "0%" : "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, optimizeForLite ? 1 : 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: optimizeForLite ? 0.05 : 0.15, 
        delayChildren: optimizeForLite ? 0.2 : 0.5 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: optimizeForLite ? 10 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: optimizeForLite ? 0.4 : 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[120vh] flex items-center section-padding pt-32 overflow-hidden"
    >
      <m.div 
        style={{ opacity: optimizeForLite ? 1 : opacity }}
        className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-24 relative z-10"
      >
        <m.div
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left"
        >
          <m.p 
            variants={itemVariants}
            className="font-cursive text-3xl text-blue-600 mb-6 dark:hidden"
          >
            Turning visions into reality...
          </m.p>

          <m.div 
            variants={itemVariants}
            className="hidden dark:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 ${optimizeForLite ? '' : 'animate-ping'}`}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-blue-500 font-black">
              Systems Architect & Developer
            </span>
          </m.div>
          
          <m.h1 
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-10 leading-[0.85] tracking-tighter text-blue-600 drop-shadow-sm dark:text-white dark:drop-shadow-none"
          >
            BEWIN <br /> BABU
          </m.h1>

          <m.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-slate-700 mb-10 flex items-center justify-center lg:justify-start gap-4 dark:text-white/90 dark:font-black dark:gradient-text"
          >
            Software Engineer
          </m.h2>

          <m.p 
            variants={itemVariants}
            className="text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 text-xl leading-relaxed font-medium dark:text-white/80"
          >
            I create sophisticated digital systems where beauty meets performance. 
            Blending high-end engineering with artistic intuition to build the next generation of software.
          </m.p>
          
          <m.div 
            variants={itemVariants}
            className="h-10 text-xl font-sans mb-16 flex items-center justify-center lg:justify-start bg-white/30 backdrop-blur-sm self-start px-8 py-10 rounded-3xl border border-white/50 inline-flex shadow-sm dark:bg-transparent dark:border-0 dark:shadow-none dark:px-0 dark:py-0 dark:rounded-none"
          >
            <span className="hidden dark:inline mr-3 text-blue-500 font-black text-2xl">&gt;</span>
            <TypingEffect />
          </m.div>

          <m.div 
            variants={itemVariants}
            className="flex flex-wrap gap-8 justify-center lg:justify-start items-center"
          >
            <a 
              href="#projects" 
              aria-label="View Bewin Babu's innovations and projects"
              className="btn-shinkai px-12 py-6 text-lg dark:rounded-3xl dark:shadow-2xl dark:shadow-blue-500/40 dark:hover:shadow-blue-500/60"
            >
              VIEW INNOVATIONS
            </a>
            <a 
              href="#contact" 
              aria-label="Contact Bewin Babu for collaboration"
              className="px-12 py-6 text-lg font-black tracking-widest text-slate-500 hover:text-blue-600 transition-all flex items-center gap-2 group border-2 border-slate-200 rounded-[2rem] dark:text-white/60 dark:border-white/10 dark:hover:border-blue-500 dark:hover:text-blue-500"
            >
              LET'S TALK
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
          </m.div>
        </m.div>

        <m.div
          style={{ y: optimizeForLite ? 0 : imageY, scale: optimizeForLite ? 1 : imageScale }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: optimizeForLite ? 0.6 : 1.2, 
            ease: [0.22, 1, 0.36, 1], 
            delay: optimizeForLite ? 0.1 : 0.3 
          }}
          className="relative group perspective-2000"
        >
          <div className={`absolute inset-0 bg-blue-100 blur-[120px] rounded-full opacity-60 dark:bg-blue-500/20 dark:blur-[100px] dark:rounded-none dark:opacity-100 ${optimizeForLite ? '' : 'animate-pulse'}`} />
          
          <div className={`relative w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-[5rem] overflow-hidden border-[12px] border-white shadow-2xl dark:border-2 dark:border-white/10 dark:rounded-[4rem] ${optimizeForLite ? '' : 'animate-slow-float dark:three-d-float'}`}>
            <img
              src={profileImg}
              alt="Bewin Babu"
              width={500}
              height={500}
              className="w-full h-full object-cover object-[center_12%] transition-transform duration-[3s] hover:scale-110"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent mix-blend-overlay dark:from-black/60 dark:mix-blend-normal" />
          </div>

          <m.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: optimizeForLite ? 0.5 : 1.5 }}
            className="absolute -bottom-10 -right-10 glass-shinkai px-10 py-6 border-white/80 shadow-xl dark:border-white/10 dark:glow-box"
          >
            <span className="text-blue-600 font-black text-xl italic uppercase font-display leading-tight dark:text-white dark:not-italic dark:tracking-widest dark:text-lg">
              {new Date().getFullYear() - 2023}+ YEARS <br /> OF EXCELLENCE
            </span>
          </m.div>
        </m.div>
      </m.div>
    </section>
  );
}
