import React from 'react';

import CommentRemoveConfirmation from './comment-remove-confirmation';

export default class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      isAbusive: false
    };
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
          <CommentRemoveConfirmation onDelete={this._handleDelete.bind(this)} />
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
      </div>
    );
  }

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleDelete() {
    this.props.onDelete(this.props.id);
  }
}
