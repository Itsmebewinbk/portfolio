import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Map } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Our Story", href: "#about" },
  { label: "Expertise", href: "#skills" },
  { label: "Journey", href: "#experience" },
  { label: "Innovations", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "p-2 sm:p-3" 
          : "p-4 sm:p-8"
      } dark:p-0`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "glass-shinkai border-white/80 px-6 py-3 shadow-xl rounded-2xl"
          : "glass-shinkai border-white/60 px-10 py-5 shadow-lg"
      } dark:rounded-none dark:border-0 dark:border-b dark:border-white/5 dark:shadow-none dark:bg-[#020617]/80 dark:backdrop-blur-2xl dark:px-6 dark:py-5`}>
        <a href="#" className="flex items-center gap-3">
          <div className={`bg-blue-500 rounded-2xl text-white shadow-lg transition-all duration-500 ${scrolled ? "p-1.5" : "p-2"} dark:bg-transparent dark:shadow-none dark:p-0`}>
            <Map size={scrolled ? 20 : 24} className="dark:hidden" />
            <span className="hidden dark:inline text-2xl font-black text-white tracking-widest uppercase">BB</span>
          </div>
          <span className={`font-black text-blue-600 italic tracking-tighter uppercase drop-shadow-sm transition-all duration-500 ${scrolled ? "text-xl" : "text-2xl"} dark:text-white dark:not-italic dark:tracking-widest dark:drop-shadow-none`}>
            BEWIN
          </span>
        </a>

        <div className="hidden md:flex gap-12 items-center">
          {links.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              className="text-[11px] tracking-[0.3em] font-black uppercase text-slate-500 hover:text-blue-500 transition-all relative group/link dark:text-white/60 dark:hover:text-white dark:tracking-[0.2em]"
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 group-hover/link:w-full transition-all dark:bg-white" />
            </a>
          ))}
          <ThemeToggle />
          <a 
            href="https://www.linkedin.com/in/bewin-babu-150405170/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-blue-50 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm dark:bg-white/5 dark:text-white dark:border dark:border-white/10 dark:hover:bg-white/10 dark:shadow-none"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-blue-600 dark:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden mt-6 dark:mt-0"
          >
            <div className="glass-shinkai p-10 flex flex-col gap-8 shadow-2xl dark:rounded-none dark:bg-[#020617] dark:border-0 dark:border-b dark:border-white/5 dark:shadow-none dark:px-8 dark:py-8">
              {links.map((l) => (
                <a 
                  key={l.href} 
                  href={l.href} 
                  onClick={closeMenu} 
                  className="text-2xl font-black text-slate-700 italic uppercase tracking-tighter hover:text-blue-500 transition-colors dark:text-white/70 dark:hover:text-white dark:not-italic dark:tracking-widest dark:text-lg"
                >
                  {l.label}
                </a>
              ))}
              <a 
                href="https://www.linkedin.com/in/bewin-babu-150405170/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-shinkai w-full dark:bg-transparent dark:border dark:border-white/10 dark:shadow-none dark:text-blue-400 dark:flex dark:items-center dark:gap-2"
              >
                <Linkedin size={20} className="hidden dark:inline" />
                CONNECT ON LINKEDIN
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
