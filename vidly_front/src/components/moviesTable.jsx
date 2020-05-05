import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from './common/table';
import Like from './common/like';

export default class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => {
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => {
        return (
          <Like
            isLiked={movie.isLiked}
            onLike={() => this.props.onLike(movie)}
          />
        );
      },
    },
    {
      key: 'delete',
      content: (movie) => {
        return (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        );
      },
    },
  ];

  render() {
    const { movies, filtered, sortColumn, onSort } = this.props;

    return (
      <React.Fragment>
        <p className="my-2">
          Showing {filtered.length} movies in the database.
        </p>
        <table className="table">
          <Table
            columns={this.columns}
            sortColumn={sortColumn}
            data={movies}
            onSort={onSort}
          />
        </table>
      </React.Fragment>
    );
  }
}
