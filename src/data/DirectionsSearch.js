'use es6'

import {Record} from 'immutable';

import TravelTimeFilter from './TravelTimeFilter';

let defaults = {
  origin: '',
  destination: '',
  travelTimeFilter: new TravelTimeFilter(),
  mode: 'driving',
  waypoints: 'Strathfield, NSW',
  alternatives: true,
  avoid: ['tolls', 'ferries'],
  traffic_model: 'best_guess',
  optimize: true,
  transit_mode: ['bus', 'rail'],
  language: 'en',
  units: 'metric',
  region: 'au',
}
