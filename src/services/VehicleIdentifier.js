'use es6';

import Vehicle from '../data/Vehicle';

export default class VehicldeIdentifier {
  static identify(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
    }

    for (let mode of Vehicle.enumValues) {
      if (value.toUpperCase() === mode.value) {
        return mode;
      }
    }

    throw new TypeError('Unable to identify vehicle');
  }
}
