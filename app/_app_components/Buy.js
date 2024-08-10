"use client"

import { useState } from "react";
// import useCreateTransaction from "./useCreateTransaction";
// import useUpdateTransaction from "./useUpdateTransaction";
import { formatCurrency, formatNumber } from "../_lib/helpers";

function Buy({ cur, latestCur, transactions, balance, isOwn, onCloseModal }) {
  const transaction = isOwn
    ? transactions.find((t) => t.asset === cur)
    : { asset: cur, quantity: 0 };
  const [buyQuantity, setBuyQuantity] = useState(0);
  const currentPrice = latestCur.rates[cur];
  const totalPrice = buyQuantity / currentPrice;

  const { isCreating, create } = useCreateTransaction(onCloseModal);
  const { isUpdating, update } = useUpdateTransaction(onCloseModal);

  function handleBuy() {
    if (buyQuantity === 0) return;
    const newBalance = balance - totalPrice;
    if (isOwn) {
      update({
        asset: cur,
        avgBuyPrice:
          (Number(transaction.avgBuyPrice) * Number(transaction.quantity) +
            Number(currentPrice) * Number(buyQuantity)) /
          (Number(transaction.quantity) + Number(buyQuantity)),
        quantity: Number(transaction.quantity) + Number(buyQuantity),
        balance: Number(newBalance),
      });
    } else {
      create({
        asset: cur,
        avgBuyPrice: currentPrice,
        quantity: buyQuantity,
        balance: newBalance,
      });
    }
  }

  return (
    <div className="flex w-[22rem] flex-col divide-y-2 divide-emerald-700 px-3 py-2 text-center">
      <h1 className="text-xl font-semibold">Buy {transaction.asset}</h1>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Current Quantity:</p>
        <p>
          {formatNumber(transaction.quantity)} {transaction.asset}
        </p>
        <p>Current Price: </p>
        <p>{formatNumber(currentPrice)}</p>
        <p>Balance:</p>
        <p>{formatCurrency(balance, "CNY")}</p>
        <p>Buy Quantity:</p>
        <div className="flex">
          <input
            disabled={isCreating || isUpdating}
            value={buyQuantity}
            onChange={(e) => {
              const value = e.target.value;
              const price = value / currentPrice;
              if (value < 0) setBuyQuantity(0);
              else if (price > balance)
                setBuyQuantity(Math.trunc(balance * currentPrice));
              else setBuyQuantity(value);
            }}
            className="w-32 rounded-md border border-zinc-300 pl-3"
            type="number"
          />
          <p>{transaction.asset}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Total Price:</p>
        <p>{formatCurrency(totalPrice, "CNY")}</p>
        <button
          disabled={isCreating || isUpdating}
          onClick={handleBuy}
          className={`${isCreating || isUpdating ? "cursor-not-allowed bg-zinc-300" : "cursor-pointer bg-emerald-700"} col-span-2 mt-6 rounded-lg px-6 py-1 font-semibold text-white`}
        >
          BUY
        </button>
      </div>
    </div>
  );
}

export default Buy;
