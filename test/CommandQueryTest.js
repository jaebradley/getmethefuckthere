import chai from 'chai';

import DirectionsSearch from '../src/data/DirectionsSearch';
import TravelMode from '../src/data/TravelMode';

const expect = chai.expect;

describe('Test Command Query', () => {
  it('should test directions search creation', () => {
    const origin = 'origin';
    const destination = 'destination';
    const mode = TravelMode.DRIVING;
    const query = {
      origin,
      destination,
      travelMode: mode.value,
    };
    const expected = new DirectionsSearch({
      origin,
      destination,
      travelMode: mode,
    });
    expect(query.toDirectionsSearch()).to.eql(expected);
  });
});
