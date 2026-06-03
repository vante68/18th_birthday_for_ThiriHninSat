import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { TypeWriter } from "@/components/TypeWriter";

interface OpeningProps {
  onComplete: () => void;
}

export default function Opening({ onComplete }: OpeningProps) {
  const lines = [
    { text: "Loading memories…", pauseAfter: 600 },
    { text: "Collecting feelings…", pauseAfter: 600 },
    { text: "One girl changed everything.", pauseAfter: 700 },
    { text: "Access granted.", pauseAfter: 500 },
  ];

  return (
    <motion.div
      className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 2 } }}
    >
      <Particles type="clouds" count={10} />
      <TypeWriter lines={lines} onComplete={onComplete} />
    </motion.div>
  );
}
