import { useEffect } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { FloatingBalloons } from "@/components/FloatingBalloons";

interface SkyRevealProps {
  onComplete: () => void;
}

export default function SkyReveal({ onComplete }: SkyRevealProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      initial={{ backgroundColor: "hsl(240, 50%, 10%)" }}
      animate={{ backgroundColor: ["hsl(240, 50%, 10%)", "hsl(260, 40%, 30%)", "hsl(280, 40%, 98%)"] }}
      transition={{ duration: 4, ease: "easeInOut" }}
      exit={{ opacity: 1 }} // It just stays and the next component mounts on top
    >
      {/* Background Gradient Layer for Dawn */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-pink-200/50 via-purple-200/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      
      <Particles type="stars" count={40} />
      <Particles type="clouds" count={15} />
      <FloatingBalloons count={8} />
    </motion.div>
  );
}
