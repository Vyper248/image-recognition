import React from 'react';
import './Navigation.css';

const Navigation = ({onChangeRoute, isSignedIn}) => {
    if (isSignedIn){
        return (
            <nav>
                <p onClick={onChangeRoute('signin')}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav>
                <p onClick={onChangeRoute('signin')}>Sign In</p>
                <p onClick={onChangeRoute('register')}>Register</p>
            </nav>
        );
    }    
};

export default Navigation;