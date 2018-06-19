import { Record } from 'immutable';

import Stop from './Stop';
import Vehicle from './Vehicle';

const defaults = {
  arrival: new Stop(),
  departure: new Stop(),
  stopCount: 0,
  line: {
    name: '',
    agencies: [],
    vehicle: Vehicle.BUS,
  },
};

export default class TransitDetails extends Record(defaults) {}
