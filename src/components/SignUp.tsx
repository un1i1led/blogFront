import { useState } from 'react';
import { v4 as uuid } from 'uuid';

interface Error {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string;
}

const SignUp = () => {
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errors, setErrors] = useState<Error[]>([]);

    const postUser = () => {
        const formData = { name, username, email, password, confirm };

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    const arr: Error[] = [];
                    res.errors.map((data:Error) => arr.push(data))
                    setErrors([...arr]);
                } else {
                    console.log(res.data);
                }
            })
    }

    return (
        <div className='signup-main'>
            <h1>Create your account</h1>
            <form action='' className='signup-form'>
                <label htmlFor='name'>Name <span className='red'>*</span></label>
                <input type='text' name='name' id='name-signup' required onChange={(e) => setName(e.target.value)}/>
                <label htmlFor='username'>Username <span className='red'>*</span></label>
                <input type='text' name='username' id='username-signup' required onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor='email'>Email <span className='red'>*</span></label>
                <input type='email' name='email' id='email-signup' required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor='password'>Password <span className='red'>*</span></label>
                <input type='password' name='password' id='password-signup' required onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor='confirm'>Password Confirmation <span className='red'>*</span></label>
                <input type='password' name='confirm' id='confirm-signup' required onChange={(e) => setConfirm(e.target.value)}/>
                <button type='button' onClick={postUser}>Sign up</button>
                {errors.length > 0 ? errors.map((data) => <p className='red' key={uuid()}>{data.msg}</p>) : ''}
            </form>
            <a href='/login'>Already have an account? <span className='third'>Log in</span></a>
        </div>
    )
}

export default SignUp;