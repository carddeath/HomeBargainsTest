import fs from "fs";
import { ProductLookup } from "../Models/Product.js";

export const writeProductCSV = (
  headers: Array<string>,
  sortedProducts: Array<ProductLookup>,
  writeFilePath: string
): void => {
  let writeStream = fs.createWriteStream(writeFilePath);

  let headerLine: Array<string> = [];
  headers.forEach((header) => headerLine.push(header));

  writeStream.write(headerLine.join(",") + "\n", () => {
    console.log("Written Headers");
  });

  sortedProducts.forEach((product) => {
    let newLine: Array<string | number> = [];
    newLine.push(product.productCode);
    newLine.push(product.quantity);
    newLine.push(`${product.pickLocation} ${product.shelfId}`);

    writeStream.write(newLine.join(",") + "\n", () => {});
  });

  writeStream.end();

  writeStream
    .on("finish", () => {
      console.log(
        `Output finished please view specified output stream file of: ${writeFilePath}`
      );
    })
    .on("error", (err) => {
      console.error(err);
    });
};
