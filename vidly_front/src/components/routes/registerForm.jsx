import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import { register } from '../../services/userService';
import Form from '../common/form';
import auth from '../../services/authService';

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

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJWT(response.headers['x-auth-token']);
      
      window.location = '/'; //强制重载页面
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({
          errors,
        });
        toast.error('E-mail has already registed!');
      }
    }
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
