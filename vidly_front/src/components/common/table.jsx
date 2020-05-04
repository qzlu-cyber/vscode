import React from 'react';

import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
  const { columns, sortColumn, data, onSort } = props;
  return (
    <React.Fragment>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </React.Fragment>
  );
};

export default Table;
