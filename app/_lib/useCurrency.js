"use client"
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useCurrency() {
  const searchParam = useSearchParams();
  const time = searchParam.get('time');
  const cur = searchParam.get('cur');

  const { isPending, data: currency } = useQuery({
    queryKey: ["currency", cur, time],
    queryFn: () =>
      fetch(`/api/currency?time=${time}&cur=${cur}`).then((res) =>
        res.json(),
      ),
  });

  return { isPending, currency }
}