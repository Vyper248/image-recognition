import React from 'react';
import './ImageDetection.css';
import ImageAreaBox from '../ImageAreaBox/ImageAreaBox';

const ImageDetection = ({imageUrl, data}) => {
    const faceBoxes = data.map(region => {
        return region.region_info.bounding_box;
    });
           
    if (imageUrl && imageUrl.length > 0){
        return (
            <div className="imageDetection">
                <div className="imageContainer">
                    <img src={imageUrl} alt="input"/>
                    {
                        faceBoxes.map((region, i) => {
                            return <ImageAreaBox region={region} key={i}/>
                        })
                    }
                </div>
                <div className="imageStats">
                    
                </div>
            </div>
        );
    } else {
        return (
            <div className="imageDetection">
            </div>
        );
    }
};

export default ImageDetection;