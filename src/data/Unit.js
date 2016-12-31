'use es6';

import {Enum} from 'enumify';

export default class Unit extends Enum {};

Unit.initEnum({
  METRIC: {
    value: 'metric'
  },
  IMPERIAL: {
    value: 'imperial'
  },
});
