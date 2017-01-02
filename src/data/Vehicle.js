'use es6';

import {Enum} from 'enumify';

import emoji from 'node-emoji';

export default class Vehicle extends Enum {};

// https://developers.google.com/maps/documentation/directions/intro#VehicleType
Vehicle.initEnum({
  RAIL: {
    value: 'RAIL',
    emoji: emoji.get()
  },
  METRO_RAIL: {
    value: 'METRO_RAIL',
    emoji: emoji.get()
  },
  SUBWAY: {
    value: 'SUBWAY',
    emoji: emoji.get('metro')
  },
  TRAM: {
    value: 'TRAM',
    emoji: emoji.get('')
  },
  MONORAIL: {
    value: 'MONORAIL',
    emoji: emoji.get()
  },
  COMMUTER_TRAIN: {
    value: 'COMMUTER_TRAIN',
    emoji: emoji.get()
  },
  BUS: {
    value: 'BUS',
    emoji: emoji.get('bus')
  },
  INTERCITY_BUS: {
    value: 'INTERCITY_BUS',
    emoji: emoji.get('')
  },
  TROLLEYBUS: {
    value: 'TROLLEYBUS',
    emoji: emoji.get('')
  },
  SHARE_TAXI: {
    value: 'SHARE_TAXI',
    emoji: emoji.get('')
  },
  FERRY: {
    value: 'FERRY',
    emoji: emoji.get('')
  },
  CABLE_CAR: {
    value: 'CABLE_CAR',
    emoji: emoji.get('')
  },
  GONDOLA_LIFT: {
    value: 'GONDOLA_LIFT',
    emoji: emoji.get('')
  },
  FUNICULAR: {
    value: 'FUNICULAR',
    emoji: emoji.get('')
  },
  OTHER: {
    value: 'OTHER',
    emoji: emoji.get('')
  }
});
