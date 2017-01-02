'use es6';

import {Record} from 'immutable';

import Stop from './Stop';
import Line from './Line';

let defaults = {
  arrival: new Stop(),
  departure: new Stop(),
  stopCount: 0,
  line: new Line()
};

export default class TransitDetails extends Record(defaults){
}