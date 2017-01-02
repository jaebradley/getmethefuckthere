'use es6';

import {Record} from 'immutable';

import Time from './Time';

let defaults = {
  name: '',
  arrival: new Time()
};

export default class Stop extends Record(defaults) {
}
