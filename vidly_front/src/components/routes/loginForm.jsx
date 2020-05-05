import React from 'react';
import Joi from 'joi-browser';

import Form from '../common/form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().min(5).max(30).required().label('Username'),
    password: Joi.string().min(8).max(20).required().label('Password'),
  };

  doSubmit = () => {
    console.log('Submited');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderButton('Login')}
      </form>
    );
  }
}

export default LoginForm;
