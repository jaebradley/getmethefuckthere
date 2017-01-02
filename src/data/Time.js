'use es6';

import {Record} from 'immutable';

let defaults = {
  value: '',
  timezone: ''
};

export default class Time extends Record(defaults){
}
