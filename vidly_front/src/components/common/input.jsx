import React from 'react';

const Input = (props) => {
  const { name, label, errors, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} className="form-control" name={name} />
      {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
    </div>
  );
};

export default Input;
