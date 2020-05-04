import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Movies from './components/movies';
import NarBar from './components/navbar';
import Customers from './components/routes/customers';
import MovieForm from './components/routes/movieForm';
import Rentals from './components/routes/rentals';
import NotFound from './components/routes/not-found';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NarBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
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
