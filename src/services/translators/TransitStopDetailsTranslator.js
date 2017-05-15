import Stop from "../../data/Stop";
import Time from "../../data/Time";

export default class TransitStopDetailsTranslator {
  translate(stopName, arrivalTime) {
    return new Stop({
      name: stopName,
      arrival: this.getArrivalTime(arrivalTime)
    });
  }

  getArrivalTime(arrivalTime) {
    return new Time({
      value: arrivalTime.text,
      timezone: arrivalTime.time_zone
    });
  }
}
