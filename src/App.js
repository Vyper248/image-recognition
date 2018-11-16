import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ImageDetection from './components/ImageDetection/ImageDetection';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const config = {
    "particles": {
        "number": {
            "value": 28,
            "density": {
                "enable": true,
                "value_area": 1893.9580764488287
            }
        },
        "color": {
            "value": "#ff0000"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 363.00863131935887,
            "color": "#ff0000",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "retina_detect": true
};

const app = new Clarifai.App({
    apiKey: '12db74f1006e4dbfaf4f6023df5434a3'
});

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            data: [],
            selectedFace: 0,
            mode: 'face',
            route: 'signin',
            isSignedIn: false
        };
    }
    
    render() {
        return (
            <div className="App">
                <Navigation onChangeRoute={this.changeRoute} isSignedIn={this.state.isSignedIn}/>
                <Logo />
                { this.getRoute() }
            </div>
        );
    }
    
    getRoute = () => {
        const route = this.state.route;
        const {imageUrl, data, selectedFace, mode} = this.state;

        switch(route){
            case 'home': return (
                <div>
                    <Rank />
                    <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} onModeChange={this.onModeChange}/>
                    {/* <Particles params={config}/> */}
                    <ImageDetection imageUrl={imageUrl} data={data} onFaceSelect={this.onFaceSelect} faceIndex={selectedFace} mode={mode}/>
                </div>
            );
            case 'signin': return <Signin onSignin={this.changeRoute('home')} onRegister={this.changeRoute('register')}/>;
            case 'register': return <Register onClick={this.changeRoute('home')}/> ;
            default: return <Signin onClick={this.changeRoute('home')}/>;
        }
    }
    
    changeRoute = (route) => {
        return () => {
            if (route === 'home') this.setState({isSignedIn: true});
            else if (route === 'signin' || route === 'register') this.setState({isSignedIn: false});
            this.setState({route});
        }
    }
    
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
    onModeChange = (mode) => {
        return (event) => {
            const modeBtns = document.querySelectorAll('.modeBtn');
            Array.from(modeBtns).forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            this.setState({mode, imageUrl: '', data: [], selectedFace: 0});
        }
    }
    
    onFaceSelect = (event) => {
        this.setState({selectedFace: Number(event.target.getAttribute('index'))});
    }
    
    onSubmit = () => {
        const input = this.state.input;
        const mode = this.state.mode;
        // if (/http(s?):\/\/[a-zA-Z0-9/.-_]+(.jpg$|.png$|.bmp$|.jpeg$)/.test(input) === false){
        //     this.setState({imageUrl: ''});
        //     return;
        // }
                
        // return;
        if (mode === 'face'){
            console.log('start prediction');
            app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, input).then(
                (response) => {
                    console.log(response);
                    const data = response.outputs[0].data;
                    if (data.regions){
                        this.setState({data: data.regions, imageUrl: input});
                    } else {
                        this.setState({imageUrl: input});
                    }
                },
                (err) => {
                    console.error(err);
                }
            );
        } else if (mode === 'food'){
            app.models.predict(Clarifai.FOOD_MODEL, input).then(
                (response) => {
                    console.log(response);
                    const data = response.outputs[0].data;
                    if (data.concepts.length > 0){
                        this.setState({data, imageUrl: input});
                    } else {
                        this.setState({imageUrl: input});
                    }
                },
                (err) => {
                    console.error(err);
                }
            );
        }
        
    }
}

export default App;
