import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import mind from './mind.png';

const Logo = () => {
    return (
        <Tilt className="Tilt" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner">
                <img src={mind} alt="logo"></img>
            </div>
        </Tilt>
    );
};

export default Logo;