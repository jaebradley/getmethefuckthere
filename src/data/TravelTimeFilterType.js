'use es6';

import {Enum} from 'enumify';

export default class TravelTimeFilterType extends Enum {};

TravelTimeFilterType.initEnum({
  DESTINATION: {
    value: 'destination'
  },
  ARRIVAL: {
    value: 'arrival'
  },
});
