import { Map, Record } from 'immutable';
import moment from 'moment-timezone';

import TravelTimeFilterType from './TravelTimeFilterType';

const defaults = {
  value: moment(),
  type: TravelTimeFilterType.DEPARTURE,
};

export default class TravelTimeFilter extends Record(defaults) {
  toParameter() {
    const parameterName = this.type === TravelTimeFilterType.DEPARTURE
      ? 'departure_time'
      : 'arrival_time';
    return Map.of(parameterName, this.value.valueOf());
  }
}
