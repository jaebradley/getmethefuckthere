import { Record } from 'immutable';

const defaults = {
  address: '',
  location: { latitude: 0, longitude: 0 },
  placeId: '',
};

class Place extends Record(defaults) {}

export default Place;
