import React from 'react';
import Joi from 'joi-browser';

import Form from '../common/form';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';

class MovieForm extends Form {
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
    title: Joi.string().min(1).max(50).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).required().label('Number in stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({
      genres,
    });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: this.mapToViewModel(movie),
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Movie</h1>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genreId', 'Genre', this.state.genres)}
        {this.renderInput('numberInStock', 'Number in stock')}
        {this.renderInput('dailyRentalRate', 'Rate')}
        {this.renderButton('Add')}
      </form>
    );
  }
}

export default MovieForm;
