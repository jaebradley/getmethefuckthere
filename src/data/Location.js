import { Record } from 'immutable';

const defaults = {
  latitude: 0,
  longitude: 0,
};

class Location extends Record(defaults) {}

export default Location;
