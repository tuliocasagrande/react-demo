import React from 'react';
import PropTypes from 'prop-types';

export default class CommentConfirmation extends React.Component {
  constructor() {
    super();

    this.state = {
      showConfirm: false
    };

    this._confirmAction = this._confirmAction.bind(this);
    this._toggleConfirmMessage = this._toggleConfirmMessage.bind(this);
  }

  render() {

    let confirmNode;

    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmAction}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage}>{this.props.children}</a>;
    }

    return (
      <span>
        {confirmNode}
      </span>
    );
  }

  _toggleConfirmMessage(event) {
    event.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });

  }

  _confirmAction(event) {
    event.preventDefault();
    this.props.onConfirm();
  }
}

CommentConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired
};
