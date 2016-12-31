'use es6'

import {Record} from 'immutable';

let defaults = {
  origin: 'Town Hall, Sydney, NSW',
  destination: 'Parramatta, NSW',
  departure_time: inOneHour,
  arrival_time: inOneHour,
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
