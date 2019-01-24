import React from 'react';
import { AuthAPI } from '../lib/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { errorMessageAction, login, clearMessages } from '../lib/redux/actions';

class _LoginForm extends React.Component {

    constructor(){
        super();
        this.state = {
            username:"",
            password:""
        }
    }

    handleLogin(){
        const {username, password} = this.state;
        const {history, dispatch} = this.props;
        AuthAPI.login(username, password)
        .then( user =>{
            dispatch(clearMessages());
            dispatch(login(user))
            history.push('/');
        })
        .catch( e => {
            dispatch(errorMessageAction("Invalid login credentials"));
        });
    }

    render() {
        const {username, password} = this.state;
        return (
            <div>
                <h2>Login</h2>
                <label>Username</label>
                <input value={username} onChange={e => this.setState({username:e.target.value})}/>
                <label>Password</label>
                <input value={password} type="password" onChange={e => this.setState({password:e.target.value})}/>
                <button onClick={() => this.handleLogin()}>Login</button>
            </div>
        );
    }
};

export const LoginForm = connect()(withRouter(_LoginForm));