export default class TransitStopDetailsTranslator {
  translate(stopName, arrivalTime) {
    return {
      name: stopName,
      arrival: {
        value: arrivalTime.text,
        timezone: arrivalTime.time_zone,
      },
    };
  }
}
