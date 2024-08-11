"use client"
import { useTab } from "/app/_components/TabContext";

export default function PhonePage({ table, chart }) {
  const { activeTab } = useTab();
  return <main className="grid h-[93dvh] w-full bg-zinc-100 lg:h-dvh lg:grid-cols-2 lg:divide-x-2 lg:divide-zinc-200 lg:hidden">
    {activeTab === "chart" ? (chart) : (table)}
  </main>
}
