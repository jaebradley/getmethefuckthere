import { Record } from 'immutable';

const defaults = {
  value: '',
  timezone: '',
};

export default class Time extends Record(defaults) {
}
