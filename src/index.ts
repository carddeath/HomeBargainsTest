import { filterAndSortCSVData } from "./Helpers/FilterProducts.js";
import { Constants } from "./Helpers/Constants.js";
import { writeProductCSV } from "./Helpers/WriteProductCSV.js";
import { ProcessCSVOrder } from "./Helpers/ProcessCSVOrder.js";

//Please just run "npm install" followed by "npm start" to clean the directory, compile the Typescript and run the application.
ProcessCSVOrder(filterAndSortCSVData, writeProductCSV, Constants.FileToRead);
