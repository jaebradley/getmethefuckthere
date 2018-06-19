import { Record } from 'immutable';

import Vehicle from './Vehicle';
import Time from './Time';

const defaults = {
  arrival: {
    name: '',
    arrival: new Time(),
  },
  departure: {
    name: '',
    arrival: new Time(),
  },
  stopCount: 0,
  line: {
    name: '',
    agencies: [],
    vehicle: Vehicle.BUS,
  },
};

export default class TransitDetails extends Record(defaults) {}
