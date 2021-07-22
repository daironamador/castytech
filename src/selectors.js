export const editCart = (product, action) => {
  return (cart) => {
    return cart.reduce((acc, _product) => {
      if (_product.id === product.id) {
        if (action === "increment") {
          return acc.concat({
            ..._product,
            cantidad: _product.cantidad + 1,
          });
        }
        if (action === "decrement") {
          if (_product.cantidad === 1) {
            return acc;
          }
          return acc.concat({
            ..._product,
            cantidad: _product.cantidad - 1,
          });
        }
      }

      return acc.concat(_product);
    }, []);
  };
};
