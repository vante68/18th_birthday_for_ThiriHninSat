import { motion } from "framer-motion";

interface BirthdayRevealProps {
  onEnter: () => void;
}

const FLOATERS = [
  { emoji: "✦", x: 8, y: 12, size: 28, delay: 0.3 },
  { emoji: "🌸", x: 85, y: 8, size: 34, delay: 0.8 },
  { emoji: "✦", x: 92, y: 55, size: 20, delay: 1.2 },
  { emoji: "🎀", x: 5, y: 48, size: 30, delay: 0.5 },
  { emoji: "🌟", x: 78, y: 22, size: 26, delay: 1.5 },
  { emoji: "🐱", x: 12, y: 72, size: 32, delay: 0.9 },
  { emoji: "✦", x: 50, y: 5, size: 18, delay: 1.8 },
  { emoji: "🦋", x: 88, y: 78, size: 28, delay: 0.6 },
  { emoji: "🌸", x: 3, y: 25, size: 22, delay: 2.0 },
  { emoji: "✦", x: 70, y: 88, size: 16, delay: 1.1 },
  { emoji: "🐶", x: 92, y: 38, size: 30, delay: 1.7 },
  { emoji: "🎀", x: 60, y: 93, size: 24, delay: 0.4 },
  { emoji: "💫", x: 22, y: 88, size: 26, delay: 2.2 },
  { emoji: "✦", x: 40, y: 92, size: 14, delay: 1.4 },
  { emoji: "🌟", x: 18, y: 38, size: 20, delay: 2.5 },
];

export default function BirthdayReveal({ onEnter }: BirthdayRevealProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.06, transition: { duration: 1.8 } }}
    >
      {/* Floating ambient elements */}
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: f.size }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.85, 0.6, 0.85],
            scale: [0.3, 1, 0.9, 1],
            y: [0, -12, 4, -8, 0],
            rotate: f.emoji === "✦" ? [0, 20, -10, 0] : [0, 5, -5, 0],
          }}
          transition={{
            opacity: { delay: f.delay, duration: 1.5 },
            scale: { delay: f.delay, duration: 1.5, type: "spring" },
            y: { delay: f.delay + 1.5, duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: f.delay + 1.5, duration: 6 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* Star particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: ["#fbbf24", "#f9a8d4", "#c4b5fd", "#ffffff"][i % 4],
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0, 1, 0.3, 1, 0],
            scale: [0.5, 1.5, 0.8, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        {/* Subtitle line */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ delay: 0.6, duration: 2.5 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(11px, 2.5vw, 16px)",
            color: "rgba(139,92,246,0.85)",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(139,92,246,0.4)",
          }}
        >
          June 13, 2008 — June 13, 2026
        </motion.p>

        {/* Happy 18th Birthday */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6.5vw, 64px)",
            color: "rgba(255,255,255,0.95)",
            fontWeight: 400,
            letterSpacing: "0.08em",
            textShadow: "0 0 40px rgba(196,181,253,0.5), 0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Happy 18th Birthday
        </motion.h1>

        {/* Name — hero element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 2.2, duration: 2.5, type: "spring", damping: 18 }}
          style={{ position: "relative" }}
        >
          {/* Glow behind name */}
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-20px -40px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <h2
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(48px, 12vw, 110px)",
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 0 60px rgba(249,168,212,0.7), 0 0 120px rgba(196,181,253,0.4), 0 4px 30px rgba(0,0,0,0.4)",
              position: "relative",
            }}
          >
            Thiri Hnin Sat
          </h2>
        </motion.div>

        {/* Decorative star row */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 3.6, duration: 1.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          {["✦", "·", "✦", "·", "✦", "·", "✦"].map((s, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              style={{
                color: i % 2 === 0 ? "#f9a8d4" : "rgba(255,255,255,0.4)",
                fontSize: i % 2 === 0 ? 18 : 10,
                textShadow: "0 0 10px rgba(249,168,212,0.6)",
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Cinematic enter element */}
        <motion.button
          data-testid="button-enter-diary"
          onClick={onEnter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1.8, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 16,
            padding: "18px 64px",
            background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.2))",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 60,
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(15px, 3vw, 22px)",
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(255,255,255,0.4)",
              position: "relative",
            }}
          >
            ✦ &nbsp; Begin &nbsp; ✦
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
