import { useEffect, useState } from "react";

export const typewriterEffect = (
  text: string,
  speed: number = 50,
  onProgress?: (currentText: string) => void,
  onComplete?: () => void
): { start: () => void; stop: () => void } => {
  let currentIndex = 0;
  let displayedText = "";
  let timer: NodeJS.Timeout | null = null;
  let isStopped = false;

  const start = () => {
    isStopped = false;
    displayedText = "";
    currentIndex = 0;

    const type = () => {
      if (isStopped || currentIndex >= text.length) {
        if (currentIndex >= text.length && onComplete) {
          onComplete();
        }
        return;
      }

      displayedText += text[currentIndex];
      currentIndex++;

      if (onProgress) {
        onProgress(displayedText);
      }

      timer = setTimeout(type, speed);
    };

    type();
  };

  const stop = () => {
    isStopped = true;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return { start, stop };
};

export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const { start, stop } = typewriterEffect(
      text,
      speed,
      setDisplayedText,
      () => setIsComplete(true)
    );

    start();

    return stop;
  }, [text, speed]);

  return { displayedText, isComplete };
};
