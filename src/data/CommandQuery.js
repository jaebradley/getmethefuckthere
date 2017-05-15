'use es6';

import {Record} from 'immutable';

import DirectionsSearch from './DirectionsSearch';
import TravelModeIdentifier from '../services/TravelModeIdentifier';

let defaults = {
  origin: '',
  destination: '',
  travelMode: ''
};

export default class CommandQuery extends Record(defaults) {
  identifyTravelMode() {
    return new TravelModeIdentifier().identify(this.travelMode);
  }

  toDirectionsSearch() {
    return new DirectionsSearch({
      origin: this.origin,
      destination: this.destination,
      travelMode: this.identifyTravelMode()
    });
  }
}
