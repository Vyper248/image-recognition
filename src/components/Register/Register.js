import React, {Component} from 'react';
import '../Signin/Signin.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
        }
    }
    
    render(){
        let error = <div className="formError">{this.state.error}</div>;
        if (this.state.error.length === 0) error = <div></div>;
        
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
                {error}
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
        if (!this.checkValidity()) return;
        
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(data => {
            if (data.status === 'success'){
                this.props.onClick(data.data);
            } else {
                this.setState({error: data.message});
            }
        }).catch(err => console.log(err));
    }
    
    checkValidity = () => {
        const {name, email, password} = this.state;
        if (name.length === 0){
            this.setState({error: 'Please input your name'});
            return false;
        }
        if (email.length === 0 || !/.+@.+\.[a-zA-Z]+/.test(email)){
            this.setState({error: 'Please make sure your email is valid'});
            return false;
        }
        if (password.length < 8){
            this.setState({error: 'Please make sure your password is at least 8 characters'});
            return false;
        }
        return true;
    }
};

export default Register;