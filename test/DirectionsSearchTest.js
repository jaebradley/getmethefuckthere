'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {List, Map} from 'immutable';

import DirectionsSearch from '../src/data/DirectionsSearch';
import TrafficModel from '../src/data/TrafficModel';
import TransitMode from '../src/data/TransitMode';
import TravelMode from '../src/data/TravelMode';
import TravelRestriction from '../src/data/TravelRestriction';
import TravelTimeFilter from '../src/data/TravelTimeFilter';

let expect = chai.expect;

describe('Test Directions Search', function() {
  let origin = 'origin';
  let destination = 'destination';
  let mode = TravelMode.DRIVING;
  let transitMode = TravelMode.TRANSIT;
  let drivingMode = TravelMode.DRIVING;
  let trafficModel = TrafficModel.BEST_GUESS;

  let transitMode1 = TransitMode.BUS;
  let transitMode2 = TransitMode.SUBWAY;
  let transitModes = List.of(transitMode1, transitMode2);

  let travelRestriction1 = TravelRestriction.TOLLS;
  let travelRestriction2 = TravelRestriction.FERRIES;
  let travelRestrictions = List.of(travelRestriction1, travelRestriction2);

  let useAlternatives = false;

  it('should test transit parameter creation', function() {
    let transitDirections = new DirectionsSearch({
      destination: destination,
      origin: origin,
      travelMode: transitMode,
      trafficModel: trafficModel,
      transitModes: transitModes,
      travelRestrictions: travelRestrictions,
      useAlternatives: useAlternatives
    });
    let expected = Map({
      destination: destination,
      origin: origin,
      mode: transitMode.value,
      alternatives: useAlternatives,
      avoid: List.of(travelRestriction1.value, travelRestriction2.value),
      transit_mode: List.of(transitMode1.value, transitMode2.value)
    });
    expect(transitDirections.toParameters()).to.eql(expected);
  });

  it('should test non-transit parameter creation', function() {
    let travelTimeFilter = new TravelTimeFilter();
    let drivingDirections = new DirectionsSearch({
      destination: destination,
      origin: origin,
      travelMode: drivingMode,
      trafficModel: trafficModel,
      transitModes: transitModes,
      travelRestrictions: travelRestrictions,
      useAlternatives: useAlternatives,
      travelTimeFilter: travelTimeFilter
    });
    let expected = Map({
      destination: destination,
      origin: origin,
      mode: drivingMode.value,
      alternatives: useAlternatives,
      avoid: List.of(travelRestriction1.value, travelRestriction2.value),
      traffic_model: trafficModel.value,
    });
    expected = expected.merge(travelTimeFilter.toParameter());
    expect(drivingDirections.toParameters()).to.eql(expected);
  });
});
