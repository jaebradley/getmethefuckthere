'use es6';

import {Enum} from 'enumify';

export default class TravelTimeFilterType extends Enum {};

TravelTimeFilterType.initEnum({
  DEPARTURE: {
    value: 'departure'
  },
  ARRIVAL: {
    value: 'arrival'
  },
});
