import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit, onModeChange}) => {
    return (
        <div className="imageLinkForm">
            <button className="modeBtn faceBtn selected" onClick={onModeChange('face')}>Face Detection</button>
            <button className="modeBtn foodBtn" onClick={onModeChange('food')}>Food Detection</button>
            <div className="linkContainer">
                <p>Input an image URL here and watch the magic!</p>
                <div className="linkForm">
                    <input type="text" onChange={onInputChange}/>
                    <button onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;