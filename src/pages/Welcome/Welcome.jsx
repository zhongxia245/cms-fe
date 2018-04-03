import React, { Component } from 'react';
import LandingIntroBanner from './components/LandingIntroBanner';

export default class Welcome extends Component {
  static displayName = 'Welcome';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="welcome-page">
        <LandingIntroBanner />
      </div>
    );
  }
}
