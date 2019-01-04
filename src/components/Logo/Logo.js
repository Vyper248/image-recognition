import React from 'react';
import './Logo.css';
import mind from './mind.png';

const Logo = () => {
    return (
        <div className="Tilt" style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner">
                <img src={mind} alt="logo"></img>
            </div>
        </div>
    );
};

export default Logo;