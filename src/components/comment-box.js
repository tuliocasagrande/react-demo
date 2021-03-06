import React from 'react';
import PropTypes from 'prop-types';

import { BASE_URI } from '../constants';
import Comment from './comment';
import CommentForm from './comment-form';
import CommentAvatarList from './comment-avatar-list';

export default class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };

    this._toggleComments = this._toggleComments.bind(this);
    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
  }

  componentWillMount() {
    this._fetchComments();
  }

  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchComments(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    const showCommentsText = (!this.state.showComments) ? 'Join the discussion' : 'Hide comments';
    const comments = this._getComments();

    let commentBox;
    if (this.state.showComments) {
      commentBox = (
        <div className="comment-box">
          <CommentForm addComment={this._addComment} />
          <CommentAvatarList avatars={this._getAvatars()} />
          <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
          <div className="comment-list">
            <div className="comment-list">{comments}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="row comments-container">
        <div className="cell">
          {this._getPopularMessage(comments.length)}
          <button className="toggle-comments-button" onClick={this._toggleComments}>{showCommentsText}</button>
          {commentBox}
        </div>
      </div>
    );
  }

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 5;
    if (commentCount >= POPULAR_COUNT) {
       return (
         <h4 className="popular-post-message">This post is getting really popular, don't miss out!</h4>
       );
    }
  }

  _getComments() {
    return this.state.comments.map( (comment) => {
      return (<Comment
        {...comment}
        onDelete={this._deleteComment}
        key={comment.id} />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _getApiUrl() {
    return `${BASE_URI}/${this.props.apiPath}/comments`;
  }

  _addComment(author, body) {
    const avatarUrl = 'assets/images/avatars/avatar-default.png';
    const comment = { author, body, avatarUrl };

    fetch(this._getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then((response) => {
        return response.json();
      })
      .then((newComment) => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      })
      .catch((error) => {
        console.log(`Something went wrong on the API: ${error}`);
      });
  }

  _fetchComments() {
    fetch(this._getApiUrl())
      .then((response) => {
        return response.json();
      })
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((error) => {
        console.log(`Something went wrong on the API: ${error}`);
      });
  }

  _deleteComment(commentID) {
    fetch(`${this._getApiUrl()}/${commentID}`, {
        method: 'DELETE'
      })
      .catch((error) => {
        console.log(`Something went wrong on the API: ${error}`);
      });

    // optimistic update
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
  }

  _toggleComments() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

}

CommentBox.propTypes = {
  apiPath: PropTypes.string.isRequired
}
