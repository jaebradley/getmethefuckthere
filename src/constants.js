const GEOCODE_API_KEY = 'AIzaSyBfyXZ3kDp03V_o7_mak0wxVU4B2Zcl0Ak';
const DIRECTIONS_API_KEY = 'AIzaSyDDFgQKQ25AmRPvZlZ7rfeVnlouhsnV7iI';

const TRAVEL_MODE = Object.freeze({
  DRIVING: {
    value: 'driving',
    emoji: '🚗',
  },
  WALKING: {
    value: 'walking',
    emoji: '🚶',
  },
  BICYCLING: {
    value: 'bicycling',
    emoji: '🚴',
  },
  TRANSIT: {
    value: 'transit',
    emoji: '🚇',
  },
});

const VEHICLE = Object.freeze({
  RAIL: {
    value: 'RAIL',
    emoji: '🚄',
  },
  HEAVY_RAIL: {
    value: 'HEAVY_RAIL',
    emoji: '🚆',
  },
  METRO_RAIL: {
    value: 'METRO_RAIL',
    emoji: '🚃',
  },
  SUBWAY: {
    value: 'SUBWAY',
    emoji: '🚇',
  },
  TRAM: {
    value: 'TRAM',
    emoji: '🚊',
  },
  MONORAIL: {
    value: 'MONORAIL',
    emoji: '🚝',
  },
  COMMUTER_TRAIN: {
    value: 'COMMUTER_TRAIN',
    emoji: '🚈',
  },
  HIGH_SPEED_TRAIN: {
    value: 'HIGH_SPEED_TRAIN',
    emoji: '🚄',
  },
  BUS: {
    value: 'BUS',
    emoji: '🚌',
  },
  INTERCITY_BUS: {
    value: 'INTERCITY_BUS',
    emoji: '🚌',
  },
  TROLLEYBUS: {
    value: 'TROLLEYBUS',
    emoji: '🚎',
  },
  SHARE_TAXI: {
    value: 'SHARE_TAXI',
    emoji: '🚕',
  },
  FERRY: {
    value: 'FERRY',
    emoji: '🚢',
  },
  CABLE_CAR: {
    value: 'CABLE_CAR',
    emoji: '🚠',
  },
  GONDOLA_LIFT: {
    value: 'GONDOLA_LIFT',
    emoji: '🚡',
  },
  FUNICULAR: {
    value: 'FUNICULAR',
    emoji: '🚡',
  },
  OTHER: {
    value: 'OTHER',
    emoji: '❓',
  },
});

export {
  GEOCODE_API_KEY,
  DIRECTIONS_API_KEY,
  TRAVEL_MODE,
  VEHICLE,
};
