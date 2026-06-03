import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

interface VoiceNoteProps {
  label: string;
  duration: string;
}

export function VoiceNote({ label, duration }: VoiceNoteProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      className="flex items-center gap-4 bg-white/70 backdrop-blur-sm border border-slate-200 p-4 rounded-full w-full max-w-md shadow-sm cursor-pointer hover:bg-white/90 transition-colors"
      onClick={() => setIsPlaying(!isPlaying)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
        {isPlaying ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
      </button>
      
      <div className="flex-1 flex flex-col items-start overflow-hidden">
        <span className="font-sans text-sm text-slate-600 font-medium truncate w-full text-left">{label}</span>
        
        <div className="w-full flex items-center gap-1 mt-1 h-6">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-slate-300 rounded-full"
              animate={isPlaying ? {
                height: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`
                ]
              } : { height: "20%" }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <span className="font-sans text-xs text-slate-400 shrink-0 tabular-nums">
        {isPlaying ? "..." : duration}
      </span>
    </motion.div>
  );
}
