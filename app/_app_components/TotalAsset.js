import { formatCurrency, formatNumber } from "../_lib/helpers";

function TotalAsset({ latestCur, transactions }) {
  const buyValue = transactions
    .map((data) => data.quantity / data.avgBuyPrice)
    .reduce((acc, v) => (acc += v), 0);

  const curValue = transactions
    .map((data) => data.quantity / latestCur.rates[data.asset])
    .reduce((acc, v) => (acc += v), 0);

  return (
    <div className="grid w-[42rem] grid-cols-6 font-semibold">
      <p className="py-1">Total:</p>
      <p className="col-start-5 py-1">{formatCurrency(curValue, "CNY")}</p>
      <p
        className={`${
          ((curValue - buyValue) / buyValue) * 100 >= 0
            ? "text-emerald-700"
            : "text-rose-700"
        } col-start-6 py-1 text-end`}
      >
        {formatNumber((((curValue - buyValue) / buyValue) * 100).toFixed(2))}%
      </p>
    </div>
  );
}

export default TotalAsset;
