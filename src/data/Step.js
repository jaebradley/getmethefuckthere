'use es6';

import {Record} from 'immutable';

import TravelMode from './TravelMode';

let defaults = {
  distance: '',
  duration: '',
  instructions: '',
  mode: TravelMode.DRIVING,
  transitDetails: undefined,
};

export default class Step extends Record(defaults) {
}
