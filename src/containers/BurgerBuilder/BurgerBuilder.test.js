import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './index';
import BuildControls from '../../components/Burger/BuildControls';


configure({adapter: new Adapter() });
 
describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<BurgerBuilder onInitPurchase={() => {}} onInitialiseIngredients={() => {}}/>);
  });
// console.log(shallow(<BurgerBuilder />))
  // it('should render <BuildControls /> when receiving ingredients', () => {
  //   wrapper.setProps({errorOccured: false, ingredientsRedux: {salad: 0, bacon: 0, meat: 0, cheese: 9} });
  //   expect(wrapper.find(BuildControls)).toHaveLength(1);
  // })
});
