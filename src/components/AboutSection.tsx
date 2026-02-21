import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto perspective-2000">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black mb-4 text-blue-600 text-center tracking-tighter dark:text-white dark:glow-text dark:uppercase">My Vision</h2>
            <div className="w-24 h-2 rounded-full bg-blue-500/20 dark:bg-blue-600/30 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
          </div>

          <div className="glass-shinkai p-12 sm:p-20 relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full dark:hidden" />
            
            <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-16 items-center dark:block">
              <div className="p-10 bg-gradient-to-br from-blue-500 to-blue-400 rounded-[3rem] text-white shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 dark:hidden">
                <span className="font-cursive text-3xl mb-4 block">Professional Journey</span>
                <p className="text-4xl font-black italic">LEVEL S</p>
                <div className="h-1 w-12 bg-white/40 my-6" />
                <p className="text-sm font-bold tracking-[0.2em] uppercase opacity-80">Software Engineering</p>
              </div>

              <div className="space-y-10">
                <p className="text-slate-700 leading-relaxed text-2xl sm:text-3xl font-bold italic tracking-tight dark:text-white/80 dark:text-xl dark:sm:text-2xl dark:font-medium dark:not-italic dark:tracking-normal">
                  "Engineering isn't just about code; it's about building bridges between human needs and digital possibilities."
                </p>
                <div className="space-y-6 text-slate-500 text-xl font-medium leading-relaxed dark:text-white/70 dark:text-lg dark:sm:text-xl">
                  <p>
                    With 3+ years of experience across high-growth tech environments, I specialize in 
                    architecting systems that are as beautiful in their logic as they are in their execution.
                  </p>
                  <p>
                    From scalable backends at <strong>Leader Group</strong> to complex IoT integrations at <strong>EC Infosolutions</strong>, 
                    I strive for engineering excellence that feels seamless and intuitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
