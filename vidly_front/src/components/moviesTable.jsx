import React, { Component } from 'react';

import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';

export default class MoviesTable extends Component {
  render() {
    const {
      movies,
      filtered,
      sortColumn,
      onLike,
      onDelete,
      onSort,
    } = this.props;

    const columns = [
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
          return <Like isLiked={movie.isLiked} onLike={() => onLike(movie)} />;
        },
      },
      {
        key: 'delete',
        content: (movie) => {
          return (
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          );
        },
      },
    ];

    return (
      <React.Fragment>
        <p>Showing {filtered.length} movies in the database.</p>
        <table className="table">
          <Table
            columns={columns}
            sortColumn={sortColumn}
            data={movies}
            onSort={onSort}
          />
        </table>
      </React.Fragment>
    );
  }
}
