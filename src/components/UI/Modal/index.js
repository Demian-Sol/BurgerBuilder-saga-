import React, { Component } from 'react';
 
import Styles from './Modal.module.css';
import Backdrop from '../Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.isHidden !== nextProps.isHidden || nextProps.children !== this.props.children)
  } 
  render () {
    const styling = this.props.isHidden ? `${Styles.Modal} ${Styles.Hidden}` : Styles.Modal;
    return (
      <>
        <div className={styling}>
          {this.props.children}        
        </div>
        <Backdrop dropBack={this.props.dropBack} show={!this.props.isHidden} />
      </>
    );
  }
}

export default Modal;