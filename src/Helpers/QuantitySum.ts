import { ProductLookup } from "../Models/Product.js";

export const QuantitySum = (
  dataArray: Array<ProductLookup>
): Array<ProductLookup> => {
  const map = dataArray.reduce(
    (acc: Map<string, ProductLookup>, val: ProductLookup) => {
      if (acc.has(val.productCode)) {
        acc.set(val.productCode, {
          ...val,
          quantity:
            Number(val.quantity) + Number(acc.get(val.productCode)?.quantity),
        });
      } else {
        acc.set(val.productCode, { ...val });
      }
      return acc;
    },
    new Map()
  );

  return Array.from(map.values());
};
