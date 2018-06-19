import Time from '../../data/Time';
import StepTranslator from './StepTranslator';


export default class LegTranslator {
  constructor() {
    this.stepTranslator = new StepTranslator();
  }

  translate(leg) {
    return {
      distance: leg.distance.text,
      duration: leg.duration.text,
      end: leg.end_address,
      start: leg.start_address,
      steps: leg.steps.map(step => this.stepTranslator.translate(step)),
      arrivalTime: leg.arrival_time
        ? new Time({
          value: leg.arrival_time.text,
          timezone: leg.arrival_time.time_zone,
        })
        : null,
      departureTime: leg.departure_time
        ? new Time({
          value: leg.departure_time.text,
          timezone: leg.departure_time.time_zone,
        })
        : null,
    };
  }
}
