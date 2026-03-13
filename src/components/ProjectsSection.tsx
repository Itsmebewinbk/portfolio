import { m, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { memo, useRef } from "react";

const projects = [
  {
    title: "Sailors Hub",
    tag: "DJANGO + AWS",
    desc: "A comprehensive LinkedIn + Udemy style platform featuring job search, professional courses, and real-time chat functionality.",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "Elite Zoho Automation",
    tag: "FINANCIAL AUTOMATION",
    desc: "Custom financial automation system integrated with Zoho Books. Handles GST compliance, invoice automation, and multi-currency synchronization.",
    color: "from-emerald-100 to-emerald-50"
  },
  {
    title: "AOW & BGM",
    tag: "IOT PLATFORM",
    desc: "Real-time device monitoring system using MQTT and AWS. Includes a live data analytics dashboard for industrial equipment monitoring.",
    color: "from-indigo-100 to-indigo-50"
  },
  {
    title: "Cozat Myrent",
    tag: "PROPERTY MGMT",
    desc: "Professional property management system facilitating seamless tenant communication and automated rent tracking.",
    color: "from-sky-100 to-sky-50"
  },
  {
    title: "RoseApp",
    tag: "EDTECH",
    desc: "Sleek online tutoring platform with a dedicated educator dashboard and class management system.",
    color: "from-cyan-100 to-cyan-50"
  },
  {
    title: "Mastermart",
    tag: "LISTING PLATFORM",
    desc: "Dynamic business listing platform designed for high-impact product and service showcases and listing management.",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "Resort Rover",
    tag: "BOOKING SYSTEM",
    desc: "Sophisticated resort booking system featuring dynamic payment calculation and comprehensive service tracking.",
    color: "from-teal-100 to-teal-50"
  },
];

const ProjectCard = memo(function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Cinematic 3D transformations
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 15]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <m.div
      ref={cardRef}
      style={{ 
        scale, 
        rotateX, 
        opacity,
        filter,
        y: yParallax
      }}
      className="glass-shinkai group overflow-hidden border-none shadow-xl hover:shadow-2xl h-full flex flex-col dark:glow-box-hover dark:three-d-card dark:hover:bg-white/[0.03] perspective-2000"
    >
      {/* Cinematic Lens Flare / Light Sweep */}
      <m.div 
        style={{ 
          left: useTransform(scrollYProgress, [0, 1], ["-150%", "150%"]) 
        }}
        className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 blur-3xl z-20 pointer-events-none" 
      />

      {/* Light mode gradient header */}
      <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden p-10 dark:hidden`}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute bottom-4 left-4">
           <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-xl text-[10px] font-black tracking-widest uppercase text-blue-600 border border-white/50">
            {project.tag}
           </span>
        </div>
      </div>

      {/* Dark mode header bar */}
      <div className="hidden dark:block p-10 pb-0">
        <div className="w-12 h-1 bg-blue-500/50 mb-6 rounded-full" />
        <span className="px-4 py-1.5 bg-white/5 rounded-xl text-[10px] font-black tracking-widest uppercase text-blue-400 border border-white/5">
          {project.tag}
        </span>
      </div>
      
      <div className="p-10 flex-1">
        <h3 className="text-3xl font-black text-blue-600 mb-6 tracking-tight uppercase italic group-hover:translate-x-2 transition-transform leading-none dark:text-white dark:not-italic dark:text-2xl">
          {project.title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg font-medium dark:text-white/60">
          {project.desc}
        </p>
      </div>

      <div className="p-10 pt-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-1 bg-blue-500/20 rounded-full dark:bg-blue-500/50" />
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest dark:text-white/30">Engineering Record // Verified</span>
        </div>
      </div>
    </m.div>
  );
});

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-blue-600 text-center tracking-tighter mb-4 uppercase dark:text-white dark:glow-text">Commercial Portfolio</h2>
          <div className="w-32 h-2 bg-blue-500/20 rounded-full dark:bg-blue-600/30 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
        </div>
        
      <div className="max-w-7xl mx-auto perspective-2000">
        <m.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid gap-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        >
          {projects.map((p, i) => (
            <div key={i} className={i % 2 === 0 ? "lg:mt-32" : ""}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </m.div>
      </div>
      </div>
    </section>
  );
}
