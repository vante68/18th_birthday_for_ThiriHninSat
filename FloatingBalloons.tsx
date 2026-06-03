import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "bg-pink-300/40",
  "bg-blue-300/40",
  "bg-purple-300/40",
  "bg-yellow-200/40",
];

export function FloatingBalloons({ count = 5 }: { count?: number }) {
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; color: string; duration: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      scale: Math.random() * 0.5 + 0.8,
    }));
    setBalloons(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute bottom-[-150px] w-16 h-20 rounded-[50%] ${b.color} backdrop-blur-sm shadow-lg`}
          style={{ left: `${b.x}%`, transform: `scale(${b.scale})` }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", "20px", "-20px", "0px"],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            y: { duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay },
            x: { duration: b.duration / 3, repeat: Infinity, ease: "easeInOut", delay: b.delay },
            rotate: { duration: b.duration / 2, repeat: Infinity, ease: "easeInOut", delay: b.delay }
          }}
        >
          {/* Balloon string */}
          <div className="absolute bottom-[-20px] left-1/2 w-[1px] h-6 bg-white/30 transform -translate-x-1/2"></div>
        </motion.div>
      ))}
    </div>
  );
}
