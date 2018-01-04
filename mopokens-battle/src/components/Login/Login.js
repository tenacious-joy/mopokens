import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  uri: 'http://localhost:3001',
  errors:{},
  }
 }

 validateLogin() {
  let inValidMail = false;
    var atpos = this.state.username.indexOf("@");
    var dotpos = this.state.username.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=this.state.username.length) {
      inValidMail = true;
    }
  if(this.state.username === '' || inValidMail) {
    this.setState({ errors: Object.assign({}, this.state.errors,
      { username: 'Username is invalid'})})
  }if(this.state.password === '') {
    this.setState({ errors: Object.assign({}, this.state.errors,
      { password: 'Password is required'})})
  }if(this.state.password.length > 15) {
    this.setState({ errors: Object.assign({}, this.state.errors,
      { password: 'Password should not be more than 15 characters'})})
  }if(this.state.password.length<5){
    this.setState({ errors: Object.assign({}, this.state.errors,
      { password: 'Password should not be less than 5 characters'})})
  }
 }

 handleLogin(event){
   this.validateLogin();
  if(Object.keys(this.state.errors).length === 0) {
  axios.post(`${this.state.uri}/api/login`,{email: this.state.username, password: this.state.password})
    .then(res => {
      if(res.data.message) {
        this.props.history.push("/breeder/"+this.state.username);
      }
 }).catch(function (error) {
  console.log(error.response);
});
 }
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
             hintText="Enter your Username.Your registered email id is the username"
             floatingLabelText="Username"
             errorText={this.state.errors.username}
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               errorText={this.state.errors.password}
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLogin(event)}/>
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
export default withRouter(Login);
