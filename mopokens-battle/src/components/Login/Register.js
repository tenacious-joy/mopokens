import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName:'',
      email:'',
      password:'',
      uri: 'http://localhost:3001',
    }
  }

  registerUser(event){
      const newBreeder = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
      } 
    axios.post(`${this.state.uri}/api/register`,newBreeder)
    .then(res => {
    alert("User saved successfully");
 });
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
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             style={{width:'50%'}}
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <Link to={`/breeder/${this.state.firstName}`}>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.registerUser(event)}/>
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
export default Register;
