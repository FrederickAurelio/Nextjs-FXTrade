"use client"
import { createContext, useContext, useState } from "react";

const TabContext = createContext();

function Tab({ children }) {
  const [activeTab, setActiveTab] = useState("chart");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

function useTab() {
  const context = useContext(TabContext);
  if (context === undefined)
    throw new Error("TabContext is used outside Provider");
  return context;
}

export { useTab, Tab };
