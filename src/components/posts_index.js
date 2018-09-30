import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import _ from 'lodash';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      )
    })
  }

  render() {
    // console.log("this is this.props ", this.props);
    return (
      <div>
        <div className="text-xs-right">
          <Link to = "/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>
          Posts
        </h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// In order to get list of posts inside componenent,
// we need to consume from application level state.
// We always define our map state to prop's function
function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
