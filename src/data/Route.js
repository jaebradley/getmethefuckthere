'use es6';

import {List, Record} from 'immutable';

let defaults = {
  legs: List(),
  summary: '',
  warnings: List()
};

export default class Route extends Record(defaults) {
}
