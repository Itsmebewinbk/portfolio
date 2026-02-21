import { motion } from "framer-motion";

const categories = [
  { 
    title: "System Drive", 
    skills: ["Python", "Django", "FastAPI", "Distributed Systems", "Scaling", "Redis", "Celery"] 
  },
  { 
    title: "Eco-Commerce", 
    skills: ["Shopify", "React JS", "Javascript", "HTML5", "CSS3", "TailwindCSS"] 
  },
  { 
    title: "Cloud Command", 
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Nginx", "Linux Admin"] 
  },
  { 
    title: "Neural Network", 
    skills: ["OpenAI API", "LangChain", "RAG Systems", "AI Agents", "Prompt Engineering"] 
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative z-10 overflow-hidden dark:bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-blue-600 text-center tracking-tighter mb-4 uppercase dark:text-white dark:glow-text">Expertise Stack</h2>
          <div className="w-24 h-2 bg-blue-500/20 rounded-full dark:bg-blue-600/30 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
        </div>
        
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: ci * 0.1 }}
              className="glass-shinkai p-12 border-none shadow-lg hover:shadow-2xl transition-all group dark:glow-box-hover dark:three-d-card dark:hover:bg-white/[0.05]"
            >
              <h3 className="text-xl font-black text-blue-600 mb-8 uppercase italic tracking-tighter dark:text-blue-400 dark:not-italic dark:text-xs dark:tracking-[0.3em]">
                {cat.title}
              </h3>
              <div className="mt-8 flex flex-wrap gap-4 dark:gap-3">
                {cat.skills.map((s) => (
                  <span 
                    key={s} 
                    className="px-5 py-2 text-[11px] font-bold tracking-widest uppercase rounded-full bg-blue-50 text-blue-500 border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-all cursor-default
                      dark:rounded-xl dark:bg-white/5 dark:text-white/80 dark:border-white/5 dark:font-black dark:py-2.5 dark:hover:border-white/20 dark:hover:bg-white/10 dark:group-hover:bg-white/10 dark:group-hover:text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
