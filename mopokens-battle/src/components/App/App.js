import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionInput from 'material-ui/svg-icons/action/input';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import { Link } from 'react-router-dom'
import {pink500} from 'material-ui/styles/colors'
// import LoginPage from '../Login/SignUplogin';
// import Register from '../Login/Register';
import PlayBattle from '../MopokenBreeder/PlayBattle/PlayBattle';
// import PlayBattle from '../MopokenBreeder/PlayBattle/PlayBattle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mopokens</h1>
        </header>
       <p className="App-intro">
          Welcome to the world of Mopokens.
        </p>
        <MuiThemeProvider>
          { !this.props.match.params.firstName ?
          <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: '30pc'}}>
        <FlatButton label="Wanna be a breeder?" labelStyle={{color: pink500,
        textTransform: 'none', fontSize: '1.2em'
}}/>
        <Link to="/register">
        <FloatingActionButton mini style={{marginRight: 10}}>
      <ActionInput />
    </FloatingActionButton>
          </Link>
          
          
          <FlatButton label="Already befriended mopokens?" labelStyle={{color: pink500,
        textTransform: 'none', fontSize: '1.2em'}} />
        <Link to="/login">
        <FloatingActionButton mini style={{marginRight: 10}}>
      <ActionLockOpen />
    </FloatingActionButton>
          </Link>
          </div> : <PlayBattle user={this.props.match.params.firstName} /> }
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
