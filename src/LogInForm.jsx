import { useState } from "react";
import PropTypes from 'prop-types';
import './SignUpForm.css';

const LogInForm = ({ onClose, setIsLoggedIn, setUserPoints }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const handleSubmit = async (e) => {
    e.preventDefault();

try{
    const response = await fetch(`${apiURL}/api/users/login`, {
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

    const pointsResponse = await fetch(`${apiURL}/api/users/points`, {
        headers: {
            'Authorization': `Bearer ${result.token}`
        },
    });
    if(pointsResponse.ok){
        const pointsResult = await pointsResponse.json();
        setUserPoints(pointsResult.points);
    } else {
        setUserPoints(0);
    }

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
    setIsLoggedIn: PropTypes.func.isRequired,
    setUserPoints: PropTypes.func.isRequired,
};

export default LogInForm;