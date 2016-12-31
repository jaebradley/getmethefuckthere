'use es6';

import {Record} from 'immutable';
import moment from 'moment-timezone';

import TravelTimeFilterType from './TravelTimeFilterType';

let defaults = {
  value: moment(),
  type: TravelTimeFilterType.DEPARTURE,
}

export default class TravelTimeFilter extends Record(defaults) {
}
