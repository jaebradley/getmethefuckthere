'use es6';

import {Enum} from 'enumify';

export default class TransitRoutingPreference extends Enum {};

TransitRoutingPreference.initEnum({
  LESS_WALKING: {
    value: 'less_walking'
  },
  FEWER_TRANSFERS: {
    value: 'fewer_transfers'
  },
});
