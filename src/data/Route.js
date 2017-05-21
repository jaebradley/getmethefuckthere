import { List, Record } from 'immutable';

const defaults = {
  legs: List(),
  summary: '',
  warnings: List(),
};

export default class Route extends Record(defaults) {
}
