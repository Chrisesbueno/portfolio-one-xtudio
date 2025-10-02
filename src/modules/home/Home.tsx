"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/Home.module.css";

const rotatingWords = ["Creative", "Innovative", "Unique", "Impactful"];
const rotatingColors = ["#FFEB3B", "#4CAF50", "#F44336", "#2196F3"];

const Home: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % rotatingWords.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={`${styles.row} ${styles.row1}`}>
        <div className={`${styles.block} ${styles.row1Col1}`}>Col 40%</div>
        <div className={`${styles.block} ${styles.row1Col2}`}>Col 60%</div>
      </div>

      <div className={`${styles.row} ${styles.row2}`}>
        <div className={`${styles.block} ${styles.row2Col1}`}>
          <span className={styles.bigText}>
            <div>We Make</div>
            <div className={styles.bottomLine}>
              your ideas{" "}
              <span
                key={currentWordIndex}
                className={styles.rotatingWord}
                style={{ color: rotatingColors[currentWordIndex] }}
              >
                {rotatingWords[currentWordIndex]}
              </span>
            </div>
          </span>
        </div>
        <div className={`${styles.block} ${styles.row2Col2}`}>Col 40%</div>
      </div>

      <div className={`${styles.row} ${styles.row3}`}>
        <div className={`${styles.block} ${styles.row3Col1}`}>Col 40%</div>
        <div className={`${styles.block} ${styles.row3Col2}`}>Col 40%</div>
        <div className={`${styles.block} ${styles.row3Col3}`}>Col 20%</div>
      </div>
    </div>
  );
};

export default Home;
