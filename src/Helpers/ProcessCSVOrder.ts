import fs from "fs";
import * as csv from "csv";
import { ProductLookup } from "../Models/Product.js";
import { Constants } from "./Constants.js";

export const ProcessCSVOrder = (
  filterFunc: (products: Array<ProductLookup>) => Array<ProductLookup>,
  writeFunc: (
    headers: Array<string>,
    products: Array<ProductLookup>,
    writePath: string
  ) => void,
  fileToRead: string
): void => {
  let products: Array<ProductLookup> = [];
  let exportHeaders: string = "";
  let firstRow = true;

  fs.createReadStream(fileToRead)
    .pipe(csv.parse({ delimiter: ",", trim: true, relaxColumnCountMore: true }))
    .on("data", (row: string) => {
      //Strip the headers out
      if (firstRow) {
        exportHeaders = row;
        firstRow = false;
      } else {
        const locationAndShelf: Array<string> = row[2].split(" ");
        const newLookup: ProductLookup = {
          productCode: row[0],
          quantity: row[1] as unknown as number,
          pickLocation: locationAndShelf[0],
          shelfId: locationAndShelf[1] as unknown as number,
        };
        products.push(newLookup);
      }
    })
    .on("end", () => {
      const filteredProducts: Array<ProductLookup> = filterFunc(products);
      writeFunc(Array(exportHeaders), filteredProducts, Constants.OutputFile);
    })
    .on("error", (err: Error) => {
      console.error(`Error when reading the CSV: ${err.message}`);
    });
};
