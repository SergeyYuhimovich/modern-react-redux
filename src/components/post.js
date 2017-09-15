import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';


class Post extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // blog post has been deleted, navigate user to the index
                this.context.router.push('/');
            });
    }

    render() {
        const { post } = this.props;
        if (!this.props.post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back to posts list</Link>

                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>

                <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete post</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {post: state.posts.post};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(Post);