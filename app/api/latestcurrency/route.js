export async function GET() {
  try {
    // const api_key = process.env.NEXT_PUBLIC_CUR_API_KEY
    // const data = await fetch(`https://api.currencybeacon.com/v1/latest?api_key=${api_key}&base=CNY`);
    return Response.json({ "data": "data" });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}