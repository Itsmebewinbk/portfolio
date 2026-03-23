import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Use CSS properties to avoid React re-renders on every mouse move
      if (ref.current) {
        ref.current.style.setProperty('--cursor-x', `${e.clientX}px`);
        ref.current.style.setProperty('--cursor-y', `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div 
      ref={ref}
      className="cursor-glow hidden md:block" 
      style={{ left: 'var(--cursor-x, -500px)', top: 'var(--cursor-y, -500px)' }} 
      aria-hidden="true"
    />
  );
}
