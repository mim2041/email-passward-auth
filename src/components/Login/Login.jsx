import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //validation
        setError('');
        setSuccess('');
        form.reset('');

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least two uppercase');
            return;
        }
        else if(!/(?=.*[0-9],*[0-9])/.test(password)){
            setError('Please add at least two numbers')
            return;
        }
        // else if(!/(?=.*[!@#$&*])/.test(password)){
        //     setError('Please add a special character');
        //     return;
        // }
        else if(password.length < 6){
            setError('Password must be 6 character long');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess('User login successful');
            setError('');
        })
        .catch(error => {
            setError(error.message);
        })
    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email){
            alert('Please provide a valid email to reset password');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email')
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>login Here</h2>
            <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailRef} type="email" name="email" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={passwordShown ? "text" : "password"} name="password" placeholder="Password" required />
                <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
              {passwordShown ? "Hide" : "Show"}
            </button>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            <p><small>Forgotten Password? <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;