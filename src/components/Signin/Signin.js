import React, {Component} from 'react';
import './Signin.css';

class Signin extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
        };
    }
    
    render(){
        return (
            <div className="signin">
                <h4>Sign In</h4>
                <div>
                    <div className="formGroup">
                        <label>Email</label>
                        <input type="text" onChange={this.onEmailChange}></input>
                    </div>
                    <div className="formGroup">
                        <label>Password</label>
                        <input type="password" onChange={this.onPasswordChange}></input>
                    </div>
                    <button className="signinBtn" onClick={this.onSubmit}>Sign In</button>
                </div>
                <p onClick={this.props.onRegister}>Sign up</p>
            </div>
        );
    }
    
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    
    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    
    onSubmit = () => {
        fetch('/signin', {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
            headers: {
                "Content-Type": "application/json"
            }   
        }).then(resp => resp.json()).then(data => {
            console.log(data);
            if (data.status === 'sucess'){
                this.props.onSignin();
            } else {
                console.log('Signin Error: ', data.error);
            }
        }).catch(err => {
            console.log('Signin Error: ', err);
        });
    }
};

export default Signin;