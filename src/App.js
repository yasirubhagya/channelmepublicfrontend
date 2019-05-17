import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuBar from './Layout/AppBar';
import Channel2 from './PublicSection/Channel2/Channel2';
import Footer from './Layout/Footer';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/Login';
import SignOut from './Auth/Logout';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
class App extends Component {

  state = {
    user: localStorage.getItem('user'),
    open: false
  }

  setUserHandle = (user) => {

    this.setState({ user: user });
    //console.log(this.state.user);
  }

  toggleHandle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {

    return (
      <BrowserRouter>

        <React.Fragment>
          <CssBaseline />
          <MenuBar open={this.state.open} onClose={this.toggleHandle} user={this.state.user} />
          <Switch>
            <Route path="/" exact component={Channel2} />
            <Route path="/SignIn" exact render={(routeProps) => (
              <SignIn {...routeProps} setUserHandle={this.setUserHandle} />
            )} />
            <Route path="/SignUp" exact render={(routeProps) => (
              <SignUp {...routeProps} setUserHandle={this.setUserHandle} />
            )} />
            <Route path="/SignOut" exact render={(routeProps) => (
              <SignOut {...routeProps} setUserHandle={this.setUserHandle} />
            )} />
            <Redirect from="/" to="/" />
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );

  }
}

export default App;
