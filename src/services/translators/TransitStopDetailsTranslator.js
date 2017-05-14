import Stop from "../../data/Stop";
import Time from "../../data/Time";

export default class TransitStopDetailsTranslator {
  translate(stopDetails) {
    return new Stop({
      name: stopDetails.name,
      arrival: this.getArrivalTime(stopDetails)
    });
  }

  getArrivalTime(stopDetails) {
    return new Time({
      value: stopDetails.text,
      timezone: stopDetails.time_zone
    });
  }
}
