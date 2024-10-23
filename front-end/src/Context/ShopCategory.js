import { createContext, useState } from "react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 50 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // Fetching products using React Query
    const fetchInfo = async () => {
        const res = await axios.get("https://full-stack-e-commerce-website-are8.onrender.com/allproducts", {
            withCredentials: true,
        });
        return res.data.products; // Returning the products array
    };

    const { data: all_product = [], error, isLoading } = useQuery({
        queryKey: ['products'],  // Unique key for this query
        queryFn: fetchInfo,       // The function to fetch the products
    });

    // Cart functions
    const addToCart = async (productId) => {
        setCartItems((prevCartItems) => {
            const newCartItems = { ...prevCartItems };
            if (newCartItems[productId]) {
                newCartItems[productId] += 1;
            } else {
                newCartItems[productId] = 1;
            }
            return newCartItems;
        });
        try {
            const res = await axios.post("https://full-stack-e-commerce-website-are8.onrender.com/addtocart", { itemId: productId }, {
                withCredentials: true,
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        try {
            const res = await axios.delete("https://full-stack-e-commerce-website-are8.onrender.com/removefromcart", {
                data: { itemId },
                withCredentials: true,  // Include cookies (token)
            });
            console.log(itemId);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCart = async () => {
        const res = await axios.get("https://full-stack-e-commerce-website-are8.onrender.com/getCart", {
            withCredentials: true,  // Send cookies for authentication
        });
        setCartItems(res.data)
        return res.data;
        // This will return the cartData from the backend
    };

    // Use React Query to fetch cart
    const { data: cartData = {} } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });



    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product._id === (item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // Context value with all necessary data and functions
    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        cartData,
        addToCart,
        removeFromCart,
        error,
        isLoading
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
