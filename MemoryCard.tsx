import { motion } from "framer-motion";

interface MemoryCardProps {
  date: string;
  title: string;
  text: string;
}

export function MemoryCard({ date, title, text }: MemoryCardProps) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-sm text-left group cursor-pointer"
      whileHover={{ 
        y: -10, 
        rotate: Math.random() * 4 - 2, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-center mb-4 border-b border-pink-100 pb-2">
        <h3 className="font-serif text-slate-800 text-lg group-hover:text-pink-600 transition-colors">{title}</h3>
        <span className="font-sans text-xs text-slate-400 uppercase tracking-wider">{date}</span>
      </div>
      <p className="font-handwriting text-slate-600 text-xl leading-relaxed">{text}</p>
    </motion.div>
  );
}
