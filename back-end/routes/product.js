import express, { Router } from "express";
import { addProduct, deleteProduct, popularinwomen, addtocart, removeFromCart, getCart, newcollections, getProducts, getProduct } from "../controllers/Product.js";
import { authenticateToken } from "../middleware/authToken.js";
const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/addtocart", authenticateToken, addtocart);
router.delete("/removefromcart", authenticateToken, removeFromCart);
router.get("/getCart", authenticateToken, getCart);
router.get("/allproducts", getProducts);
router.get("/product/:id", getProduct);
router.get("/newcollections", newcollections);
router.get("/popularinwomen", popularinwomen);
router.delete("/removeproduct/:id", deleteProduct);

export default router; 