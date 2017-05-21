import { Record } from 'immutable';

import Time from './Time';

const defaults = {
  name: '',
  arrival: new Time()
};

export default class Stop extends Record(defaults) {
}
