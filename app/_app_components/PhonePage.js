"use client"
import { useScreenSize } from "/app/_components/ScreenContext";

export default function PhonePage({ table, chart }) {
  const { screenSize, activeTab } = useScreenSize();
  return <>
    {screenSize <= 1020 ? (
      activeTab === "chart" ? (
        chart
      ) : (
        table
      )
    ) : (
      ""
    )}
  </>
}
