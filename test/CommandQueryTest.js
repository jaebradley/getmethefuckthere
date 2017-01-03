'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import CommandQuery from '../src/data/CommandQuery';
import DirectionsSearch from '../src/data/DirectionsSearch';
import TravelMode from '../src/data/TravelMode';

let expect = chai.expect;

describe('Test Command Query', function() {
  it('should test travel mode identification', function() {
    let query = new CommandQuery({
      travelMode: TravelMode.DRIVING.value
    });
    expect(query.identifyTravelMode()).to.eql(TravelMode.DRIVING);
  });

  it('should test directions search creation', function() {
    let origin = 'origin';
    let destination = 'destination';
    let mode = TravelMode.DRIVING;
    let query = new CommandQuery({
      origin: origin,
      destination: destination,
      travelMode: mode.value
    });
    let expected = new DirectionsSearch({
      origin: origin,
      destination: destination,
      travelMode: mode
    });
    expect(query.toDirectionsSearch()).to.eql(expected);
  });
});
