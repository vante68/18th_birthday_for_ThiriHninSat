import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HiddenMessageProps {
  message: string;
  x: number;
  y: number;
}

export function HiddenMessage({ message, x, y }: HiddenMessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="text-yellow-400 cursor-pointer text-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2 + Math.random(), repeat: Infinity }}
      >
        ✦
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-pink-100 z-50 pointer-events-none"
          >
            <p className="font-handwriting text-pink-600 text-xl">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
