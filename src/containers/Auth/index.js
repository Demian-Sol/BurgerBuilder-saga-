import React, { Component } from 'react';
import Styles from './Auth.module.css';

import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/';
import Spinner from '../../components/UI/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/Utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid:false,
        touched: false
      }
    },
    submitEnabled: false,
    isSignup: true
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {...this.state.controls}
    const updatedEl = {...updatedForm[inputIdentifier]}
    let formValid = true;
    updatedEl.value = event.target.value;

    if (updatedEl.validation) {
      updatedEl.valid = checkValidity(updatedEl.value, updatedEl.validation);       
    }
    // console.log(updatedEl.value, updatedEl.valid);
    if (!updatedEl.touched) {
      updatedEl.touched = true;
    }
    updatedForm[inputIdentifier] = updatedEl;
    for (let key in updatedForm) {
      if (updatedForm[key].validation && !updatedForm[key].valid) {
        formValid = false;
      }
    }    
    this.setState({controls: updatedForm, submitEnabled: formValid} )
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthMode = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    });
  }

  render() {
    let inputFormArray = []
    for (let key in this.state.controls) {
      inputFormArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = inputFormArray.map(inputElement => (
      <Input 
        className={Styles.Input}
        key={inputElement.id} 
        elementType={inputElement.config.elementType} 
        elementConfig={inputElement.config.elementConfig} 
        value={inputElement.config.value}
        changed={(event) => this.inputChangedHandler(event, inputElement.id)}
        invalid={inputElement.config.validation ? !inputElement.config.valid : false}
        touched={inputElement.config.touched} />
    ))
    let authForm = (
        <> 
          <form onSubmit={this.submitHandler}>
           {form}
           <Button btnType='Success' disabled={!this.state.submitEnabled}>Submit</Button> 
          </form>
          <Button btnType='Danger' clicked={this.switchAuthMode}>Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
          <p>Current mode: {this.state.isSignup ? 'Sign Up' : 'Sign In'}</p>
        </>);
    if (this.props.loading) {
      authForm = <Spinner />
    }

    return (
      <div className={Styles.Auth}>
        {this.props.error &&
          <h3>
            {this.props.error}
          </h3>
        }
        {authForm}
        {this.props.isAuthenticated &&
          <Redirect to={this.props.building ? '/checkout' : '/'} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== '',
    building: state.ingrs.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch( auth(email, password, isSignup) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Auth );
