import { List, Record } from 'immutable';

const defaults = {
  distance: '',
  duration: '',
  start: '',
  end: '',
  arrivalTime: undefined,
  departureTime: undefined,
  steps: List(),
};

export default class Leg extends Record(defaults) {
}
