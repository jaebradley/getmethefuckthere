'use es6';

import TravelMode from '../data/TravelMode';

export default class TravelModeIdentifier {
  identify(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
    }

    for (let mode of TravelMode.enumValues) {
      if (value.toLowerCase() === mode.value) {
        return mode;
      }
    }

    throw new TypeError('Unable to identify travel mode');
  }
}
