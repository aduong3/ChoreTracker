import { useState } from "react";
import PropTypes from 'prop-types';

const SignUpForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

try{
    const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });

    if(!response.ok) {
        throw new Error("Sign-up failed");
    }

    const result = await response.json();
    localStorage.setItem("token", result.token);
    setIsLoggedIn(true);
    console.log(result.message);
    onClose();
} catch(error){
    setError(error.message);
}

};

return(
    <>
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    </div>
    </>
);
};

SignUpForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SignUpForm;