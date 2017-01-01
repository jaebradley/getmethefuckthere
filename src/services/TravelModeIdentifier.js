'use es6';

import TravelMode from '../data/TravelMode';

export default class TravelModeIdentifier {
  static identify(value) {
    for (let mode of TravelMode.enumValues) {
      if (travelMode.toLower() === mode.value) {
        return mode;
      }
    }

    throw new TypeError('Unable to identify travel mode');
  }
}
