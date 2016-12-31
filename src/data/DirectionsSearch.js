'use es6'

import {Record} from 'immutable';

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
}
