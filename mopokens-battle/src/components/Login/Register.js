import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { setTimeout } from 'timers';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName:'',
      email:'',
      password:'',
      uri: 'http://localhost:3001',
      errors: {},
    }
    this.validateUser = this.validateUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  validateUser() {
    this.setState({errors: {}});
    let inValidMail = false;
    const atpos = this.state.email.indexOf("@");
    const dotpos = this.state.email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=this.state.email.length) {
      inValidMail = true;
    }
    if(this.state.firstName === '') {
      this.setState({ errors: Object.assign({}, this.state.errors,
        { firstName: 'First name is required'})})
    }if(this.state.lastName === '') {
      this.setState({ errors: Object.assign({}, this.state.errors,
        { lastName: 'Last name is required'})})
        
    }if(this.state.email === '' || inValidMail) {
      this.setState({ errors: Object.assign({}, this.state.errors,
        { email: 'Email id is invalid'})})
    }if(this.state.password === '') {
      this.setState({ errors: Object.assign({}, this.state.errors,
        { password: 'Password is required'})})
    }if(this.state.password.length > 15) {
      this.setState({ errors: Object.assign({}, this.state.errors,
        { password: 'Password should not be more than 15 characters'})})
    }if(this.state.password.length !== 0 && this.state.password.length<5){
      this.setState({ errors: Object.assign({}, this.state.errors,
        { password: 'Password should not be less than 5 characters'})})
    }if(this.state.email !== '' && !inValidMail) {
      axios.post(`${this.state.uri}/api/findEmail`,{email: this.state.email}).then(
        (res) => res.data.user !== null ? this.setState({ errors: Object.assign({}, this.state.errors,
          { email: 'Email id is already registered'})}) : null
      );
    }
  }

  registerUser(event){
    let initialData = [];
    this.validateUser();
    setTimeout(() => {
      if(Object.keys(this.state.errors).length === 0) {
        axios.get(`${this.state.uri}/api/mopokens`).then(
          (res) => {
            initialData = res.data;
            const newBreeder = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password,
              mopokens: initialData
          } 
        axios.post(`${this.state.uri}/api/register`,newBreeder).then(
          (res) => {
            if(res.data && res.data.email === this.state.email) {
              this.props.history.push("/breeder/"+this.state.email);
            }
          }).catch(function (error) {
            console.log(error.response);
        });
          }).catch(function (error) {
          console.log(error.response);
     });
        }
    },2000) 
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <div style={{marginLeft: '30pc'}}>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             errorText={this.state.errors.firstName}
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             errorText={this.state.errors.lastName}
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             errorText={this.state.errors.email}
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             errorText={this.state.errors.password}
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.registerUser(event)}/>
           {/* { this.state.navigate ?
           <Link to="/breeder" params={{firstName: this.state.email}} /> : null } */}
          </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(Register);
