"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/Construction.module.css";
import { FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const rotatingWords = [
  "Desarrollo Web",
  "Diseño UX/UI",
  "Marketing Digital",
  "Branding Corporativo",
];
const rotatingColors = ["#FFEB3B", "#4CAF50", "#F44336", "#2196F3"];

const Construction: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentColor = rotatingColors[currentWordIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % rotatingWords.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.constructionContainer}>
      <div className={styles.content}>
        <span className={styles.bigText}>
          <div className={styles.bottomLine}>
            <span className={styles.staticText}>Pronto podrás encontrar</span>
            <span
              className={styles.rotatingWord}
              style={{ color: currentColor }}
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </div>
        </span>

        <div className={styles.launchInfo}>
          Lanzamiento:{" "}
          <strong style={{ color: currentColor }}>30 de Noviembre, 2024</strong>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Progreso</span>
            <span className={styles.percentage} style={{ color: currentColor }}>
              15%
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: "15%",
                backgroundColor: currentColor,
              }}
            ></div>
          </div>
        </div>

        <div className={styles.contactRow}>
          <div className={styles.contactSection}>
            <FaEnvelope
              className={styles.contactIcon}
              style={{ color: currentColor }}
            />
            <span>contact@onextudio.com</span>
          </div>

          <div className={styles.socialIcons}>
            <a
              href="#"
              className={styles.socialIcon}
              style={{ color: currentColor }}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className={styles.socialIcon}
              style={{ color: currentColor }}
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className={styles.socialIcon}
              style={{ color: currentColor }}
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;
