"use client"

import { useEffect, useState } from "react";

function TimeSeries({ searchParam }) {
  const [time, setTime] = useState(searchParam.get("time") || "1m");

  useEffect(() => {
    const params = new URLSearchParams(searchParam.toString());
    params.set("time", time);
    window.history.pushState(null, "", `?${params.toString()}`);
  }, [searchParam, time]);

  return (
    <div className="flex items-center justify-end gap-1 py-2">
      <p className="mt-auto">Length:</p>
      {["1m", "6m", "1y", "3y"].map((t) => (
        <button
          onClick={() => setTime(t)}
          key={t}
          className={`h-10 w-10 rounded-lg border-2 border-zinc-300 p-1 text-xl font-semibold text-emerald-700 duration-200 hover:ring-1 hover:ring-emerald-700 ${time === t ? "-translate-y-1 ring-1 ring-emerald-700" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default TimeSeries;
