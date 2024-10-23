import db from "./connect.js";
import Product from "./models/Products.js";
import { all_product } from "./data.js"

// Connection To DB
db();
// Sending Products To DataBase

const SendingProducts = async () => {
    try {
        await Product.insertMany(all_product);
        console.log("products are sending!");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
if (process.argv[2] === "-import") {
    SendingProducts();
}