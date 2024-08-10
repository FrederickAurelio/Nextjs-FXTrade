export const formatCurrency = (value, currency) =>
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: currency }).format(value);

export const formatNumber = (value) => {
  const [integer, decimal] = String(value).split(".");
  const formattedInteger = new Intl.NumberFormat('zh-CN').format(integer);
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

export const currencyList = {
  "AUD": "Australian Dollar",
  "BGN": "Bulgarian Lev",
  "BRL": "Brazilian Real",
  "CAD": "Canadian Dollar",
  "CHF": "Swiss Franc",
  "CZK": "Czech Koruna",
  "DKK": "Danish Krone",
  "EUR": "Euro",
  "GBP": "British Pound",
  "HKD": "Hong Kong Dollar",
  "HUF": "Hungarian Forint",
  "IDR": "Indonesian Rupiah",
  "ILS": "Israeli New Sheqel",
  "INR": "Indian Rupee",
  "ISK": "Icelandic Króna",
  "JPY": "Japanese Yen",
  "KRW": "South Korean Won",
  "MXN": "Mexican Peso",
  "MYR": "Malaysian Ringgit",
  "NOK": "Norwegian Krone",
  "NZD": "New Zealand Dollar",
  "PHP": "Philippine Peso",
  "PLN": "Polish Złoty",
  "RON": "Romanian Leu",
  "SEK": "Swedish Krona",
  "SGD": "Singapore Dollar",
  "THB": "Thai Baht",
  "TRY": "Turkish Lira",
  "USD": "United States Dollar",
  "ZAR": "South African Rand"
}