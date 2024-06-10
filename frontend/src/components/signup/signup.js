import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import { useNavigate } from 'react-router-dom';
import './signup.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('user') // Define userType state
    const navigate = useNavigate();
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userType)
        await signup(email, password, userType) // Pass userType to signup function
        navigate("/")
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>User type</label>
            <div>
                <label>
                    <input
                        type='radio'
                        name='userType'
                        value='user'
                        checked={userType === 'user'}
                        onChange={(e) => setUserType(e.target.value)}
                    />
                    User
                </label>
                <label>
                    <input
                        type='radio'
                        name='userType'
                        value='author'
                        checked={userType === 'author'}
                        onChange={(e) => setUserType(e.target.value)}
                    />
                    Author
                </label>
            </div>
            <label>Email</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup
