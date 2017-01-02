'use es6';

import {Enum} from 'enumify';

export default class Vehicle extends Enum {};

Vehicle.initEnum({
  BUS: {
    value: 'BUS',
    emoji: emoji.get('bus')
  }
});
