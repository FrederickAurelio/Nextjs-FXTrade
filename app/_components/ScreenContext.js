"use client"
import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext();

function ScreenSize({ children }) {
  const [screenSize, setScreenSize] = useState(window?.innerWidth);
  const [activeTab, setActiveTab] = useState("chart");

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window?.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ screenSize, activeTab, setActiveTab }}>
      {children}
    </ScreenContext.Provider>
  );
}

function useScreenSize() {
  const context = useContext(ScreenContext);
  if (context === undefined)
    throw new Error("ScreenContext is used outside Provider");
  return context;
}

export { useScreenSize, ScreenSize };
