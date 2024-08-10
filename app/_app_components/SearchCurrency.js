"use client"
import { HiOutlineSearch } from "react-icons/hi";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { currencyList } from "../_lib/helpers";

function SearchCurrency() {
  const input = useRef();
  const searchParams = useSearchParams();

  const [result, setResult] = useState([]);

  function handleInput(e) {
    const value = e.target.value.toLowerCase();
    if (value.length < 1) {
      setResult([]);
      return;
    }
    const res = Object.entries(currencyList)
      .filter(
        ([k, v]) =>
          k.toLowerCase().startsWith(value) ||
          v.toLowerCase().startsWith(value),
      )
      .map((arr) => arr.join(" "));
    setResult(res);
  }

  function setParam(cur) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cur", cur);
    if (!searchParams.get("time"))
      params.set("time", "1m");
    window.history.pushState(null, "", `?${params.toString()}`);
    setResult([]);
    input.current.value = cur;
  }

  function handleClick(e) {
    const cur = e.target.getAttribute("value");
    setParam(cur);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const cur = result[0].split(" ")[0];
          setParam(cur);
        }}
        className="flex w-full"
      >
        <input
          placeholder="CNY to..."
          ref={input}
          onChange={handleInput}
          className="flex-grow rounded-lg border-2 border-zinc-300 px-5 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-zinc-300 p-2 text-emerald-700 hover:ring-1 hover:ring-emerald-700"
        >
          <HiOutlineSearch size={24} />
        </button>
      </form>
      {result.length > 0 && (
        <div className="container my-2 rounded-lg px-0 py-2 drop-shadow-md">
          {result.map((res) => (
            <p
              onClick={handleClick}
              value={res?.split(" ")[0]}
              key={res}
              className="cursor-pointer px-8 hover:bg-zinc-100"
            >
              {res}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchCurrency;
