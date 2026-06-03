import { motion } from "framer-motion";

interface FinalPageProps {
  onRestart: () => void;
}

export default function FinalPage({ onRestart }: FinalPageProps) {
  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {/* Sky background photo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Soft overlay so text is readable */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to bottom, rgba(180,210,255,0.25) 0%, rgba(255,230,240,0.45) 60%, rgba(255,255,255,0.65) 100%)" }} />

      {/* Floating clouds */}
      {[
        { w: 180, top: "8%", left: "-10%", dur: 28 },
        { w: 220, top: "20%", left: "-15%", dur: 34, delay: 6 },
        { w: 150, top: "5%",  left: "-8%",  dur: 22, delay: 12 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute z-10 pointer-events-none"
          style={{ top: c.top, width: c.w, opacity: 0.55 }}
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{ duration: c.dur, delay: c.delay ?? 0, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 80" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="60" rx="90" ry="28" />
            <ellipse cx="70"  cy="45" rx="50" ry="30" />
            <ellipse cx="130" cy="48" rx="45" ry="28" />
          </svg>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        {/* Big heart */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1.5rem", filter: "drop-shadow(0 4px 24px rgba(255,100,150,0.5))" }}
        >
          🤍
        </motion.div>

        {/* Main message */}
        <motion.h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
            fontWeight: 700,
            color: "#5a1a6e",
            textShadow: "0 2px 24px rgba(255,255,255,0.9), 0 0 60px rgba(200,150,255,0.4)",
            lineHeight: 1.25,
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          I Love Thiri Hnin Sat!
        </motion.h1>

        {/* Restart button */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "2.5rem",
            padding: "10px 36px",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(180,130,220,0.4)",
            borderRadius: 50,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.85rem",
            color: "#6d28d9",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Close the diary
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
