import Time from '../../data/Time';

export default class TransitStopDetailsTranslator {
  translate(stopName, arrivalTime) {
    return {
      name: stopName,
      arrival: new Time({
        value: arrivalTime.text,
        timezone: arrivalTime.time_zone,
      }),
    };
  }
}
