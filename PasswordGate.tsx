import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RibbonDecor } from "@/components/RibbonDecor";

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "982023") {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setInput("");
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fce4ec 0%, #e8eaf6 40%, #e3f2fd 100%)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)", transition: { duration: 1 } }}
      transition={{ duration: 1 }}
    >
      <RibbonDecor position="top-left" />
      <RibbonDecor position="top-right" />
      <RibbonDecor position="bottom-left" />
      <RibbonDecor position="bottom-right" />

      {/* Floating sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 select-none pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: `${10 + Math.random() * 14}px`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          ✦
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6"
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Lock icon */}
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🔒
        </motion.div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-700 mb-2 tracking-wide">
            This diary is private
          </h2>
          <p className="font-handwriting text-slate-500 text-lg">
            Enter the secret password to open it
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <motion.input
            data-testid="input-password"
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="✦ ✦ ✦ ✦ ✦ ✦"
            className="w-full text-center text-xl tracking-[0.5em] px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-md shadow-lg focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(255,182,193,0.4)] transition-all font-serif text-slate-700 placeholder:tracking-widest placeholder:text-pink-300"
            animate={error ? { borderColor: "#f87171" } : { borderColor: "#fbcfe8" }}
            autoFocus
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 font-sans text-sm"
              >
                That's not it. Try again, love.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            data-testid="button-unlock-diary"
            type="submit"
            className="mt-2 px-10 py-3 bg-pink-400 text-white rounded-full font-serif text-lg shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:shadow-[0_0_30px_rgba(244,114,182,0.6)] hover:bg-pink-500 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Open the Diary 🎀
          </motion.button>
        </form>

        <p className="font-handwriting text-slate-400 text-sm italic">
          Only she would know...
        </p>
      </motion.div>
    </motion.div>
  );
}
