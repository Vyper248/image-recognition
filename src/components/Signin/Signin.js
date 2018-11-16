import React from 'react';
import './Signin.css';

const Signin = ({onSignin, onRegister}) => {
    return (
        <div className="signin">
            <h4>Sign In</h4>
            <div>
                <div className="formGroup">
                    <label>Email</label>
                    <input type="text"></input>
                </div>
                <div className="formGroup">
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <button className="signinBtn" onClick={onSignin}>Sign In</button>
            </div>
            <p onClick={onRegister}>Sign up</p>
        </div>
    );
};

export default Signin;