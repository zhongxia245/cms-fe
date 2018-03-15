import './index.scss';
import React, { Component } from 'react';
import FormDialog from '../../pages/private/components/FormDialog'

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <FormDialog />
      </div>
    );
  }
}
