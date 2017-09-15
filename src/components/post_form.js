import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                // blog post has been created, navigate user to the index
                this.context.router.push('/');
            });
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className="col-6">
                <h3>Create a new post</h3>

                <div className="form-group">
                    <label htmlFor="post__title">Title</label>

                    <input
                        type="text"
                        className={`form-control ${title.touched && title.invalid ? 'is-invalid' : ''}`}
                        id="post__title"
                        {...title}
                    />

                    <span className="text-help text-danger">{title.touched ? title.error : ''}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="post__categories">Categories</label>

                    <input
                        type="text"
                        className={`form-control ${categories.touched && categories.invalid ? 'is-invalid' : ''}`}
                        id="post__categories"
                        {...categories}
                    />

                    <span className="text-help text-danger">{categories.touched ? categories.error : ''}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="post__content">Content</label>

                    <textarea
                        className={`form-control ${content.touched && content.invalid ? 'is-invalid' : ''}`}
                        id="post__content"
                        {...content}
                    />

                    <span className="text-help text-danger">{content.touched ? content.error: ''}</span>
                </div>

                <div className="btn-group mr-2">
                    <button type="submit mr-2" className="btn btn-primary">Submit</button>
                </div>

                <div className="btn-group">
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username'
    }

    if (!values.categories) {
        errors.categories = 'Enter categories'
    }

    if (!values.content) {
        errors.content = 'Enter some content'
    }

    return errors;
}

export default reduxForm({
    form: 'PostForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostForm);