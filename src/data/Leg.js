'use es6';

import {List, Record} from 'immutable';

let defaults = {
  distance: '',
  duration: '',
  start: '',
  end: '',
  arrivalTime: undefined,
  departureTime: undefined,
  steps: List()
};

export default class Leg extends Record(defaults) {
}
