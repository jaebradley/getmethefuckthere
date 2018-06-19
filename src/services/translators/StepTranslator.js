import striptags from 'striptags';

import TransitDetails from '../../data/TransitDetails';
import TravelModeIdentifier from '../TravelModeIdentifier';
import TransitStopDetailsTranslator from './TransitStopDetailsTranslator';
import TransitLineDetailsTranslator from './TransitLineDetailsTranslator';
import VehicleIdentifier from '../VehicleIdentifier';

export default class StepTranslator {
  constructor() {
    this.travelModeIdentifier = new TravelModeIdentifier();
    this.stopTranslator = new TransitStopDetailsTranslator();
    this.lineTranslator = new TransitLineDetailsTranslator(new VehicleIdentifier());
  }

  translate(step) {
    return {
      distance: step.distance.text,
      duration: step.duration.text,
      instructions: striptags(step.html_instructions),
      mode: this.travelModeIdentifier.identify(step.travel_mode),
      transitDetails: step.transit_details
        ? new TransitDetails({
          arrival: this.stopTranslator.translate(step.transit_details.arrival_stop.name, step.transit_details.arrival_time),
          departure: this.stopTranslator.translate(step.transit_details.departure_stop.name, step.transit_details.departure_time),
          line: this.lineTranslator.translate(step.transit_details.line),
          stopCount: step.transit_details.num_stops,
        })
        : null,
    };
  }
}
