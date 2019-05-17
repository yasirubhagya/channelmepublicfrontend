import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuBar from './Layout/AppBar';
import Channel2 from './PublicSection/Channel2/Channel2';
import Footer from './Layout/Footer';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/Login';
import SignOut from './Auth/Logout';
import Book from './PublicSection/Channel2/Book';
import SearchResult from './PublicSection/Channel2/ChannelContent';
import MyChannels from './PublicSection/Channel2/MyChannels';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
class App extends Component {

  state = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    open: false,
    selectedChannelIndex: -1,
    channels: []
  }

  setUserHandle = (user) => {

    this.setState({ user: user });
    //console.log(this.state.user);
  }

  toggleHandle = () => {
    this.setState({ open: !this.state.open })
  }

  SetSelectedChannelIndex = (index) => {
    this.setState({ selectedChannelIndex: index });
  }

  setChannels = (channels) => {
    this.setState({ channels: channels });
  }

  render() {
    return (
      <BrowserRouter>

        <React.Fragment>
          <CssBaseline />
          <MenuBar open={this.state.open} onClose={this.toggleHandle} user={this.state.user} />
          <Switch>
            <Route path="/" exact render={(routeProps) => (
              <Channel2 {...routeProps} channels={this.state.channels} setChannels={this.setChannels} />
            )} />
            <Route path="/SerchResult" exact render={(routeProps) => (
              <SearchResult {...routeProps} data={this.state.channels} SetSelectedChannelIndex={this.SetSelectedChannelIndex} setChannels={this.setChannels} />
            )} />
            <Route path="/Book" exact render={(routeProps) => (
              <Book {...routeProps} user={this.state.user} data={this.state.channels} SelectedChannelIndex={this.state.selectedChannelIndex} setUserHandle={this.setUserHandle} />
            )} />
             <Route path="/MyChannels" exact render={(routeProps) => (
              <MyChannels {...routeProps} user={this.state.user} data={this.state.channels} SelectedChannelIndex={this.state.selectedChannelIndex} setUserHandle={this.setUserHandle} />
            )} />
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
