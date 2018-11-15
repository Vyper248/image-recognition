import React from 'react';
import './ImageDetection.css';
import ImageAreaBox from '../ImageAreaBox/ImageAreaBox';

const ImageDetection = ({imageUrl, data, onFaceSelect, faceIndex, mode}) => {
    let faceBoxes = [];
    
    if (mode === 'face'){
        faceBoxes = data.length > 0 ? data.map(region => region.region_info.bounding_box) : [];
    }
    
    const imageStats = getImageStats(data, faceIndex, mode);
    
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
                    {imageStats}
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

const getImageStats = (data, faceIndex, mode) => {
    if (mode === 'face'){
        const faceData = data.length > 0 ? data.map(region => region.data.face) : [];
        const selectedFace = faceData.length > 0 ? faceData[faceIndex] : {};
        
        if (faceData.length > 0) return (
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
        );
        else return <div>No Faces Found</div>
    } else if (mode === 'food'){
        const foodConcepts = data.concepts ? data.concepts.map(concept => { return {name: concept.name, value: concept.value};}) : [];
        
        if (foodConcepts.length > 0) return (
            <div>
                <div className="statFoodGroup">
                    <div className="statFoodName statHeader">Concept</div>
                    <div className="statFoodValue statHeader">Probability</div>
                </div>
                {
                    foodConcepts.map((concept, i) => {
                        return (
                            <div className="statFoodGroup" key={i}>
                                <div className="statFoodName">{concept.name}</div>
                                <div className="statFoodValue">{(concept.value*100).toFixed(2)+'%'}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
        else return <div>No Food Found</div>
    }
};

export default ImageDetection;