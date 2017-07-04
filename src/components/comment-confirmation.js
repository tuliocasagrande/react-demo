import React from 'react';

export default class CommentConfirmation extends React.Component {
  constructor() {
    super();

    this.state = {
      showConfirm: false
    };
  }

  render() {

    let confirmNode;

    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmAction.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>{this.props.children}</a>;
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
