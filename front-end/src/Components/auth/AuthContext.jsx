import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (formData) => {
        try {
            const res = await axios.post("https://full-stack-e-commerce-website-are8.onrender.com/login", formData, { withCredentials: true, });
            const data = res.data;
            console.log(data);
            setCurrentUser(data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("user")
    }


    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}
