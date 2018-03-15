import React, { Component } from 'react';
import NotPermission from './components/NotPermission';

export default class PageNotPermission extends Component {
  static displayName = 'NotPermission';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="not-permission-page">
        <NotPermission />
      </div>
    );
  }
}
