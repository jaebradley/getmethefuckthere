'use es6';

import { Record } from 'immutable';

import DirectionsSearch from './DirectionsSearch';
import TravelModeIdentifier from '../services/TravelModeIdentifier';

const defaults = {
  origin: '',
  destination: '',
  travelMode: '',
};

export default class CommandQuery extends Record(defaults) {
  constructor() {
    super();
    this.travelModeIdentifier = new TravelModeIdentifier();
  }

  toDirectionsSearch() {
    return new DirectionsSearch({
      origin: this.origin,
      destination: this.destination,
      travelMode: this.identify(this.travelMode),
    });
  }
}
