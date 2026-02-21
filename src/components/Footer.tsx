import { Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-32 relative z-10 overflow-hidden bg-white/50 backdrop-blur-sm border-t border-white/80 dark:bg-[#020617] dark:border-white/5 dark:backdrop-blur-none dark:py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-16 relative z-10 dark:gap-8">
        {/* Light mode large footer text */}
        <div className="flex flex-col items-center text-center max-w-2xl dark:hidden">
           <h4 className="text-5xl sm:text-7xl font-black text-blue-600 italic uppercase tracking-tighter mb-8 drop-shadow-sm">
             Always Forward
           </h4>
           <p className="text-slate-500 text-lg font-medium leading-relaxed">
             Continuing the journey of engineering excellence, one innovation at a time. 
             Let's build something beautiful together.
           </p>
        </div>
        
        <a 
          href="https://www.linkedin.com/in/bewin-babu-150405170/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-shinkai px-16 py-7 text-xl shadow-2xl hover:shadow-blue-500/40 dark:bg-transparent dark:border dark:border-white/10 dark:rounded-2xl dark:px-6 dark:py-3 dark:text-white/60 dark:hover:text-white dark:shadow-none dark:hover:shadow-none dark:font-black dark:tracking-widest dark:uppercase dark:flex dark:items-center dark:gap-3 dark:text-sm"
        >
          <Linkedin size={20} className="hidden dark:inline" />
          CONNECT ON LINKEDIN
        </a>

        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-16 border-t border-blue-100/50 gap-8 dark:pt-8 dark:border-white/5 dark:justify-center">
           <div className="flex items-center gap-6 text-slate-400 font-bold text-[11px] tracking-[0.3em] uppercase dark:hidden">
              <span>BEWIN BABU</span>
              <div className="w-2 h-2 bg-blue-500/20 rounded-full" />
              <span>SOFTWARE ENGINEER</span>
           </div>
           <p className="text-[11px] text-slate-300 tracking-[0.4em] uppercase font-bold flex items-center gap-2 dark:text-white/40 dark:tracking-[0.2em] dark:text-sm dark:font-black">
              © 2026 <span className="dark:inline"> </span>
              <span className="dark:text-white">BEWIN BABU</span>
              <span className="dark:hidden"><Heart size={14} className="text-red-300 fill-red-300" /></span>
              <span className="hidden dark:inline"> | ADVANCED SOFTWARE ENGINEERING</span>
           </p>
           <p className="dark:hidden text-[11px] text-slate-300 tracking-[0.4em] uppercase font-bold flex items-center gap-2">
              // CRAFTED WITH <Heart size={14} className="text-red-300 fill-red-300" />
           </p>
        </div>
      </div>
    </footer>
  );
}
