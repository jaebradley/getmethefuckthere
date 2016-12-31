'use es6'

import {List, Record} from 'immutable';

import TrafficModel from './TrafficModel';
import TravelMode from './TravelMode';
import TravelTimeFilter from './TravelTimeFilter';

let defaults = {
  destination: '',
  origin: '',
  travelMode: TravelMode.DRIVING,
  trafficModel: TrafficModel.BEST_GUESS,
  transitModes: List.of(),
  travelRestrictions: List.of(),
  travelTimeFilter: new TravelTimeFilter(),
  useAlternatives: true,
}

export default class DirectionsSearch extends Record(defaults) {
  toParameters() {
    let travelTimeFilterParameter = this.travelTimeFilter.toParameter();
    let parameters = Map({
      destination: this.destination,
      origin: this.origin,
      mode: this.travelMode.value,
      alternatives: this.useAlternatives,
      avoid: List(this.transitModes.map(mode => mode.value)),
      traffic_model: this.trafficModel.value,
    });
    return parameters.merge(travelTimeFilterParameter);
  }
}
