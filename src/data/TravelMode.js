'use es6';

import {Enum} from 'enumify';

export default class TravelMode extends Enum {};

TravelMode.initEnum({
  DRIVING: {
    value: 'driving'
  },
  WALKING: {
    value: 'walking'
  },
  BICYCLING: {
    value: 'bicycling'
  },
  TRANSIT: {
    value: 'transit'
  },
});
