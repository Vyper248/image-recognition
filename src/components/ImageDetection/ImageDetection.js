import React from 'react';
import './ImageDetection.css';
import ImageAreaBox from '../ImageAreaBox/ImageAreaBox';

const ImageDetection = ({imageUrl, data, onFaceSelect, faceIndex}) => {
    const faceBoxes = data.map(region => region.region_info.bounding_box);
    const faceData = data.map(region => region.data.face);
    console.log(faceData, faceIndex);
    const selectedFace = faceData[faceIndex];
           
    if (imageUrl && imageUrl.length > 0){
        return (
            <div className="imageDetection">
                <div className="imageContainer">
                    <img src={imageUrl} alt="input"/>
                    {
                        faceBoxes.map((region, i) => {
                            return <ImageAreaBox region={region} key={i} index={i} onClick={onFaceSelect} faceIndex={faceIndex}/>
                        })
                    }
                </div>
                <div className="imageStats">
                    {
                        faceData[faceIndex] ? (
                            <div>
                                <div className="statGroup">
                                    <div className="statHeader">Age Appearance</div>
                                    <div className="statData">{selectedFace.age_appearance.concepts[0].name}</div>
                                </div>
                                
                                <div className="statGroup">
                                    <div className="statHeader">Gender Appearance</div>
                                    <div className="statData">{selectedFace.gender_appearance.concepts[0].name}</div>
                                </div>
                                
                                <div className="statGroup">
                                    <div className="statHeader">Multicultural Appearance</div>
                                    <div className="statData">{selectedFace.multicultural_appearance.concepts[0].name}</div>
                                </div>
                                    
                            </div>
                        ) : <div></div>
                    }
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