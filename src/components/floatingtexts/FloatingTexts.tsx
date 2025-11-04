import { FLOATING_TEXTS } from "@/assets/constants/floatingtexts";
import React, { useEffect, useState, useRef } from "react";
import styles from "./FloatingTexts.module.css";

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  visible: boolean;
  fontSize: number;
  elementRef: React.RefObject<HTMLDivElement | null>;
}

interface FloatingTextsProps {
  maxTexts?: number;
  progress?: number;
}

const FloatingTexts: React.FC<FloatingTextsProps> = ({
  maxTexts = 8,
  progress = 0,
}) => {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const animationRef = useRef<number>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialTexts: FloatingText[] = [];

    for (let i = 0; i < maxTexts; i++) {
      const randomText =
        FLOATING_TEXTS[Math.floor(Math.random() * FLOATING_TEXTS.length)];
      initialTexts.push({
        id: i,
        text: randomText,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        opacity: 0,
        visible: false,
        fontSize: 14 + Math.random() * 12,
        elementRef: React.createRef(),
      });
    }

    setFloatingTexts(initialTexts);
  }, [maxTexts]);

  useEffect(() => {
    if (maxTexts <= 0) return;

    const textsToShow = Math.floor((progress / 100) * maxTexts);

    setFloatingTexts((prevTexts) => {
      return prevTexts.map((text, index) => {
        const shouldBeVisible = index < textsToShow;

        if (text.visible === shouldBeVisible) return text;

        return {
          ...text,
          visible: shouldBeVisible,
        };
      });
    });
  }, [progress, maxTexts]);

  useEffect(() => {
    const animate = () => {
      setFloatingTexts((prevTexts) => {
        return prevTexts.map((text) => {
          let newX = text.x + text.vx;
          let newY = text.y + text.vy;
          let newVx = text.vx;
          let newVy = text.vy;
          let newOpacity = text.opacity;

          if (text.visible && text.opacity < 0.9) {
            newOpacity = Math.min(text.opacity + 0.05, 0.9);
          } else if (!text.visible && text.opacity > 0) {
            newOpacity = Math.max(text.opacity - 0.05, 0);
          }

          if (newX <= 0 || newX >= 100) {
            newVx = -newVx * 0.95;
            newX = newX <= 0 ? 0 : 100;
          }

          if (newY <= 0 || newY >= 100) {
            newVy = -newVy * 0.95;
            newY = newY <= 0 ? 0 : 100;
          }

          if (text.elementRef.current) {
            text.elementRef.current.style.left = `${newX}%`;
            text.elementRef.current.style.top = `${newY}%`;
            text.elementRef.current.style.opacity = `${newOpacity}`;
          }

          return {
            ...text,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            opacity: newOpacity,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.floatingContainer}>
      {floatingTexts.map((text) => (
        <div
          key={text.id}
          ref={text.elementRef}
          className={styles.floatingText}
          style={{
            left: `${text.x}%`,
            top: `${text.y}%`,
            opacity: text.opacity,
            fontSize: `${text.fontSize}px`,
            transition: "opacity 0.5s ease-in-out",
            zIndex: Math.floor(text.y * 10),
          }}
        >
          {text.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingTexts;
