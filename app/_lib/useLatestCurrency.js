"use client"
import { useQuery } from "@tanstack/react-query";

export default function useLatestCurrency() {
  const { isPending, data: latestCur } = useQuery({
    queryKey: ["latest"],
    queryFn: () =>
      fetch(`/api/latestcurrency`).then((res) =>
        res.json(),
      ),
    staleTime: 60000,
    refetchInterval: 60000,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { isPending, latestCur }
}