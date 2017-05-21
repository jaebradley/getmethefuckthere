import { Record } from 'immutable';

import DirectionsSearch from './DirectionsSearch';
import TravelModeIdentifier from '../services/TravelModeIdentifier';

const defaults = {
  origin: '',
  destination: '',
  travelMode: '',
};

export default class CommandQuery extends Record(defaults) {
  toDirectionsSearch() {
    return new DirectionsSearch({
      origin: this.origin,
      destination: this.destination,
      travelMode: new TravelModeIdentifier().identify(this.travelMode),
    });
  }
}
