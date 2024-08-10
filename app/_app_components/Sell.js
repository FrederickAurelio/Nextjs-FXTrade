"use client"

import { useState } from "react";
import { formatCurrency, formatNumber } from "../_lib/helpers";
// import useUpdateTransaction from "./useUpdateTransaction";
// import useDeleteTransaction from "./useDeleteTransaction";

function Sell({ cur, latestCur, balance, transactions, onCloseModal }) {
  const transaction = transactions.find((t) => t.asset === cur);
  const [sellQuantity, setSellQuantity] = useState(0);
  const currentPrice = latestCur.rates[cur];
  const sellPrice = Number(sellQuantity) / currentPrice;

  const { isUpdating, update } = useUpdateTransaction(onCloseModal);
  const { isDeleting, deletes } = useDeleteTransaction(onCloseModal);

  function handleSell() {
    if (transaction.quantity > Number(sellQuantity)) {
      update({
        asset: transaction.asset,
        avgBuyPrice: transaction.avgBuyPrice,
        quantity: transaction.quantity - Number(sellQuantity),
        balance: Number(balance) + Number(sellPrice),
      });
    } else if (transaction.quantity === Number(sellQuantity)) {
      deletes({ balance: Number(balance) + Number(sellPrice), asset: cur });
    }
  }

  return (
    <div className="flex w-[22rem] flex-col divide-y-2 divide-rose-700 px-3 py-2 text-center">
      <h1 className="text-xl font-semibold">Sell {transaction.asset}</h1>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Current Quantity:</p>
        <p>
          {formatNumber(transaction.quantity)} {transaction.asset}
        </p>
        <p>Current Price: </p>
        <p>{formatNumber(currentPrice)}</p>
        <p>Balance:</p>
        <p>{formatCurrency(balance, "CNY")}</p>
        <p>Sell Quantity:</p>
        <div className="flex">
          <input
            disabled={isUpdating || isDeleting}
            value={sellQuantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value < 0) setSellQuantity(0);
              else if (value > transaction.quantity)
                setSellQuantity(transaction.quantity);
              else setSellQuantity(value);
            }}
            className="w-32 rounded-md border border-zinc-300 pl-3"
            type="number"
          />
          <p>{transaction.asset}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Sell Price:</p>
        <p>{formatCurrency(sellPrice, "CNY")}</p>
        <button
          disabled={isUpdating || isDeleting}
          onClick={handleSell}
          className={`${isUpdating || isDeleting ? "cursor-not-allowed bg-zinc-300" : "cursor-pointer bg-rose-700"} col-span-2 mt-6 rounded-lg px-6 py-1 font-semibold text-white`}
        >
          SELL
        </button>
      </div>
    </div>
  );
}

export default Sell;
