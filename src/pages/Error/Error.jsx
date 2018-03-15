import React, { Component } from 'react';
import BasicException from './components/BasicException';

export default class Error extends Component {
  static displayName = 'Error';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="error-page">
        <BasicException />
      </div>
    );
  }
}
