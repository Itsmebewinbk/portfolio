import { m, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { memo, useRef } from "react";
import { ExternalLink, Github, ArrowUpRight, MessageSquare } from "lucide-react";

const projects = [
  {
    title: "Sailors Hub",
    tag: "DJANGO + AWS",
    desc: "A comprehensive LinkedIn + Udemy style platform featuring job search, professional courses, and real-time chat functionality.",
    impact: "Connected 5,000+ maritime professionals with employers.",
    links: { demo: "#", github: "#" },
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Elite Zoho Automation",
    tag: "FINANCIAL AUTOMATION",
    desc: "Custom financial automation system integrated with Zoho Books. Handles GST compliance, invoice automation, and multi-currency synchronization.",
    impact: "Reduced accounting overhead by 65%.",
    links: { demo: "#", github: "#" },
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "AOW & BGM",
    tag: "IOT PLATFORM",
    desc: "Real-time device monitoring system using MQTT and AWS. Includes a live data analytics dashboard for industrial equipment monitoring.",
    impact: "Enabled 24/7 remote monitoring for 200+ industrial units.",
    links: { demo: "#", github: "#" },
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Cozat Myrent",
    tag: "PROPERTY MGMT",
    desc: "Professional property management system facilitating seamless tenant communication and automated rent tracking.",
    impact: "Seamlessly manages 500+ properties.",
    links: { demo: "#", github: "#" },
    color: "from-sky-600 to-blue-600"
  },
  {
    title: "RoseApp",
    tag: "EDTECH",
    desc: "Sleek online tutoring platform with a dedicated educator dashboard and class management system.",
    impact: "Enhanced remote learning for 1,200+ students.",
    links: { demo: "#", github: "#" },
    color: "from-cyan-600 to-blue-600"
  }
];

const ProjectCard = memo(function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 15]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <m.div
      ref={cardRef}
      style={{ scale, rotateX, opacity, filter, y: yParallax }}
      className="glass-shinkai group overflow-hidden border-none shadow-xl hover:shadow-2xl h-full flex flex-col dark:glow-box-hover dark:three-d-card dark:hover:bg-white/[0.03] perspective-2000"
    >
      <m.div 
        style={{ left: useTransform(scrollYProgress, [0, 1], ["-150%", "150%"]) }}
        className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 blur-3xl z-20 pointer-events-none" 
      />

      <div className={`h-64 relative overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center p-12`}>
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        
        {/* Large Initials */}
        <span className="relative z-10 text-7xl font-black text-white/90 tracking-tighter uppercase drop-shadow-2xl">
          {project.title.substring(0, 2)}
        </span>

        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <span className="px-3 py-1 bg-black/20 backdrop-blur-md text-[10px] font-black tracking-widest uppercase text-white rounded-lg border border-white/10">
            {project.tag}
          </span>
        </div>
        
        {/* Quick Links Overlay */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a href={project.links.github} className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all border border-white/10">
            <Github size={18} />
          </a>
          <a href={project.links.demo} className="p-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg">
             <ExternalLink size={18} />
          </a>
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black text-blue-600 dark:text-white uppercase tracking-tight group-hover:translate-x-2 transition-transform">
            {project.title}
          </h3>
          <ArrowUpRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
        
        <p className="text-slate-600 mb-8 leading-relaxed font-medium dark:text-white/60">
          {project.desc}
        </p>

        {project.impact && (
          <div className="mt-auto pt-6 border-t border-blue-50 dark:border-white/5">
             <span className="text-[10px] font-black uppercase text-blue-500/50 dark:text-white/20 tracking-widest block mb-2">Impact // Result</span>
             <p className="text-sm font-bold text-slate-800 dark:text-white/90">{project.impact}</p>
          </div>
        )}
      </div>
    </m.div>
  );
});

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative z-10 pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-32">
          <h2 className="text-4xl sm:text-6xl font-black text-blue-600 text-center tracking-tighter mb-4 uppercase dark:text-white dark:glow-text">Commercial Portfolio</h2>
          <div className="w-32 h-2 bg-blue-500/20 rounded-full dark:bg-blue-600/30 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
        </div>
        
        <div className="max-w-7xl mx-auto perspective-2000">
          <m.div className="grid gap-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((p, i) => (
              <div key={i} className={i % 2 === 0 ? "lg:mt-32" : ""}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </m.div>
        </div>

        {/* Cinematic CTA for Clients */}
        <m.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 glass-shinkai p-20 text-center relative overflow-hidden dark:bg-blue-600/5 dark:border-white/10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          <h3 className="text-4xl sm:text-5xl font-black mb-8 text-blue-600 dark:text-white tracking-tighter uppercase">READY TO BUILD THE FUTURE?</h3>
          <p className="text-xl text-slate-600 dark:text-white/60 mb-12 max-w-2xl mx-auto font-medium">
            I specialize in building complex, high-performance systems for enterprises and visionaries. 
            Direct availability for Mid-{new Date().getFullYear()} is currently open.
          </p>
          <a href="#contact" className="btn-shinkai px-16 py-8 text-xl inline-flex items-center gap-4 group">
            START A COLLABORATION
            <MessageSquare className="group-hover:rotate-12 transition-transform" />
          </a>
        </m.div>
      </div>
    </section>
  );
}
