'use es6';

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
}
