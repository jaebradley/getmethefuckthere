import { List, Map } from 'immutable';

import Leg from '../../data/Leg';
import Time from '../../data/Time';
import StepTranslator from './StepTranslator';


export default class LegTranslator {
  constructor() {
    this.stepTranslator = new StepTranslator();
  }

  translate(leg) {
    let parameters = Map({
      distance: leg.distance.text,
      duration: leg.duration.text,
      end: leg.end_address,
      start: leg.start_address
      steps: this.getSteps()
    });

    if ('arrival_time' in leg) {
      parameters = parameters.set('arrivalTime', this.getArrivalTime(leg.arrival_time));
    }

    if ('departure_time' in leg) {
      parameters = parameters.set('departureTime', this.getArrivalTime(leg.departure_time));
    }

    return new Leg(parameters);
  }

  getArrivalTime(arrivalTime) {
    return new Time({
      value: arrivalTime.text,
      timezone: arrivalTime.time_zone
    });
  }

  getSteps(steps) {
    return List(steps.map(step => this.stepTranslator(step)));
  }
}
