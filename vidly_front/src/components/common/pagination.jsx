import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {
    pageSize,
    count,
    currentPage,
    onPageChange,
    onPrePageChange,
    onNextPageChange,
  } = props;
  const pages = Math.ceil(count / pageSize);
  if (pages === 1) return null;
  const pageArray = _.range(1, pages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === 1 ? true : false}
            onClick={() => onPrePageChange(currentPage)}
          >
            Previous
          </button>
        </li>
        {pageArray.map((page) => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
            >
              <a href="#/" className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            disabled={
              currentPage === pageArray[pageArray.length - 1] ? true : false
            }
            onClick={() => onNextPageChange(currentPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.prototype = {
  pageSize: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPrePageChange: PropTypes.func.isRequired,
  onNextPageChange: PropTypes.func.isRequired,
};

export default Pagination;
