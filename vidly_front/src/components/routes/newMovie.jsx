import React from 'react';
import Joi from 'joi-browser';

import Form from '../common/form';
import { getGenres } from '../../services/fakeGenreService';
import { getMovie, saveMovie } from '../../services/fakeMovieService';

class NewMovie extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().max(30).required().label('Title'),
    genreId: Joi.string().max(20).required().label('Genre'),
    numberInStock: Joi.number().min(0).required().label('Number in stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({
      genres,
    });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/movies');

    this.setState({
      data: this.mapToViewModel(movie),
    });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    //this.props.history.push('/movies');
    console.log('Added');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Movie</h1>
        {this.renderInput('title', 'Title')}
        {this.renderInput('genreId', 'Genre')}
        {this.renderInput('numberInStock', 'Number in stock')}
        {this.renderInput('dailyRentalRate', 'Rate')}
        {this.renderAddButton('Add')}
      </form>
    );
  }
}

export default NewMovie;
