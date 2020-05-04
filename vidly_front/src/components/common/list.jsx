import React from 'react';

const List = (props) => {
  const {
    genres,
    currentGenre,
    onSelectGenre,
    textProperty,
    valueProperty,
  } = props;
  return (
    <ul className="list-group">
      {genres.map((genre) => {
        return (
          <li
            key={genre[valueProperty]}
            className={
              genre === currentGenre
                ? 'clickable list-group-item active'
                : 'clickable list-group-item'
            }
            onClick={() => onSelectGenre(genre)}
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

List.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default List;
