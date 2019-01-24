import React from 'react';

export const LoginPage = ({history}) => {
    return (
        <div>
            <h2>Login</h2>
            <label>Username</label>
            <input/>
            <label>Password</label>
            <input type="password"/>
            <button onClick={() => history.push('/')}>Login</button>
        </div>
    )
}