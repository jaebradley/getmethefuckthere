'use es6';

import {List, Record} from 'immutable';

import Vehicle from './Vehicle';

let defaults = {
  name: '',
  agencies: List(),
  vehicle: Vehicle.BUS
};

export default class Line extends Record(defaults) {
}
