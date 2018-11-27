import React from 'react';

import Styles from './Input.module.css';

const input = (props) => {
  const inputStyles = [Styles.InputElement];

  if (props.invalid && props.touched) {
    inputStyles.push(Styles.Invalid);
  }

  const inputTypes = {
    'input': <input onChange={props.changed} className={inputStyles.join(' ')} {...props.elementConfig} value={props.value}/>,
    'textarea': <textarea onChange={props.changed} className={inputStyles.join(' ')} {...props.elementConfig} value={props.value}/>,
    'select': (<select 
                onChange={props.changed} 
                className={inputStyles.join(' ')} 
                value={props.value} >
                {(props.elementConfig && props.elementConfig.options) ? props.elementConfig.options.map( opt => {
                  return <option value={opt.value} key={opt.value + opt.displayValue}>{opt.displayValue}</option>
                })  : null}
                </select>)
  }
  const inputElement = inputTypes[props.elementType];
  return(
    <div className={Styles.Input}>
      <label className={Styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;
