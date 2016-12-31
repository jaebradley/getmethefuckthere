'use es6';

import {Enum} from 'enumify';

export default class TravelMode extends Enum {};

TravelMode.initEnum([
  'DRIVING',
  'WALKING',
  'BICYCLING',
  'TRANSIT',
]);
