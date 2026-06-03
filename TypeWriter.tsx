import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  lines: { text: string; pauseAfter: number }[];
  onComplete: () => void;
}

export function TypeWriter({ lines, onComplete }: TypeWriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (isTyping) {
      if (displayedText.length < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentLine.text.slice(0, displayedText.length + 1));
        }, 25 + Math.random() * 15);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedText("");
          setIsTyping(true);
        }, currentLine.pauseAfter);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLineIndex, displayedText, isTyping, lines, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {lines.slice(0, currentLineIndex).map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          className="text-lg md:text-2xl font-serif text-white glow-text tracking-wide"
        >
          {line.text}
        </motion.p>
      ))}
      {currentLineIndex < lines.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-3xl font-serif text-white glow-text tracking-wide min-h-[40px]"
        >
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block ml-1 w-[2px] h-[1em] bg-white align-middle"
          />
        </motion.p>
      )}
    </div>
  );
}
