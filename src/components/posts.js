import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class Posts extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`post-${post.id}`} className="d-flex justify-content-between">
                        <strong>{post.title}</strong>
                        <span>{post.categories}</span>
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center align-items-center">
                    <h3 className="m-2">Posts</h3>

                    <Link to="new-post" className="btn btn-primary m-2">
                        Add post
                    </Link>
                </div>

                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(Posts);
