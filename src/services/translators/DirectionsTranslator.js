'use es6';

import {List, Map} from 'immutable';

import Leg from '../../data/Leg';
import Line from '../../data/Line';
import Route from '../../data/Route';
import Step from '../../data/Step';
import Time from '../../data/Time';
import TransitDetails from '../../data/TransitDetails';

import TravelModeIdentifier from '../TravelModeIdentifier';
import VehicleIdentifier from '../VehicleIdentifier';

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

    if (!Array.isArray(routes)) {
      throw new TypeError('Routes are not an array');
    }

    return List(routes.map(route => DirectionsTranslator.translateRoute(route)));
  }

  static translateRoute(route) {
    if (!('summary' in route)) {
      throw new ReferenceError('summary field not found in route');
    }

    if (!('warnings' in route)) {
      throw new ReferenceError('warnings field not found in route');
    }

    if (!('legs' in route)) {
      throw new ReferenceError('legs field not found in route');
    }

    let summary = route['summary'];
    if (typeof summary !== 'string') {
      throw new TypeError('summary field is not a string');
    }

    let warnings = route['warnings'];
    if (!Array.isArray(warnings)) {
      throw new TypeError('warnings field is not an array');
    }

    let legs = route['legs'];
    if (!Array.isArray(legs)) {
      throw new TypeError('legs field is not an array');
    }

    return new Route({
      summary: summary,
      warnings: List(warnings),
      legs: List(legs.map(leg => DirectionsTranslator.translateLeg(leg)))
    });
  }

  static translateLeg(leg) {
    if (!('distance' in leg)) {
      throw new ReferenceError('distance field not found in leg');
    }

    if (!('duration' in leg)) {
      throw new ReferenceError('duration field not found in leg');
    }

    if (!('end_address' in leg)) {
      throw new ReferenceError('end address field not found in leg');
    }

    if (!('start_address' in leg)) {
      throw new ReferenceError('start address field not found in leg');
    }

    if (!('text' in leg['distance'])) {
      throw new ReferenceError('text field not in leg field');
    }

    if (!('text' in leg['duration'])) {
      throw new ReferenceError('text field not in leg field');
    }

    let distanceDescription = leg['distance']['text'];
    if (typeof distanceDescription !== 'string') {
      throw new TypeError('distance text field not a string');
    }

    let durationDescription = leg['duration']['text'];
    if (typeof durationDescription !== 'string') {
      throw new TypeError('duration text field not a string');
    }

    let end = leg['end_address'];
    if (typeof end !== 'string') {
      throw new TypeError('end address field not a string');
    }

    let start = leg['start_address'];
    if (typeof start !== 'string') {
      throw new TypeError('start address field not a string');
    }

    let steps = leg['steps'];
    if (!Array.isArray(steps)) {
      throw new TypeError('steps field not an array');
    }

    return new Leg({
      distance: distanceDescription,
      duration: durationDescription,
      end: end,
      start: start,
      steps: List(steps.map(step => DirectionsTranslator.translateStep(step)))
    });
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

    let parameters = Map({
      distance: distanceDescription,
      duration: durationDescription,
      instructions: instructions,
      mode: TravelModeIdentifier.identify(travelMode)
    });

    if ('transit_details' in step) {
      parameters = parameters.set('transitDetails', DirectionsTranslator.translateTransitDetails(step['transit_details']));
    }

    return new Step(parameters);
  }

  static translateTransitDetails(details) {
    let arrivalStopName = details['arrival_stop']['name'];
    let arrivalTimeValue = details['arrival_time']['text'];
    let arrivalTimezone = details['arrival_time']['time_zone'];

    let departureStopName = details['departure_stop']['name'];
    let departureTimeValue = details['departure_time']['text'];
    let departureTimezone = details['departure_time']['time_zone'];

    let line = details['line'];
    let lineName = ('name' in line)
      ? line['name']
      : line['short_name'];

    let agencyNames = List(line['agencies'].map(agency => agency.name));

    return new TransitDetails({
      arrival: new Stop({
        name: arrivalStopName,
        arrival: new Time({
          value: arrivalTimeValue,
          timezone: arrivalTimezone
        })
      }),
      departure: new Stop({
        name: departureStopName,
        arrival: new Time({
          value: departureTimeValue,
          timezone: departureTimezone
        })
      }),
      line: new Line({
        name: lineName,
        agencies: agencyNames,
        vehicle: VehicleIdentifier.identify(line.vehicle.type)
      })
    });
  }
}
