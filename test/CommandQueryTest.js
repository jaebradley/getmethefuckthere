import chai from 'chai';

import CommandQuery from '../src/data/CommandQuery';
import DirectionsSearch from '../src/data/DirectionsSearch';
import TravelMode from '../src/data/TravelMode';

const expect = chai.expect;

describe('Test Command Query', () => {
  it('should test directions search creation', () => {
    const origin = 'origin';
    const destination = 'destination';
    const mode = TravelMode.DRIVING;
    const query = new CommandQuery({
      origin,
      destination,
      travelMode: mode.value,
    });
    const expected = new DirectionsSearch({
      origin,
      destination,
      travelMode: mode,
    });
    expect(query.toDirectionsSearch()).to.eql(expected);
  });
});
