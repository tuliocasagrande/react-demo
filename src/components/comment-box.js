import React from 'react';
import jQuery from 'jquery';

import Comment from './comment';
import CommentForm from './comment-form';
import CommentAvatarList from './comment-avatar-list';

export default class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: true,
      comments: []
    };
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
    const buttonText = (!this.state.showComments) ? 'Show comments' : 'Hide comments';
    const comments = this._getComments();

    let commentNodes;
    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="row comments-container">
        <div className="cell">
          <h2>Join The Discussion</h2>
          <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
          <div className="comment-box">
            <CommentForm addComment={this._addComment.bind(this)} />
            <CommentAvatarList avatars={this._getAvatars()} />

            {this._getPopularMessage(comments.length)}
            <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
            <div className="comment-list">
              {commentNodes}
            </div>
          </div>
        </div>
      </div>

    );
  }

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
       return (
         <div>This post is getting really popular, dont miss out!</div>
       );
    }
  }

  _getComments() {
    return this.state.comments.map( (comment) => {
      return (<Comment
        {...comment}
        onDelete={this._deleteComment.bind(this)}
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

  _addComment(author, body) {
    const avatarUrl = 'assets/images/avatars/avatar-default.png';
    const comment = { author, body, avatarUrl };

    jQuery.post('/api/comments', { comment })
      .success( (newComment) => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      });
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: 'http://localhost:3000/comments',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  _deleteComment(commentID) {
    jQuery.ajax({
      method: 'DELETE',
      url: `/api/comments/${commentID}`
    });

    // optimistic update
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

}
