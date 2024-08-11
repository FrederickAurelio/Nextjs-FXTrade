"use client"

import { useState, useTransition } from "react";
import { formatCurrency, formatNumber } from "../_lib/helpers";
import { BuyTransactions } from "/app/_lib/action"
import MiniSpinner from "/app/_components/MiniSpinner"
import toast from "react-hot-toast";

function Buy({ cur, latestCur, transactions, balance, isOwn, onCloseModal }) {
  const transaction = isOwn
    ? transactions.find((t) => t.asset === cur)
    : { asset: cur, quantity: 0 };
  const [buyQuantity, setBuyQuantity] = useState(0);
  const currentPrice = latestCur.rates[cur];
  const totalPrice = buyQuantity / currentPrice;
  const [isPending, startTransition] = useTransition()

  function handleBuy() {
    if (buyQuantity === 0) return;
    startTransition(async () => {
      const res = await BuyTransactions(transaction.asset, buyQuantity);
      onCloseModal();
      if (res.type === "success")
        toast.success("Transaction Successful! Thank You!")
      else toast.error(res.message)
    });
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
            disabled={isPending}
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
          disabled={isPending}
          onClick={handleBuy}
          className={`flex justify-center items-center disabled:cursor-not-allowed disabled:bg-zinc-300 cursor-pointer bg-emerald-700 col-span-2 mt-6 rounded-lg px-6 py-1 font-semibold text-white`}
        >
          {isPending ? <MiniSpinner /> : ""}BUY
        </button>
      </div>
    </div>
  );
}

export default Buy;