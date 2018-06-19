'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { List, Map } from 'immutable';
import TrafficModel from '../src/data/TrafficModel';
import TransitMode from '../src/data/TransitMode';
import TravelMode from '../src/data/TravelMode';
import TravelRestriction from '../src/data/TravelRestriction';
import TravelTimeFilter from '../src/data/TravelTimeFilter';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Test Directions Search', () => {
  const origin = 'origin';
  const destination = 'destination';
  const transitMode = TravelMode.TRANSIT;
  const drivingMode = TravelMode.DRIVING;
  const trafficModel = TrafficModel.BEST_GUESS;

  const transitMode1 = TransitMode.BUS;
  const transitMode2 = TransitMode.SUBWAY;
  const transitModes = List.of(transitMode1, transitMode2);

  const travelRestriction1 = TravelRestriction.TOLLS;
  const travelRestriction2 = TravelRestriction.FERRIES;
  const travelRestrictions = List.of(travelRestriction1, travelRestriction2);

  const useAlternatives = false;

  it('should test transit parameter creation', () => {
    const transitDirections = {
      destination,
      origin,
      travelMode: transitMode,
      trafficModel,
      transitModes,
      travelRestrictions,
      useAlternatives,
    };
    const expected = Map({
      destination,
      origin,
      mode: transitMode.value,
      alternatives: useAlternatives,
      avoid: List.of(travelRestriction1.value, travelRestriction2.value),
      transit_mode: List.of(transitMode1.value, transitMode2.value),
    });
    expect(transitDirections.toParameters()).to.eql(expected);
  });

  it('should test non-transit parameter creation', () => {
    const travelTimeFilter = new TravelTimeFilter();
    const drivingDirections = {
      destination,
      origin,
      travelMode: drivingMode,
      trafficModel,
      transitModes,
      travelRestrictions,
      useAlternatives,
      travelTimeFilter,
    };
    let expected = Map({
      destination,
      origin,
      mode: drivingMode.value,
      alternatives: useAlternatives,
      avoid: List.of(travelRestriction1.value, travelRestriction2.value),
      traffic_model: trafficModel.value,
    });
    expected = expected.merge(travelTimeFilter.toParameter());
    expect(drivingDirections).to.eql(expected);
  });
});
