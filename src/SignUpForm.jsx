import { useState } from "react";
import './SignUpForm.css';

const SignUpForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success,setSuccess] = useState(false);

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
            <button onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
    </>
);
};

export default SignUpForm;