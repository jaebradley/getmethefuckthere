'use es6';

import {Record, Map} from 'immutable';
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

    return Map({
      `${parameterName}`: this.value.valueOf()
    });
  }
}
