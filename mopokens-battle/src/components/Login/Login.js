import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  uri: 'http://localhost:3001',
  }
 }

 handleLogin(event){
  axios.post(`${this.state.uri}/api/login`,{email: this.state.username, password: this.state.password})
    .then(res => {
    alert("User logged in successfully");
 });
}
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <div style={{marginLeft: '40pc', marginTop: '5pc'}}>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <Link to={`/breeder/${this.state.username}`}>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLogin(event)}/>
             </Link>
             </div>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
