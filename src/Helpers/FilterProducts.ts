import { ProductLookup } from "../Models/Product.js";
import { charToAscii } from "./CharToAscii.js";
import { QuantitySum } from "./QuantitySum.js";

export const filterAndSortCSVData = (
  data: Array<ProductLookup>
): Array<ProductLookup> => {
  data.sort((a: ProductLookup, b: ProductLookup) => {
    const aAscii: number = charToAscii(a.pickLocation);
    const bAscii: number = charToAscii(b.pickLocation);

    return aAscii - bAscii || a.shelfId - b.shelfId;
  });

  const values = QuantitySum(data);
  return values;
};
