import { Enum } from 'enumify';
import emoji from 'node-emoji';

export default class Vehicle extends Enum {}

// https://developers.google.com/maps/documentation/directions/intro#VehicleType
Vehicle.initEnum({
  RAIL: {
    value: 'RAIL',
    emoji: emoji.get('bullettrain_side'),
  },
  HEAVY_RAIL: {
    value: 'HEAVY_RAIL',
    emoji: emoji.get('train2')
  },
  METRO_RAIL: {
    value: 'METRO_RAIL',
    emoji: emoji.get('railway_car'),
  },
  SUBWAY: {
    value: 'SUBWAY',
    emoji: emoji.get('metro'),
  },
  TRAM: {
    value: 'TRAM',
    emoji: emoji.get('tram'),
  },
  MONORAIL: {
    value: 'MONORAIL',
    emoji: emoji.get('monorail'),
  },
  COMMUTER_TRAIN: {
    value: 'COMMUTER_TRAIN',
    emoji: emoji.get('light_rail'),
  },
  HIGH_SPEED_TRAIN: {
    value: 'HIGH_SPEED_TRAIN',
    emoji: emoji.get('bullettrain_side')
  },
  BUS: {
    value: 'BUS',
    emoji: emoji.get('bus'),
  },
  INTERCITY_BUS: {
    value: 'INTERCITY_BUS',
    emoji: emoji.get('bus'),
  },
  TROLLEYBUS: {
    value: 'TROLLEYBUS',
    emoji: emoji.get('trolleybus'),
  },
  SHARE_TAXI: {
    value: 'SHARE_TAXI',
    emoji: emoji.get('taxi'),
  },
  FERRY: {
    value: 'FERRY',
    emoji: emoji.get('ship'),
  },
  CABLE_CAR: {
    value: 'CABLE_CAR',
    emoji: emoji.get('mountain_cableway'),
  },
  GONDOLA_LIFT: {
    value: 'GONDOLA_LIFT',
    emoji: emoji.get('aerial_tramway'),
  },
  FUNICULAR: {
    value: 'FUNICULAR',
    emoji: emoji.get('aerial_tramway'),
  },
  OTHER: {
    value: 'OTHER',
    emoji: emoji.get('question'),
  },
});
