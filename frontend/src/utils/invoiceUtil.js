export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const formatDate = (value) => {
  if (value === null || value === undefined) return "";
  return new Date(value).toLocaleDateString("vi-VN");
};
