import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  sortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) {
      return null;
    }
    if (this.props.sortColumn.order === 'asc') {
      return <i className="fa fa-sort-asc p-1"></i>;
    }
    return <i className="fa fa-sort-desc p-1"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                key={column.path || column.key}
                className="clickable"
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
                {this.sortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
