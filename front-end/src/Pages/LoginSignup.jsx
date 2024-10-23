import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import "./CSS/loginsignup.css";
import { AuthContext } from "../Components/auth/AuthContext"

function LoginSignup() {
	const [state, setState] = useState("Login");
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: ""
	});


	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const { login } = useContext(AuthContext)
	const navigate = useNavigate();

	const Login = async (e) => {
		e.preventDefault();
		try {
			await login(formData)
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const signup = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("https://full-stack-e-commerce-website-are8.onrender.com/register", formData, {
				withCredentials: true
			});
			console.log("Signup jwo bhy", res);
			setState("Login")
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='LoginSignup'>
			<div className="LoginSignup-container">
				<h1>{state}</h1>
				<div className="LoginSignup-fields">
					{state === "Sign Up" && (
						<input
							type="text"
							name='username'
							value={formData.username}
							onChange={handleChange}
							placeholder='Your Name'
						/>
					)}
					<input
						type="email"
						name='email'
						placeholder='Email Address'
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder='Password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div className="LoginSignup-agree">
					<input type="checkbox" name='' />
					<p>By continuing, I agree to the terms of use & privacy policy.</p>
				</div>
				<button onClick={(e) => { state === "Login" ? Login(e) : signup(e) }}>Continue</button>
				{state === "Sign Up"
					? <p className="LoginSignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
					: <p className="LoginSignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}

			</div>
		</div>
	);
}

export default LoginSignup;
