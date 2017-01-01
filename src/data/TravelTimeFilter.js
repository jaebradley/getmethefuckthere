'use es6';

import {Map, Record} from 'immutable';
import moment from 'moment-timezone';

import TravelTimeFilterType from './TravelTimeFilterType';

let defaults = {
  value: moment(),
  type: TravelTimeFilterType.DEPARTURE,
}

export default class TravelTimeFilter extends Record(defaults) {
  toParameter() {
    let parameterName = this.type === TravelTimeFilterType.DEPARTURE
      ? 'departure_time'
      : 'arrival_time';
    return Map.of(parameterName, this.value.valueOf());
  }
}
