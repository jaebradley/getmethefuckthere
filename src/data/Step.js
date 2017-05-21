import { Record } from 'immutable';

import TravelMode from './TravelMode';

const defaults = {
  distance: '',
  duration: '',
  instructions: '',
  mode: TravelMode.DRIVING,
  transitDetails: undefined,
};

export default class Step extends Record(defaults) {
}
