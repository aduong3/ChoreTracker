import { useState } from "react";
import PropTypes from 'prop-types';
import './SignUpForm.css';


const SignUpForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success,setSuccess] = useState(false);

    const apiURL = import.meta.env.VITE_REACT_APP_API_URL;
    console.log("API URL:", apiURL);

const handleSubmit = async (e) => {
    e.preventDefault();

try{
    const response = await fetch(`${apiURL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });

    if(!response.ok) {
        throw new Error("Sign-up failed");
    }

    const result = await response.json();
    console.log(result.message);
    setSuccess(true);
    onClose();
} catch(error){
    setError(error.message);
}

};

return(
    <>
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" id="emailLabel">Email:</label>

            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />

            <label htmlFor="password">Password:</label>

            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div>
            <button type="submit">Sign Up</button>
            <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
    </>
);
};

SignUpForm.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default SignUpForm;