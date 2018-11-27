import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions';

class Logout extends Component {
  render() {
    this.props.onLogout();
    return <Redirect from='/logout' to='b-builder' />
  }
}

const mapDispatchToProps = dispatch => (
  {onLogout: () => dispatch( logout() )}
);

export default connect(null, mapDispatchToProps)(Logout);