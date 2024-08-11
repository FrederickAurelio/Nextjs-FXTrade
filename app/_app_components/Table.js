"use client"
import { useSearchParams } from "next/navigation";
import { formatNumber, formatCurrency } from "../_lib/helpers";
import { useTab } from "/app/_components/TabContext";
import TotalAsset from "./TotalAsset";
import Spinner from "../_components/Spinner";
import useLatestCurrency from "../_lib/useLatestCurrency";

function Table({ transactions = [] }) {
  const { isPending, latestCur } = useLatestCurrency();
  const { setActiveTab } = useTab();
  const searchParams = useSearchParams();

  function handleClick(asset) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cur", asset);
    if (!searchParams.get("time"))
      params.set("time", "1m");
    window.history.pushState(null, "", `?${params.toString()}`);
    setActiveTab("chart");
  }

  if (isPending) return <Spinner />
  if (latestCur === undefined)
    return <p className="p-2 text-lg font-semibold">Offline..</p>;

  return (
    <div className="flex w-full flex-col divide-y divide-zinc-200 overflow-x-auto xl:items-center xl:overflow-x-hidden">
      <div className="text grid w-[42rem] grid-cols-6 font-semibold">
        <p>Asset</p>
        <p>Quantity</p>
        <p>Avg Buy Price</p>
        <p>Current Price</p>
        <p>Current Value</p>
        <p className="text-end">Change(%)</p>
      </div>
      {transactions.map((cell, i) => (
        <div
          onClick={() => handleClick(cell.asset)}
          key={i}
          className="grid w-[42rem] cursor-pointer grid-cols-6 text-start hover:bg-zinc-100"
        >
          <p className="py-1">{cell.asset}</p>
          <p className="py-1">{formatNumber(cell.quantity)}</p>
          <p className="py-1">{formatNumber(cell.avgBuyPrice.toFixed(5))}</p>
          <p className="py-1">
            {formatNumber(latestCur?.rates[cell.asset].toFixed(5))}
          </p>
          <p className="py-1">
            {formatCurrency(cell.quantity / latestCur.rates[cell.asset], "CNY")}
          </p>
          <p
            className={`${((cell.avgBuyPrice - latestCur.rates[cell.asset]) /
              latestCur.rates[cell.asset]) *
              100 >=
              0
              ? "text-emerald-700"
              : "text-rose-700"
              } py-1 text-end`}
          >
            {formatNumber(
              (
                ((cell.avgBuyPrice - latestCur.rates[cell.asset]) /
                  latestCur.rates[cell.asset]) *
                100
              ).toFixed(2),
            )}
            %
          </p>
        </div>
      ))}
      {transactions.length !== 0 ? (
        <TotalAsset latestCur={latestCur} transactions={transactions} />
      ) : (
        <p className="font-semibold text-emerald-700">
          Buy your first currency and the data will be shown here
        </p>
      )}
    </div>
  );
}

export default Table;
