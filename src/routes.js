import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Posts from './components/posts';
import PostForm from './components/post_form';
import Post from './components/post';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Posts} />
        <Route path="new-post" component={PostForm} />
        <Route path="post-:id" component={Post} />
    </Route>
);
