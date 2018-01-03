import React from 'react';
import { Switch, Route } from 'react-router-dom'
import App from './App';
import Register from '../Login/Register';
import Login from '../Login/Login';
import { Link } from 'react-router-dom'

const Main = () => (
  <div>
  <main>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route exact path='/breeder/:firstName' component={App}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
  <Link to={'/'} />
  </div>
)
export default Main;
