import { Record } from 'immutable';

import Vehicle from './Vehicle';

const defaults = {
  arrival: {
    name: '',
    arrival: {
      value: '',
      timezone: '',
    },
  },
  departure: {
    name: '',
    arrival: {
      value: '',
      timezone: '',
    },
  },
  stopCount: 0,
  line: {
    name: '',
    agencies: [],
    vehicle: Vehicle.BUS,
  },
};

export default class TransitDetails extends Record(defaults) {}
