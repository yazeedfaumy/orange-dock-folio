import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface Word {
  text: string;
  className?: string;
}

interface TypewriterEffectProps {
  words: Word[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex].text;
      
      if (currentCharIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + currentWord[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + " ");
          setCurrentWordIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentCharIndex, currentWordIndex, words]);

  const renderWords = () => {
    return words.map((word, idx) => {
      const wordStartIndex = words.slice(0, idx).reduce((acc, w) => acc + w.text.length + 1, 0);
      const wordEndIndex = wordStartIndex + word.text.length;
      const isCurrentWord = displayedText.length >= wordStartIndex && displayedText.length <= wordEndIndex;
      
      return (
        <span
          key={idx}
          className={cn(
            "text-foreground",
            word.className,
            displayedText.length > wordEndIndex ? "opacity-100" : isCurrentWord ? "opacity-100" : "opacity-0"
          )}
        >
          {word.text}
          {idx < words.length - 1 && " "}
        </span>
      );
    });
  };

  return (
    <div className={cn("text-4xl lg:text-5xl font-bold", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="inline"
      >
        {renderWords()}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className={cn("text-primary", cursorClassName)}
        >
          |
        </motion.span>
      </motion.div>
    </div>
  );
}