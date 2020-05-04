import React, { Component } from 'react';
import _ from 'lodash';

import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import List from './common/list';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({
      movies,
    });
  };

  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handlePreChangePage = (page) => {
    this.setState({
      currentPage: page - 1,
    });
  };

  handleNextChangePage = (page) => {
    this.setState({
      currentPage: page + 1,
    });
  };

  handleSelectGenre = (genre) => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    
    this.setState({
      sortColumn,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => {
            return m.genre._id === currentGenre._id;
          })
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-2">
          <List
            genres={genres}
            currentGenre={currentGenre}
            onSelectGenre={this.handleSelectGenre}
          />
        </div>
        <div className="col">
          <MoviesTable
            movies={movies}
            filtered={filtered}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            count={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handleChangePage}
            onPrePageChange={this.handlePreChangePage}
            onNextPageChange={this.handleNextChangePage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
