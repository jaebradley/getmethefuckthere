'use es6';

import Vehicle from '../data/Vehicle';

export default class VehicleIdentifier {
  identify(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
    }

    const vehicle = Vehicle.enumValues
                           .find(enumValue => enumValue.value === value.toUpperCase());

    if (typeof vehicle === 'undefined') {
      throw new TypeError('Unable to identify vehicle');
    }

    return vehicle;
  }
}
