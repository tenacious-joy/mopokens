import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PlayBattle from '../MopokenBreeder/PlayBattle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: props.welcome
    };
    this.hideWelcome = this.hideWelcome.bind(this);
  }

  hideWelcome() {
    this.setState({ welcome: !this.state.welcome });
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mopokens</h1>
        </header>
        {
          this.state.welcome ? <p className="App-intro">
          Welcome to the world of Mopokens. Wanna be a breeder?
        </p> : null
        }
        
        <MuiThemeProvider>
          <PlayBattle hideWelcome={this.hideWelcome} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
