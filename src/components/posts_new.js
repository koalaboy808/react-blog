import React, { Component } from 'react';
// Redux form is being integrated somehow into the redux side of our application
// this redux form helper right here is what allows our component to communicate
// with that additional reducer (ie, form: formReducer) that we just wired in.
// It's very similar to the connect helper.
// It is what is allowing our component to talk directly to the redux store.
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField(field) {
    // field.meta.touched and field.meta.error are properties added by reduxForm
    // the below is called object destructuring
    const {meta: {touched, error}} = field;
    const classDanger = `${ touched && error ? 'has-danger' : ''}`;

    return (
      <div>
        <label> {field.label} </label>
        <input
          className={classDanger}
          type="text"
          {...field.input}
        />
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  SubmitValues(values) {
    // this === component as we did a 'bind' on the 'this' referencing the component
    console.log(this.props);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // So when we referenced this props
    // and pull off this handle submit function right here.
    // This is a property that is being passed to the component
    // on behalf of redux form.
    /* handleSubmit handles the redux-form side of things
    // does the validation and only when validation ready, is it called
    // it takes a function of our own making, ie SubmitValues */
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.SubmitValues.bind(this))}>
          <Field
            label="Title"
            name="title"
            // instead of creating function directly with component,
            // will create helper function, also notice that there is no ()
            // since its just a reference to a function which will later
            /// be called by Field
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit"> Submit </button>
          <Link to = "/" className="text-danger"> Cancel </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "enter a title";
  }
  if(!values.categories) {
    errors.categories = "enter a holy category";
  }
  if(!values.content) {
    errors.content = "enter a content crap";
  }

  // if errors object is empty then fine to submite formReducer
  // if errors object has *any* values, then it assumes there is somethign wrong
  return errors;
}

// when using two helper functions on the same component: ie reduxForm and connect
// We take connect. As usual this writes to this statement right here.
// It returns a react component and so that is a valid input into the redux form helper.
export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(null, { createPost })(PostsNew)
);
