import React, {Component} from 'react';
import '../Signin/Signin.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    
    render(){
        return (
            <div className="signin">
                <h4>Register</h4>
                <div>
                    <div className="formGroup">
                        <label>Name</label>
                        <input type="text" onChange={this.onNameChange}></input>
                    </div>
                    <div className="formGroup">
                        <label>Email</label>
                        <input type="email" onChange={this.onEmailChange}></input>
                    </div>
                    <div className="formGroup">
                        <label>Password</label>
                        <input type="password" onChange={this.onPasswordChange}></input>
                    </div>
                    <button className="signinBtn" onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        );
    }
    
    onNameChange = (e) => {
        this.setState({name: e.target.value});
    }
    
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    
    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    
    onSubmit = () => {
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(data => {
            console.log(data);
            if (data.status === 'success'){
                this.props.onClick();
            } else {
                console.log(data.error);
            }
        }).catch(err => console.log(err));
    }
};

export default Register;