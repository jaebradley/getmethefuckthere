'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {Map} from 'immutable';
import moment from 'moment-timezone';

import TravelTimeFilter from '../src/data/TravelTimeFilter';
import TravelTimeFilterType from '../src/data/TravelTimeFilterType';

let expect = chai.expect;

describe('Test Travel Time Filter', function() {
  let datetime = moment().year(2016)
                         .month(1)
                         .day(1)
                         .startOf('day');

  it('should test parameter creation', function() {
    let departureFilter = new TravelTimeFilter({
      value: datetime,
      type: TravelTimeFilterType.DEPARTURE
    });
    let departureExpected = Map({
      'departure_time': datetime.valueOf()
    });
    expect(departureFilter.toParameter()).to.eql(departureExpected);

    let arrivalFilter = new TravelTimeFilter({
      value: datetime,
      type: TravelTimeFilterType.ARRIVAL
    });
    let arrivalExpected = Map({
      'arrival_time': datetime.valueOf()
    });
    expect(arrivalFilter.toParameter()).to.eql(arrivalExpected);
  });
});
