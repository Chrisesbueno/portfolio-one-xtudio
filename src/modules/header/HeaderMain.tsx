"use client";
import Loading from "@/components/loading/Loading";
import { useState, useEffect } from "react";

const HeaderMain: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading && <Loading />}

      <div>
        {isLoading && <Loading />}

        <h1>Bienvenido a ONE XTUDIO</h1>
      </div>
    </div>
  );
};

export default HeaderMain;
