const app = require('express')();
const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
    apiKey: '12db74f1006e4dbfaf4f6023df5434a3'
});


app.post('/', (req, res) => {
    const {input, mode} = req.body;
    
    if (mode === 'face'){
        clarifaiApp.models.predict(Clarifai.DEMOGRAPHICS_MODEL, input).then(
            (response) => {
                const data = response.outputs[0].data;
                if (data.regions){
                    res.send({data: data.regions, imageUrl: input});
                } else {
                    res.send({data: [], imageUrl: input});
                }
            },
            (err) => {
                console.error('Clarifai error, mode: face, err: ', err.message);
                res.send({data: [], imageUrl: ''});
            }
        );
    } else if (mode === 'food'){
        clarifaiApp.models.predict(Clarifai.FOOD_MODEL, input).then(
            (response) => {
                const data = response.outputs[0].data;
                if (data.concepts.length > 0){
                    res.send({data: data, imageUrl: input});
                } else {
                    res.send({data: [], imageUrl: input});
                    
                }
            },
            (err) => {
                console.error('Clarifai error, mode: food, err: ', err.message);
                res.send({data: [], imageUrl: ''});
            }
        );
    }
});

module.exports = app;