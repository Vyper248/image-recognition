import React from 'react';
import '../Signin/Signin.css';

const Register = ({onClick}) => {
    return (
        <div className="signin">
            <h4>Register</h4>
            <div>
                <div className="formGroup">
                    <label>Name</label>
                    <input type="text"></input>
                </div>
                <div className="formGroup">
                    <label>Email</label>
                    <input type="email"></input>
                </div>
                <div className="formGroup">
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <button className="signinBtn" onClick={onClick}>Submit</button>
            </div>
        </div>
    );
};

export default Register;