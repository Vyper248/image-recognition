import React from 'react';
import './ImageAreaBox.css';

const ImageAreaBox = ({region, onClick, index, faceIndex}) => {

    if (!region) return <span></span>;

     const top = (region.top_row*100)+'%';
     const left = (region.left_col*100)+'%';
     const bottom = (100-(region.bottom_row*100))+'%';
     const right = (100-(region.right_col*100))+'%';
     
     let className = 'imageAreaBox';
     if (faceIndex === index) className += ' selected';
    
    return (
        <div className={className} style={{top, left, bottom, right}} onClick={onClick} index={index}></div>
    );
};

export default ImageAreaBox;