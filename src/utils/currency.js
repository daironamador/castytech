export const parseCurrency = (value) => {
  return value.toLocaleString("es-RD", {
    style: "currency",
    currency: "DOP",
  });
};
