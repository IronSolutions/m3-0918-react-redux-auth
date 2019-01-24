import React, { Component } from 'react';
import './App.css';
import { AboutPage } from './pages/about';
import { Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HomePage } from './pages/home';
import posed, { PoseGroup } from 'react-pose';
import styled from '@emotion/styled';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { Messages } from './components/Messages';
import { connect } from 'react-redux';
import { AuthAPI } from './lib/auth';
import { logout } from './lib/redux/actions';

const NavMenu = styled.nav`
  a{
    display:inline-block;
    background: white;
    padding: 5px;
    margin: 5px;
    color:black;
    &.active{
      color: red;
    }
  }
`;


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const Menu = connect(state => ({user: state.user}))(({user, dispatch}) => (
  <NavMenu>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    {user ?
      <React.Fragment>
        <p>Welcome {user.username}</p>
        <a href="#" onClick={() => AuthAPI.logout().then(() => dispatch(logout()))}>Logout</a>
      </React.Fragment>
    :
      <React.Fragment>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </React.Fragment>
    }
  </NavMenu>
))


class App extends Component {
  render() {
    return (
      <Route
    render={({ location }) => (
      <div className="App">
        <header className="App-header">
          <h2>PokeApi Example</h2>
          <Messages/>
          <Menu/>
          <PoseGroup>
            <RouteContainer key={location.pathname}>
              <Switch location={location}>
                <Route exact strict path="/" component={HomePage} key="1"/>
                <Route path="/about" component={AboutPage} key="2"/>
                <Route path="/login" component={LoginPage} key="3"/>
                <Route path="/signup" component={SignupPage} key="4"/>
              </Switch>
            </RouteContainer>
          </PoseGroup>
        </header>
      </div>
    ) 
    }/>
    );
  }
}

export default App;
