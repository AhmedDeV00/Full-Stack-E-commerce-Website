import Product from "../models/Products.js";
import User from "../models/User.js";

export const addProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            old_price: req.body.old_price,
            new_price: req.body.new_price,
        })
        await product.save();
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}
export const getProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res.status(200).json({ message: "All Products :", products })
    } catch (error) {
        console.log(error);
    }
}
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}
export const newcollections = async (req, res) => {
    try {
        let products = await Product.find({})
        let newcollection = products.slice(1).slice(-8);
        res.send(newcollection)
    } catch (error) {
        console.log(error);
    }
}
export const popularinwomen = async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popular_in_women = products.slice(0, 4);
        res.send(popular_in_women)
    } catch (error) {
        console.log(error);
    }
}
// Creating endpoint for addiing Product in cartData
export const addtocart = async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;
        }
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added")
    } catch (error) {
        console.log(error);
    }
}
// Creating endpoint to remove Product from cartData

export const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        const itemId = req.body.itemId
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            //If the quantity becomes 0,delete the product from the cart
            if (userData.cartData[req.body.itemId] === 0) {
                delete userData.cartData[req.body.itemId]
            }
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed")
    } catch (error) {
        console.log(error);
    }
}
// Creating endpoint to get cartData from database
export const getCart = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData)
    } catch (error) {
        console.log(error);
    }
}
// Creating endpoint to delete product from database
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Removed.")
    } catch (error) {
        console.log(error);
    }
}

