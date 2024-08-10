"use client"
import { HiMiniChartBar, HiMiniTableCells } from "react-icons/hi2"
import { useScreenSize } from "../_components/ScreenContext";

function PhoneNav() {
  const { screenSize, activeTab, setActiveTab } = useScreenSize();
  return (<>
    {screenSize <= 1020 && (
      <div className="flex h-[7dvh] border-t border-emerald-700 bg-zinc-50 text-emerald-700">
        <div
          onClick={() => setActiveTab("chart")}
          className={`flex cursor-pointer h-full w-full items-center justify-center border-r border-emerald-700 ${activeTab === "chart" ? "bg-emerald-100" : "text-zinc-300"}`}
        >
          <HiMiniChartBar size={32} />
        </div>
        <div
          onClick={() => setActiveTab("table")}
          className={`flex cursor-pointer h-full w-full items-center justify-center ${activeTab === "table" ? "bg-emerald-100" : "text-zinc-300"}`}
        >
          <HiMiniTableCells size={32} />
        </div>
      </div>
    )}
  </>)
}

export default PhoneNav
