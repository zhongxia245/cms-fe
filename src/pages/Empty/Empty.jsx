import React, { Component } from 'react';
import EmptyContent from './components/EmptyContent';

export default class Empty extends Component {
  static displayName = 'Empty';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="empty-page">
        <EmptyContent />
      </div>
    );
  }
}
