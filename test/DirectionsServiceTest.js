'use es6';

import {List, Record} from 'immutable';

import DirectionsService from '../src/services/DirectionsService';
import DirectionsSearch from '../src/data/DirectionsSearch';
import TrafficModel from '../src/data/TrafficModel';
import TransitMode from '../src/data/TransitMode';
import TravelRestriction from '../src/data/TravelRestriction';
import TravelMode from '../src/data/TravelMode';
import TravelTimeFilter from '../src/data/TravelTimeFilter';

describe('Test Directions Service', function() {
  let service = new DirectionsService();
  let destination = 'Harvard Square Cambridge MA';
  let origin = '25 First Street Cambridge MA';
  let defaultSearch = new DirectionsSearch({
    destination: destination,
    origin: origin
  });
  it('should return directions', function() {
    return service.fetch(defaultSearch)
                  .then(data => console.log(JSON.stringify(data)));
  });
});
