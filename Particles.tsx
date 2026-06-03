import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticlesProps {
  count?: number;
  type?: "clouds" | "stars";
}

export function Particles({ count = 30, type = "stars" }: ParticlesProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === "stars" ? Math.random() * 3 + 1 : Math.random() * 100 + 50,
      duration: type === "stars" ? Math.random() * 3 + 2 : Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generated);

    if (type === "stars") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [count, type]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => {
        if (type === "stars") {
          return (
            <motion.div
              key={p.id}
              className="absolute bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{
                opacity: { duration: p.duration, repeat: Infinity, delay: p.delay },
                scale: { duration: p.duration, repeat: Infinity, delay: p.delay },
                x: { type: "spring", stiffness: 50, damping: 20 },
                y: { type: "spring", stiffness: 50, damping: 20 },
              }}
            />
          );
        } else {
          // Clouds
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/5 blur-3xl"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                x: ["-5%", "5%", "-5%"],
                y: ["-2%", "2%", "-2%"],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
            />
          );
        }
      })}
    </div>
  );
}
