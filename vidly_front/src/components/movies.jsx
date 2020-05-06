import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import auth from '../services/authService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import List from './common/list';
import SearchBar from './searchBar';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' },
    searchQurry: '',
    currentGenre: '',
  };

  async componentDidMount() {
    const { data: genresData } = await getGenres();
    const { data: moviesData } = await getMovies();
    const genres = [{ _id: '', name: 'All Genres' }, ...genresData];
    this.setState({
      movies: moviesData,
      genres,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted!');
        this.setState({
          movies: originalMovies,
        });
      }
    }
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
      searchQurry: '',
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  handleSearch = (qurry) => {
    this.setState({
      searchQurry: qurry,
      currentGenre: '',
      currentPage: 1,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      value,
      currentGenre,
      sortColumn,
      searchQurry,
    } = this.state;

    let filtered = allMovies;
    if (searchQurry) {
      filtered = allMovies.filter((m) => {
        return m.title.toLowerCase().startsWith(searchQurry.toLowerCase());
      });
    } else if (currentGenre && currentGenre._id) {
      filtered = allMovies.filter((m) => {
        return m.genre._id === currentGenre._id;
      });
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    const user = auth.getCurrentUser();

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
          {user && user.isAdmin && (
            <button className="btn btn-primary mb-2">
              <Link
                to="/movies/new"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                New Movie
              </Link>
            </button>
          )}
          <SearchBar value={searchQurry} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            filtered={filtered}
            sortColumn={sortColumn}
            value={value}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onValueChange={this.handleValueChange}
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
