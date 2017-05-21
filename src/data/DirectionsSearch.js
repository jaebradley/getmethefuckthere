import { List, Map, Record } from 'immutable';

import TrafficModel from './TrafficModel';
import TravelMode from './TravelMode';
import TravelTimeFilter from './TravelTimeFilter';

const defaults = {
  destination: '',
  origin: '',
  travelMode: TravelMode.DRIVING,
  trafficModel: TrafficModel.BEST_GUESS,
  transitModes: List.of(),
  travelRestrictions: List.of(),
  travelTimeFilter: new TravelTimeFilter(),
  useAlternatives: false,
};

export default class DirectionsSearch extends Record(defaults) {
  toParameters() {
    let parameters = Map({
      destination: this.destination,
      origin: this.origin,
      mode: this.travelMode.value,
      alternatives: this.useAlternatives,
      avoid: List(this.travelRestrictions.map(restriction => restriction.value)),
    });

    if (this.travelMode === TravelMode.TRANSIT) {
      parameters = parameters.set('transit_mode', List(this.transitModes.map(mode => mode.value)));
    }

    if (this.travelMode !== TravelMode.TRANSIT) {
      parameters = parameters.set('traffic_model', this.trafficModel.value);
      parameters = parameters.merge(this.travelTimeFilter.toParameter());
    }

    return parameters;
  }
}
