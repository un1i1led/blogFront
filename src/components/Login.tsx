import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authLogin = async () => {
            await fetch('http://localhost:3000/login', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.msg == 'has token') {
                        navigate('/');
                    } else if (res.msg == 'token invalid') {
                        localStorage.removeItem('userToken');
                    } 
                })
        }

        authLogin();
    }, [])

    const login = async () => {
        const formData = { email, password };

        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    setErrors(res.errors[0].msg);
                } else {
                    setErrors('');
                    localStorage.setItem('userToken', res.token);
                }
            })
    }

    return (
        <div className='login-main'>
            <h2>Join the Blog Community</h2>
            <form action='' className='login-form'>
                <label htmlFor='email-login'>Email</label>
                <input type='email' name='email' id='email-login' onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor='password-login'>Password</label>
                <input type='password' name='password' id='password-login' onChange={(e) => setPassword(e.target.value)}/>
                {errors.length > 0 ? <p className='red'>{errors}</p> : ''}
                <button type='button' onClick={login}>Log in</button>
            </form>
        </div>
    )
}

export default Login;