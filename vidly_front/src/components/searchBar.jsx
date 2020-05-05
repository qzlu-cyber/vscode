import React from 'react';

const SearchBar = (props) => {
  const { value, onChange } = props;
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
