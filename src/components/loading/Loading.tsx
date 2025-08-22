import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Loading.module.css";
import { LOGO_LIGHT_TRANSPARENT } from "@/assets/images";
import { LOADING_DURATION } from "@/assets/constants/loading";
import FloatingTexts from "../floatingtexts/FloatingTexts";

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(
        100,
        Math.floor((elapsed / LOADING_DURATION) * 100)
      );
      setProgress(newProgress);
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
    }, LOADING_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <FloatingTexts maxTexts={30} progress={progress} />

      <div className={styles.logo}>
        <Image
          src={LOGO_LIGHT_TRANSPARENT}
          alt="ONE Xtudio"
          width={200}
          height={100}
          className={styles.logoImage}
          priority
        />
      </div>

      <div className={styles.percentage}>{progress}%</div>
    </div>
  );
};

export default Loading;
