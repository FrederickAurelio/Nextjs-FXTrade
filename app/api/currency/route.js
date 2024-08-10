import { format, subDays } from "date-fns";

export async function GET(request) {
  const cur = request.nextUrl.searchParams.get('cur');
  const time = request.nextUrl.searchParams.get('time');
  if (!cur || !time) return null;

  try {
    const day = {
      "1m": 30,
      "6m": 183,
      "1y": 366,
      "3y": 1096,
    }
    const date = format(subDays(new Date(), day[time]), "yyyy-MM-dd")
    const res = await fetch(`https://api.frankfurter.app/${date}..?to=${cur}&base=CNY`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(null);
  }
}