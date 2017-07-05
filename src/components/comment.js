import React from 'react';

import CommentConfirmation from './comment-confirmation';

export default class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      isAbusive: false
    };

    this._handleDelete = this._handleDelete.bind(this);
    this._toggleAbuse = this._toggleAbuse.bind(this);
  }

  render() {
    const commentBody = (!this.state.isAbusive)
      ? this.props.body : <em>Content marked as abusive</em>;

    return (
      <div className="comment">

        <img src={ this.props.avatarUrl } alt={`${this.props.author}\'s picture`} />

        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{commentBody}</p>

        <div className="comment-actions">
          <CommentConfirmation onConfirm={this._handleDelete}>
            Delete comment
          </CommentConfirmation>
          <CommentConfirmation onConfirm={this._toggleAbuse}>
            Report as abuse
          </CommentConfirmation>
        </div>
      </div>
    );
  }

  _toggleAbuse() {
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleDelete() {
    this.props.onDelete(this.props.id);
  }
}
