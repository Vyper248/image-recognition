import React from 'react';
import './ImageAreaBox.css';

const ImageAreaBox = ({region}) => {

    // region = {
    //     top_row: 0.16825928,
    //     bottom_row: 0.28445578,
    //     left_col: 0.7487846,
    //     right_col: 0.8262665
    // }
    
    if (!region) return <span></span>;

     const top = (region.top_row*100)+'%';
     const left = (region.left_col*100)+'%';
     const width = ((region.right_col-region.left_col)*100)+'%';
     const height = ((region.bottom_row-region.top_row)*100)+'%';
    
    return (
        <div className="imageAreaBox" style={{top, left, width, height}}></div>
    );
};

export default ImageAreaBox;