import { motion } from "framer-motion";

interface RibbonDecorProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function RibbonDecor({ position }: RibbonDecorProps) {
  const getPositionClasses = () => {
    switch (position) {
      case "top-left": return "top-4 left-4";
      case "top-right": return "top-4 right-4";
      case "bottom-left": return "bottom-4 left-4";
      case "bottom-right": return "bottom-4 right-4";
    }
  };

  const getRotation = () => {
    switch (position) {
      case "top-left": return "-15deg";
      case "top-right": return "15deg";
      case "bottom-left": return "-15deg";
      case "bottom-right": return "15deg";
    }
  };

  return (
    <motion.div
      className={`absolute ${getPositionClasses()} text-4xl opacity-50 text-pink-300 select-none pointer-events-none`}
      initial={{ rotate: getRotation() }}
      animate={{ 
        rotate: [getRotation(), `calc(${getRotation()} + 5deg)`, getRotation()],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      🎀
    </motion.div>
  );
}
