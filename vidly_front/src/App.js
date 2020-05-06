import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Movies from './components/movies';
import NarBar from './components/navbar';
import Customers from './components/routes/customers';
import MovieForm from './components/routes/movieForm';
import Rentals from './components/routes/rentals';
import LoginForm from './components/routes/loginForm';
import RegisterForm from './components/routes/registerForm';
import Logout from './components/routes/logout';
import NotFound from './components/routes/not-found';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NarBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
