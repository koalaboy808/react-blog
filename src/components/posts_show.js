import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions'
import { deletePost } from '../actions'
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);

    // why can't you just use this.props.fetchPosts();
    // fetchPost(id) necessary....?
  }

  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {currentPost} = this.props;

    if (!currentPost) {
      return <div> loading... </div>
    }

    return (
      <div>
        <h1>{currentPost.title}</h1>
        <h6>{currentPost.categories}</h6>
        <h6>{currentPost.content}</h6>
        <Link to = "/" > All </Link>
        <button
          className="has-danger"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

// You can use mapStateToProps's not just to select little pieces of State of the global state objects
// but also to do some intermediate calculation of sorts inside as well
function mapStateToProps( {posts}, ownProps ) {
  return { currentPost: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
