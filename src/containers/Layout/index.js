import React, { Component } from 'react';

import Styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authCheckState } from '../../store/actions';

class Layout extends Component {
  state = {
    isSideDrawerShown: false
  }

  componentDidMount() {
    this.props.onAppLanded();
  }

  sideDrawerClosedHandler = () => {
    if (this.state.isSideDrawerShown) {
      this.setState({isSideDrawerShown: false});
    }
  }

  sideDrawerToggledHandler = () => {
    const newState = !this.state.isSideDrawerShown;
    this.setState({isSideDrawerShown: newState});
  }

  render () {
  	return (
      <>
        <div>
          <Toolbar 
            isVisible={this.state.isBackDropVisible} 
            openSideDrawer={this.sideDrawerToggledHandler}
            isAuthenticated={this.props.isAuthenticated} />
          <SideDrawer 
            closeSideDrawer={this.sideDrawerClosedHandler} 
            isShown={this.state.isSideDrawerShown}
            isAuthenticated={this.props.isAuthenticated} />
        </div>
        <main className = {Styles.content}>
          {this.props.children}
        </main>
      </>
    );
  } 
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== ''
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAppLanded: () => dispatch( authCheckState() )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Layout ));