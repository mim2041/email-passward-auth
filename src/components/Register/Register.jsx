import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email);
        console.log(password);

        // validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase latter')
            return;
        }
        else if(!/(?=.*[0-9],*[0-9])/.test(password)){
            setError('Please add at least two numbers')
            return;
        }
        else if(password.length<6){
            setError('Please add at least 6 characters in your password');
            return;
        }
        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess("User has been created successfully");
            sendVerificationEmail(result.user);
            updateUserData(result.user, name);
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const sendVerificationEmail = user => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert("Please verify your email address")
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then(() => {
            console.log('user name updated');
        })
        .catch(error => {
            setError(error.message);
        })
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required/>
                <br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required/>
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required/>
                <br />
                <p className='text-danger'>{error}</p>

                <button className='btn btn-primary' type='submit'>Register</button>
                <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>
        </div>
    );
};

export default Register;