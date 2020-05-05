import React from 'react';
import Joi from 'joi-browser';

import Form from '../common/form';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().min(5).max(30).required().email().label('Username'),
    password: Joi.string().min(8).max(20).required().label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = () => {
    console.log('Registered');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderInput('name', 'Name')}
        {this.renderButton('Register')}
      </form>
    );
  }
}

export default RegisterForm;
