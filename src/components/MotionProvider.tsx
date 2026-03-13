import React, { createContext, useContext, useState, ReactNode } from "react";

interface MotionContextType {
  speed: number;
  setSpeed: (v: number) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <MotionContext.Provider value={{ speed, setSpeed, intensity, setIntensity, isPaused, setIsPaused }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used within MotionProvider");
  return context;
};
