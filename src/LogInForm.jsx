import { useState } from "react";
import './SignUpForm.css';

const LogInForm = ({ onClose }) => {

const handleSubmit = async (e) => {
    e.preventDefault();


};

return(
    <>
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" id="emailLabel">Email:</label>

            <input id="email" name="email" type="email" autoComplete="off" required />

            <label htmlFor="password">Password:</label>

            <input id="password" name="password" type="password" required />
            <div>
            <button type="submit">Sign Up</button>
            <button onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
    </>
);
};

export default LogInForm;