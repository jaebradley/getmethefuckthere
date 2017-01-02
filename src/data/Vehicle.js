'use es6';

import {Enum} from 'enumify';

import emoji from 'node-emoji';

export default class Vehicle extends Enum {};

Vehicle.initEnum({
  BUS: {
    value: 'BUS',
    emoji: emoji.get('bus')
  }
});
