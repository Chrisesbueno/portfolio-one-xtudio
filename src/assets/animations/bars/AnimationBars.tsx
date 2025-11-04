"use client";
import React, { useState, useEffect } from "react";
import styles from "./AnimationBars.module.css";

interface AnimationBarsProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

const AnimationBars: React.FC<AnimationBarsProps> = ({ isOpen, children }) => {
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowCloseAnimation(true);
      const timer = setTimeout(() => {
        setShowCloseAnimation(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.animationContainer} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      {children}
      <div
        className={`${styles.bar} ${styles.bar1} ${
          showCloseAnimation ? styles.closeAnimation : ""
        }`}
      ></div>
      <div
        className={`${styles.bar} ${styles.bar2} ${
          showCloseAnimation ? styles.closeAnimation : ""
        }`}
      ></div>
      <div
        className={`${styles.bar} ${styles.bar3} ${
          showCloseAnimation ? styles.closeAnimation : ""
        }`}
      ></div>
    </div>
  );
};

export default AnimationBars;
