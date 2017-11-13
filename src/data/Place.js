import { Record } from 'immutable';
import Location from './Location';

const defaults = {
  address: '',
  location: new Location(),
  placeId: '',
};

class Place extends Record(defaults) {}

export default Place;
