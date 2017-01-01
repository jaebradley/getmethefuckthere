'use es6';

import {Record} from 'immutable';

import DirectionsSearch from './DirectionsSearch';
import TravelMode from './TravelMode';

let defaults = {
  origin: '',
  destination: '',
  travelMode: ''
};

export default class CommandQuery extends Record(defaults) {
  identifyTravelMode() {
    for (let mode of TravelMode.enumValues) {
      if (travelMode.toLower() === mode.value) {
        return mode;
      }
    }

    throw new TypeError('Unable to identify travel mode');
  }

  toDirectionsSearch() {
    return new DirectionsSearch({
      origin: this.origin,
      destination: this.destination,
      travelMode: this.identifyTravelMode()
    });
  }
}
