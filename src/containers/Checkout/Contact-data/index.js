import React, { Component } from 'react'

import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Spinner from '../../../components/UI/Spinner';
import Styles from './Contact-data.module.css';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/';
import { connect } from 'react-redux';
import { checkValidity } from '../../../shared/Utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid:false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false,
        touched: false
      },
      shippingMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: 'fastest'
      }
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    // console.log(formData);
    const orderToSend = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData:formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(orderToSend, this.props.token);
    
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {...this.state.orderForm}
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
    
    this.setState({orderForm: updatedForm, formIsValid: formValid} )
  }

  render() {
    let inputFormArray = []
    for (let key in this.state.orderForm) {
      inputFormArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    //console.log(inputFormArray);
    let form = (<form onSubmit={this.orderHandler}>
                  {inputFormArray.map( (el) =>{
                    return <Input 
                        key={el.id} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        invalid={el.config.validation ? !el.config.valid : false}
                        touched={el.config.touched} />
                  })}
                  <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
                </form>);
    if (this.props.loading) {
      form = <Spinner />
    }
    return(
      <div className={Styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ordrs.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token) )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios) ) );
