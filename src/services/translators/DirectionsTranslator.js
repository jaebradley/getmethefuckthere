'use es6';

import Step from '../../data/Step';

export default class DirectionsTranslator {
  static translate(result) {
    if (!('status' in result)) {
      throw new ReferenceError('Status field not in result');
    }

    if (result['status'] !== 'OK') {
      throw new TypeError('Status is not OK');
    }

    if (!('routes' in result)) {
      throw new ReferenceError('Routes field not in result');
    }

    let routes = result['routes'];

    if (!Arrays.isArray(routes)) {
      throw new TypeError('Routes are not an array');
    }
  }

  static translateRoute(route) {

  }

  static translateLeg(leg) {

  }

  static translateStep(step) {
    if (!('distance' in step)) {
      throw new ReferenceError('distance field not found in step');
    }

    if (!('duration' in step)) {
      throw new ReferenceError('duration field not found in step');
    }

    if (!('html_instructions' in step)) {
      throw new ReferenceError('html instructions field not found in step');
    }

    if (!('travel_mode' in step)) {
      throw new ReferenceError('travel mode field not found in step');
    }

    if (!('text' in step['distance'])) {
      throw new ReferenceError('text field not in distance field');
    }

    if (!('text' in step['duration'])) {
      throw new ReferenceError('text field not in duration field');
    }

    let distanceDescription = step['distance']['text'];
    if (typeof distanceDescription !== 'string') {
      throw new TypeError('distance text field not a string');
    }

    let durationDescription = step['duration']['text'];
    if (typeof durationDescription !== 'string') {
      throw new TypeError('duration text field not a string');
    }

    let instructions = step['html_instructions'];
    if (typeof instructions !== 'string') {
      throw new TypeError('html instructions field not a string');
    }

    let travelMode = step['travel_mode'];
    if (typeof travelMode !== 'string') {
      throw new TypeError('travel mode field not a string');
    }

    return new Step({
      distance: distanceDescription,
      duration: durationDescription,
      instructions: instructions,
      mode: DirectionsTranslator.identifyTravelMode(travelMode)
    });
  }

  static identifyTravelMode(value) {
    for (let mode of TravelMode.enumValues) {
      if (value === mode.value) {
        return mode;
      }
    }

    throw new ReferenceError('Cannot identify Travel Mode');
  }
}
