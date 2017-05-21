import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import { Map } from 'immutable';
import moment from 'moment-timezone';

import TravelTimeFilter from '../src/data/TravelTimeFilter';
import TravelTimeFilterType from '../src/data/TravelTimeFilterType';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Test Travel Time Filter', () => {
  const datetime = moment().year(2016)
                         .month(1)
                         .day(1)
                         .startOf('day');

  it('should test parameter creation', () => {
    const departureFilter = new TravelTimeFilter({
      value: datetime,
      type: TravelTimeFilterType.DEPARTURE,
    });
    const departureExpected = Map({ departure_time: datetime.valueOf() });
    expect(departureFilter.toParameter()).to.eql(departureExpected);

    const arrivalFilter = new TravelTimeFilter({
      value: datetime,
      type: TravelTimeFilterType.ARRIVAL,
    });
    const arrivalExpected = Map({ arrival_time: datetime.valueOf() });
    expect(arrivalFilter.toParameter()).to.eql(arrivalExpected);
  });
});
