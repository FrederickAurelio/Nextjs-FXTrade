export const formatCurrency = (value, currency) =>
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: currency }).format(value);

export const formatNumber = (value) => {
  const [integer, decimal] = value.toString().split(".");
  const formattedInteger = new Intl.NumberFormat('zh-CN').format(integer);
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};