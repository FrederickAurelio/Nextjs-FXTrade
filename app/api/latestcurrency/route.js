export async function GET() {
  try {
    const api_key = process.env.NEXT_PUBLIC_CUR_API_KEY
    const url = `https://api.currencybeacon.com/v1/latest?api_key=${api_key}&base=CNY`
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(null);
  }
}