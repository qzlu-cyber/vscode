import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import auth from '../../services/authService';
import Form from '../common/form';
import { Redirect } from 'react-router-dom';

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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : '/'; //强制重载页面
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({
        errors,
      });
      toast.error('Username or password is not true!');
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

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
