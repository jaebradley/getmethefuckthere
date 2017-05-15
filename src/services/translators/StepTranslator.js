import striptags from 'striptags';
import { Map } from 'immutable';

import TransitDetails from '../../data/TransitDetails';
import Step from '../../data/Step';
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
    let parameters = Map({
      distance: step.distance.text,
      duration: step.duration.text,
      instructions: striptags(step.html_instructions),
      mode: this.travelModeIdentifier.identify(step.travel_mode)
    });

    if ('transit_details' in step) {
      parameters = parameters.set('transitDetails', this.getTransitDetails(step.transitDetails));
    }

    return new Step(parameters);
  }

  getTransitDetails(transitDetails) {
    return new TransitDetails({
      arrival: this.stopTranslator.translate(transitDetails.arrival_stop.name, transitDetails.arrival_time),
      departure: this.stopTranslator.translate(transitDetails.departure_stop.name, transitDetails.departure_time),
      line: this.lineTranslator.translate(transitDetails.line),
      stopCount: transitDetails.num_stops
    });
  }
}
