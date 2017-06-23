import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { createPost } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
};

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} className="form-control" />
    {touched && ((error && <div className="text-help">{error}</div>) || (warning && <div className="text-help">{warning}</div>))}
  </div>
);

const renderTextarea = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <textarea {...input} placeholder={label} type={type} className="form-control" />
    {touched && ((error && <div className="text-help">{error}</div>) || (warning && <div className="text-help">{warning}</div>))}
  </div>
)

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    // bindings
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // Blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.props.history.push("/");
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Post</h3>
        <Field name="title" component={renderInput} type="text" label="Title"/>
        <Field name="categories" component={renderInput} type="text" label="Categories"/>
        <Field name="content" component={renderTextarea} type="text" label="Content"/>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

export default connect(null, { createPost })(reduxForm({
  form: 'PostsNewForm',
  validate
})(PostsNew));
