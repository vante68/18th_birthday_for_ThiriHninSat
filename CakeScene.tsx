import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CakeSceneProps {
  onComplete: () => void;
  onStopHBSong: () => void;
}

type Phase = "decorating" | "wish" | "blow" | "book";

const CELEBRATE = ["🎉","🎊","🎈","✨","💫","🌟","🥳","💕","🎀","⭐","🌸","💖","🎁","🦋","🎶","🍰","🌈","💝"];

// Decorations that fly IN from off-screen to surround the cake
const DECORATIONS = [
  { emoji: "🎈", toX: -130, toY: -160, from: "top-left",  delay: 1,    dur: 2.2 },
  { emoji: "🎀", toX:  130, toY: -140, from: "top-right", delay: 1.5,  dur: 2.0 },
  { emoji: "✨", toX: -180, toY:  -50, from: "left",      delay: 2.2,  dur: 1.8 },
  { emoji: "🌟", toX:  170, toY:  -60, from: "right",     delay: 2.8,  dur: 2.0 },
  { emoji: "🌸", toX: -100, toY:  120, from: "bottom-left",delay: 3.4, dur: 1.9 },
  { emoji: "🌸", toX:  110, toY:  130, from: "bottom-right",delay: 3.9,dur: 2.1 },
  { emoji: "🎊", toX:  -60, toY: -200, from: "top",       delay: 4.5,  dur: 2.3 },
  { emoji: "💫", toX:   60, toY: -190, from: "top",       delay: 5.0,  dur: 2.0 },
  { emoji: "🎁", toX: -200, toY:   40, from: "left",      delay: 5.6,  dur: 2.2 },
  { emoji: "🎈", toX:  195, toY:   30, from: "right",     delay: 6.1,  dur: 2.0 },
  { emoji: "💖", toX: -150, toY: -120, from: "top-left",  delay: 6.8,  dur: 1.8 },
  { emoji: "⭐", toX:  155, toY: -110, from: "top-right", delay: 7.3,  dur: 1.9 },
  { emoji: "🎀", toX:    0, toY: -230, from: "top",       delay: 8.0,  dur: 2.1 },
  { emoji: "🌙", toX: -220, toY: -10,  from: "left",      delay: 8.5,  dur: 2.0 },
  { emoji: "🦋", toX:  215, toY: -20,  from: "right",     delay: 9.0,  dur: 2.2 },
  { emoji: "✨", toX:   85, toY:  175, from: "bottom",    delay: 9.6,  dur: 1.8 },
  { emoji: "💫", toX:  -80, toY:  170, from: "bottom",    delay: 10.2, dur: 2.0 },
  { emoji: "🌸", toX:   0,  toY:  210, from: "bottom",    delay: 10.8, dur: 1.9 },
];

const FROM_POSITIONS: Record<string, { x: number; y: number }> = {
  "top-left":    { x: -400, y: -400 },
  "top-right":   { x:  400, y: -400 },
  "top":         { x:    0, y: -500 },
  "left":        { x: -500, y:    0 },
  "right":       { x:  500, y:    0 },
  "bottom-left": { x: -400, y:  400 },
  "bottom-right":{ x:  400, y:  400 },
  "bottom":      { x:    0, y:  500 },
};

// Trigger wish phase after decorations are all in (~13s) + a few seconds to enjoy
const WISH_DELAY = 16000;

export default function CakeScene({ onComplete, onStopHBSong }: CakeSceneProps) {
  const [phase, setPhase] = useState<Phase>("decorating");
  const [candleBlown, setCandleBlown] = useState(false);
  const [smokeExpanding, setSmokeExpanding] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [celebParticles] = useState(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      emoji: CELEBRATE[Math.floor(Math.random() * CELEBRATE.length)],
      angle: (i / 50) * 360 + Math.random() * 15,
      dist: 100 + Math.random() * 250,
      dur: 1.2 + Math.random() * 1.2,
      size: 20 + Math.random() * 26,
    }))
  );
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("wish"), WISH_DELAY);
    return () => clearTimeout(t);
  }, []);

  const handleWishDone = () => setPhase("blow");

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 3000);

    // Smoke expands to fill screen then transition
    setTimeout(() => {
      setSmokeExpanding(true);
      onStopHBSong();
    }, 1400);
    setTimeout(() => setPhase("book"), 3200);
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a0533 0%, #2d1b6e 45%, #7c3aed 80%, #db2777 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 1 } }}
      transition={{ duration: 1.5 }}
    >
      {/* Twinkling background stars */}
      {Array.from({ length: 45 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 70}%`, width: `${1 + Math.random() * 3}px`, height: `${1 + Math.random() * 3}px` }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      {/* ─── CAKE + DECORATING + BLOW PHASES ─── */}
      <AnimatePresence>
        {(phase === "decorating" || phase === "wish" || phase === "blow") && (
          <motion.div
            key="cake-world"
            className="relative flex flex-col items-center z-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {/* Flying-in decorations */}
            {DECORATIONS.map((d, i) => {
              const from = FROM_POSITIONS[d.from];
              return (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{ fontSize: 28, zIndex: 20 }}
                  initial={{ x: from.x, y: from.y, opacity: 0, scale: 0.3 }}
                  animate={{ x: d.toX, y: d.toY, opacity: 1, scale: 1 }}
                  transition={{ delay: d.delay, duration: d.dur, type: "spring", damping: 14, stiffness: 60 }}
                >
                  <motion.span
                    animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3.5 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: d.delay + d.dur }}
                  >
                    {d.emoji}
                  </motion.span>
                </motion.div>
              );
            })}

            {/* Celebration particles on blow */}
            {showParticles && celebParticles.map(p => (
              <motion.div key={p.id} className="absolute pointer-events-none select-none z-50"
                style={{ fontSize: p.size, top: "0%", left: "50%" }}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: [1, 1, 0], scale: [0, 1.6, 1], x: Math.cos((p.angle * Math.PI) / 180) * p.dist, y: Math.sin((p.angle * Math.PI) / 180) * p.dist }}
                transition={{ duration: p.dur, ease: "easeOut" }}
              >
                {p.emoji}
              </motion.div>
            ))}

            {/* ─── COMPLETE CAKE (always fully rendered) ─── */}
            <div className="flex flex-col items-center" style={{ position: "relative" }}>

              {/* CANDLE */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 80, position: "relative" }}>
                {/* Flame */}
                <AnimatePresence>
                  {!candleBlown && (
                    <motion.div key="flame"
                      style={{ position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)" }}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0, y: 6, transition: { duration: 0.5 } }}
                      transition={{ delay: 0.5, duration: 1.2 }}
                    >
                      <motion.div style={{ width: 22, height: 34, borderRadius: "50% 50% 30% 30%", background: "radial-gradient(ellipse at 60% 70%, #fff9c4, #fbbf24 40%, #f97316 70%, transparent)", filter: "blur(1.5px)" }}
                        animate={{ scaleX: [1, 1.2, 0.88, 1], scaleY: [1, 0.88, 1.12, 1], y: [0, -4, 2, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      />
                      <motion.div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", width: 10, height: 16, borderRadius: "50% 50% 30% 30%", background: "#fff" }}
                        animate={{ scaleX: [1, 1.1, 0.95, 1] }} transition={{ duration: 0.55, repeat: Infinity }}
                      />
                      {/* Glow halo */}
                      <motion.div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(251,191,36,0.4), transparent 70%)" }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke when blown */}
                <AnimatePresence>
                  {candleBlown && !smokeExpanding && (
                    <motion.div key="smoke" style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)" }}
                      initial={{ opacity: 0.9, y: 0, scaleX: 0.5, scaleY: 0.5 }}
                      animate={{ opacity: 0, y: -60, scaleX: 2.5, scaleY: 2 }}
                      transition={{ duration: 1.6 }}
                    >
                      <div style={{ width: 16, height: 40, borderRadius: 12, background: "rgba(220,220,230,0.6)", filter: "blur(6px)" }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle body */}
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 18, height: 64, background: "linear-gradient(to bottom, #f9a8d4, #ec4899)", borderRadius: "5px 5px 3px 3px", boxShadow: "inset -3px 0 8px rgba(0,0,0,0.15)" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "#fbbf24", borderRadius: "5px 5px 0 0" }} />
                  {[14, 28, 44].map(t => (
                    <div key={t} style={{ position: "absolute", top: t, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.35)" }} />
                  ))}
                </div>
              </div>

              {/* CAKE — single beautiful layer */}
              <div style={{ position: "relative" }}>
                {/* Main cake body */}
                <div style={{
                  width: 280, height: 130,
                  background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 40%, #ddd6fe 70%, #fce7f3 100%)",
                  borderRadius: "16px 16px 8px 8px",
                  border: "2.5px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 8px 40px rgba(139,92,246,0.5), 0 0 80px rgba(236,72,153,0.2), inset 0 3px 12px rgba(255,255,255,0.4)",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Frosting drips along top */}
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} style={{ position: "absolute", top: -2, left: 4 + i * 20, width: 15, height: 14 + (i % 5) * 4, background: "white", borderRadius: "0 0 10px 10px", opacity: 0.92 }} />
                  ))}

                  {/* Horizontal frosting stripe */}
                  <div style={{ position: "absolute", top: 44, left: 0, right: 0, height: 2.5, background: "rgba(255,255,255,0.5)" }} />
                  <div style={{ position: "absolute", top: 90, left: 0, right: 0, height: 2.5, background: "rgba(255,255,255,0.35)" }} />

                  {/* Decorative dots top half */}
                  {[18, 50, 82, 114, 146, 178, 210, 242].map((x, i) => (
                    <div key={i} style={{ position: "absolute", top: 18, left: x, width: 11, height: 11, borderRadius: "50%", background: i % 2 === 0 ? "#a855f7" : "#ec4899", boxShadow: `0 0 8px ${i % 2 === 0 ? "#a855f7" : "#ec4899"}` }} />
                  ))}

                  {/* Birthday text */}
                  <div style={{ position: "absolute", top: 54, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 19, color: "#6d28d9", fontWeight: 700, textShadow: "0 1px 4px rgba(255,255,255,0.8)", lineHeight: 1.3, textAlign: "center", padding: "0 12px" }}>
                      Happy Birthday,
                    </p>
                    <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 17, color: "#7c3aed", fontWeight: 700, textShadow: "0 1px 4px rgba(255,255,255,0.8)" }}>
                      Thiri Hnin Sat
                    </p>
                  </div>

                  {/* Decorative dots bottom half */}
                  {[30, 70, 110, 150, 190, 230, 260].map((x, i) => (
                    <div key={i} style={{ position: "absolute", top: 108, left: x, fontSize: 14, color: i % 2 === 0 ? "rgba(168,85,247,0.7)" : "rgba(236,72,153,0.7)" }}>
                      {i % 3 === 0 ? "✦" : i % 3 === 1 ? "♡" : "·"}
                    </div>
                  ))}
                </div>

                {/* Plate */}
                <div style={{ width: 330, height: 20, marginLeft: -25, marginTop: -2, background: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.2))", borderRadius: "0 0 60% 60%", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }} />
              </div>
            </div>

            {/* "Blow the Candle" button (blow phase only) */}
            {phase === "blow" && (
              <motion.div className="flex flex-col items-center gap-4 mt-10"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              >
                <motion.button
                  data-testid="button-blow-candle"
                  onClick={handleBlowCandle}
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={candleBlown}
                  style={{
                    padding: "16px 52px",
                    background: "linear-gradient(135deg, #ec4899, #a855f7)",
                    borderRadius: 50,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    color: "white",
                    fontWeight: 600,
                    border: "2px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 0 30px rgba(236,72,153,0.5), 0 8px 24px rgba(0,0,0,0.3)",
                    cursor: candleBlown ? "default" : "pointer",
                    letterSpacing: "0.03em",
                  }}
                >
                  🕯️ Blow the Candle
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SMOKE FILL OVERLAY ─── */}
      <AnimatePresence>
        {smokeExpanding && (
          <motion.div
            key="smoke-fill"
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0, scale: 0.05, borderRadius: "50%" }}
            animate={{ opacity: [0, 0.7, 1], scale: [0.05, 3, 6], borderRadius: ["50%", "30%", "0%"] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ background: "radial-gradient(ellipse, rgba(240,235,255,0.95) 0%, rgba(200,190,255,0.85) 40%, rgba(139,92,246,0.6) 80%)", transformOrigin: "center center" }}
          />
        )}
      </AnimatePresence>

      {/* ─── MAKE A WISH OVERLAY ─── */}
      <AnimatePresence>
        {phase === "wish" && (
          <motion.div
            key="wish"
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.2 }}
            style={{ backdropFilter: "blur(22px)", background: "rgba(10,5,30,0.65)" }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div key={i} className="absolute pointer-events-none select-none"
                style={{ left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`, fontSize: 14 + Math.random() * 18, color: ["#f9a8d4","#c4b5fd","#fde68a","#ffffff"][i % 4] }}
                animate={{ y: [0, -22, 0], opacity: [0.3, 1, 0.3], rotate: [0, 18, -18, 0] }}
                transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              >✦</motion.div>
            ))}
            <motion.div className="text-center px-8 flex flex-col items-center gap-8"
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1.2 }}
            >
              <motion.p
                animate={{ textShadow: ["0 0 40px rgba(196,181,253,0.6), 0 0 80px rgba(219,39,119,0.4)", "0 0 70px rgba(196,181,253,0.9), 0 0 120px rgba(219,39,119,0.6)", "0 0 40px rgba(196,181,253,0.6), 0 0 80px rgba(219,39,119,0.4)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(48px, 10vw, 96px)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
              >
                Make a Wish ✨
              </motion.p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 3vw, 24px)", color: "rgba(252,231,243,0.8)", letterSpacing: "0.05em" }}>
                Close your eyes and wish for something beautiful
              </p>
              <motion.button
                data-testid="button-wish-done"
                onClick={handleWishDone}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: 12, padding: "16px 60px", background: "linear-gradient(135deg, #ec4899, #a855f7)", borderRadius: 50, fontFamily: "'Playfair Display', serif", fontSize: 22, color: "white", fontWeight: 600, border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 0 30px rgba(236,72,153,0.5), 0 8px 24px rgba(0,0,0,0.3)", cursor: "pointer", letterSpacing: "0.04em" }}
              >
                Done ✓
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── BOOK PAGE ─── */}
      <AnimatePresence>
        {phase === "book" && (
          <motion.div
            key="book"
            className="absolute inset-0 flex flex-col items-center justify-center z-50 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            style={{ background: "linear-gradient(160deg, #0f0a1e 0%, #1e1035 50%, #2d1b6e 100%)" }}
          >
            {Array.from({ length: 35 }).map((_, i) => (
              <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${1 + Math.random() * 2.5}px`, height: `${1 + Math.random() * 2.5}px` }}
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
              />
            ))}
            <motion.div className="flex flex-col items-center gap-8 text-center"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1.4 }}
            >
              <motion.div
                animate={{ rotateY: [0, 12, -12, 0], scale: [1, 1.07, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "clamp(72px, 15vw, 130px)", filter: "drop-shadow(0 0 30px rgba(196,181,253,0.7))" }}
              >
                📖
              </motion.div>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(38px, 8.5vw, 84px)", color: "#fff", fontWeight: 700, lineHeight: 1.15, textShadow: "0 0 50px rgba(196,181,253,0.7), 0 4px 20px rgba(0,0,0,0.6)" }}>
                The Diary About You
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 4vw, 30px)", color: "rgba(221,214,254,0.88)", letterSpacing: "0.04em" }}>
                Do you want to read it?
              </p>
              <div className="flex items-center gap-8 mt-4 flex-wrap justify-center">
                <motion.button
                  data-testid="button-yes-diary"
                  onClick={onComplete}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: 1 + noCount * 0.14 }}
                  transition={{ type: "spring" }}
                  style={{ padding: "16px 60px", background: "linear-gradient(135deg, #ec4899, #a855f7)", borderRadius: 50, fontFamily: "'Playfair Display', serif", fontSize: Math.min(22 + noCount * 5, 48), color: "white", fontWeight: 700, border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 0 30px rgba(236,72,153,0.6), 0 8px 24px rgba(0,0,0,0.3)", cursor: "pointer" }}
                >
                  Yes 🎀
                </motion.button>
                <motion.button
                  data-testid="button-no-diary"
                  onClick={() => setNoCount(n => n + 1)}
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.88 }}
                  style={{ padding: "14px 44px", background: "transparent", borderRadius: 50, fontFamily: "'Playfair Display', serif", fontSize: 20, color: "rgba(196,181,253,0.65)", fontWeight: 400, border: "2px solid rgba(196,181,253,0.25)", cursor: "pointer" }}
                >
                  No
                </motion.button>
              </div>
              <AnimatePresence>
                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: 22, color: "#f9a8d4", textShadow: "0 0 12px rgba(249,168,212,0.5)" }}
                  >
                    {noCount === 1 ? "Are you sure? 🥺" : noCount === 2 ? "It was made just for you... 💕" : "Please? Just say yes ✨"}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
