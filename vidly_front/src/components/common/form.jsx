import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

class Form extends Component {
  //表单验证
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null; //验证无错直接返回空
    const errors = {};
    for (let item of result.error.details) {
      //循环整个表单的details将对应域的错误信息保存到对应errors名的值中
      errors[item.path[0]] = item.message; //path的值即为表单中出错的对应域的名字
    }
    return errors;
  };

  //表单某个域验证
  validateProperty = (currentTargetArea) => {
    const { name, value } = currentTargetArea; //从要验证的域中解构出名字和值
    const obj = { [name]: value }; //封装成对象传入Joi验证
    const schema = { [name]: this.schema[name] }; //需要用子域，否则会变为全局验证
    const { error } = Joi.validate(obj, schema); //从验证的结果中解构出错误对象
    return error ? error.details[0].message : null; //若有值返回error对象的错误信息
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    if (errors) return;
    this.doSubmit(); //不同表单要执行的具体需求
  };

  handleInputChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else {
      delete errors[e.currentTarget.name];
    }
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      data,
      errors,
    });
  };

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleInputChange}
        errors={errors}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleInputChange}
        errors={errors}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }
}

export default Form;
