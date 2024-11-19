import { useState } from "react";
import PropTypes from 'prop-types';
import './SignUpForm.css';

const LogInForm = ({ onClose, setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

try{
    const response = await fetch('http://localhost:3000/api/users/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });
    if(!response.ok){
        throw new Error("Log In failed")
    }
    const result = await response.json();
    localStorage.setItem("token", result.token);
    setIsLoggedIn(true);
    setError("");
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
            <button type="submit">Log In</button>
            <button onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
    </>
);
};

LogInForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default LogInForm;