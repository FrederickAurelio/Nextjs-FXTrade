"use client"

import { LineChart } from "@mui/x-charts"
import TimeSeries from "./TimeSeries"
import Modal from "./Modal"
import Sell from "./Sell"
import Buy from "./Buy"
import useLatestCurrency from "../_lib/useLatestCurrency"
import useCurrency from "../_lib/useCurrency"
import { useSearchParams } from "next/navigation"
import Spinner from "../_components/Spinner"
import { format } from "date-fns"
import { useEffect, useState } from "react"

export default function Chart({ data }) {
  const [screenSize, setScreenSize] = useState(window?.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window?.innerWidth || 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const searchParam = useSearchParams();
  const cur = searchParam.get("cur");
  const { transactions, balance } = data;
  const { isPending, latestCur } = useLatestCurrency();
  const { isPending: isPending2, currency } = useCurrency();

  const isOwn = transactions.map((t) => t.asset).includes(cur);

  if (!cur)
    return (
      <p className="py-2 text-center text-base font-semibold text-emerald-700 md:text-lg">
        Search a currency to start forex trading
      </p>
    );


  if (isPending || isPending2) return <Spinner />;
  if (!currency || !balance || !latestCur)
    return <p className="p-2 text-lg font-semibold">Offline..</p>;

  const dates = Object.entries(currency?.rates).map((a) => new Date(a[0]));
  const rates = Object.entries(currency?.rates).flatMap((a) =>
    Object.values(a[1]),
  );

  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row">
        <p className="px-1 py-1 text-xl font-bold md:text-2xl">
          1 CNY = {latestCur.rates[cur]} {cur}{" "}
          <span
            className={`${rates.at(1) <= rates.at(-1) ? "text-rose-700" : "text-emerald-700"}`}
          >
            ({(((rates.at(1) - rates.at(-1)) / rates.at(-1)) * 100).toFixed(2)}
            %)
          </span>
        </p>
        <TimeSeries searchParam={searchParam} />
      </div>
      <LineChart
        xAxis={[
          {
            label: "Date",
            tickInterval: dates,
            data: [...dates, new Date(latestCur.date)],
            scaleType: "time",
            valueFormatter: (date) => format(date, "dd-MM-yy"),
          },
        ]}
        series={[
          {
            data: [...rates, latestCur.rates[cur]],
            label: cur,
            color: `${rates.at(1) <= rates.at(-1) ? "#be123c" : "#047857"}`,
            valueFormatter: (value) => value.toFixed(5),
          },
        ]}
        width={screenSize > 1020 ? (screenSize / 2) * 1.04 : screenSize * 1.04}
        height={400}
      />
      <div className="mt-8 flex justify-center gap-3">
        <Modal>
          <Modal.Open id="sell">
            <button
              disabled={!isOwn || balance === undefined}
              className={`disabled:cursor-not-allowed disabled:bg-zinc-300 cursor-pointer bg-rose-700 hover:scale-110 rounded-lg px-8 py-2 font-semibold text-white duration-200`}
            >
              SELL
            </button>
          </Modal.Open>
          <Modal.Window id="sell">
            <Sell balance={balance} transactions={transactions} latestCur={latestCur} cur={cur} />
          </Modal.Window>

          <Modal.Open id="buy">
            <button
              disabled={balance === undefined}
              className={`disabled:cursor-not-allowed disabled:bg-zinc-300 cursor-pointer bg-emerald-700 hover:scale-110 rounded-lg px-8 py-2 font-semibold text-white duration-200`}
            >
              BUY
            </button>
          </Modal.Open>
          <Modal.Window id="buy">
            <Buy
              isOwn={isOwn}
              balance={balance}
              transactions={transactions}
              latestCur={latestCur}
              cur={cur}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  )
}
