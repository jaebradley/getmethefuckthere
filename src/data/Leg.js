'use es6';

import {List, Record} from 'immutable';

let defaults = {
  distance: '',
  duration: '',
  start: '',
  end: '',
  steps: List()
};

export default class Leg extends Record(defaults) {
}
