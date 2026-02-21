import { motion } from "framer-motion";
import { Phone, Mail, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-black text-blue-600 text-center tracking-tighter mb-4 uppercase dark:text-white dark:glow-text">Let's Connect</h2>
          <div className="w-24 h-2 bg-blue-500/20 rounded-full dark:bg-blue-600/30 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
        </div>
        
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
          <motion.a
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="tel:+919567138175"
            className="glass-shinkai p-12 flex flex-col items-center gap-8 group hover:border-blue-200 dark:glow-box-hover dark:three-d-card dark:hover:bg-white/[0.05] dark:hover:border-transparent"
          >
            <div className="p-6 bg-blue-50 text-blue-500 rounded-3xl group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm dark:bg-blue-500/10 dark:text-blue-400 dark:rounded-2xl dark:shadow-none dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
              <Phone size={36} className="dark:w-8 dark:h-8" />
            </div>
            <div className="text-center">
              <span className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase block mb-2 dark:hidden">VOICE CALL</span>
              <span className="text-blue-600 text-2xl font-black tracking-tighter italic dark:text-white dark:not-italic dark:tracking-widest dark:text-xl">+91 9567 138175</span>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="mailto:bewinbabu1998@gmail.com"
            className="glass-shinkai p-12 flex flex-col items-center gap-8 group hover:border-blue-200 dark:glow-box-hover dark:three-d-card dark:hover:bg-white/[0.05] dark:hover:border-transparent"
          >
            <div className="p-6 bg-blue-50 text-blue-500 rounded-3xl group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm dark:bg-blue-500/10 dark:text-blue-400 dark:rounded-2xl dark:shadow-none dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
              <Mail size={36} className="dark:w-8 dark:h-8" />
            </div>
            <div className="text-center">
              <span className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase block mb-2 dark:hidden">WRITTEN MESSAGE</span>
              <span className="text-blue-600 text-xl font-black tracking-tighter break-all italic dark:text-white dark:not-italic dark:tracking-widest">bewinbabu1998@gmail.com</span>
            </div>
          </motion.a>
        </div>

        <div className="mt-20 glass-shinkai p-8 flex items-center justify-between border-dashed border-blue-200 bg-blue-50/20 dark:border-white/5 dark:bg-transparent dark:border-solid">
            <span className="text-blue-400 font-bold tracking-widest text-xs uppercase flex items-center gap-3 dark:text-white/40">
               <Send size={16} /> Awaiting your signal...
            </span>
            <div className="h-2 w-32 bg-blue-500/10 rounded-full dark:bg-white/5" />
        </div>
      </div>
    </section>
  );
}
