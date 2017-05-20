import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

const expect = chai.expect;

chai.use(chaiImmutable);

import { List, Map } from 'immutable';

import Time from '../src/data/Time';
import LegRowsCreator from '../src/services/LegRowsCreator';

describe('Leg Rows Creator', () => {
  const rowsCreator = new LegRowsCreator();

  it('#getRow', () => {
    const expectedContent = 'foo';
    const expected = List.of(
      Map({
        content: expectedContent,
        colSpan: 5,
        hAlign: 'center'
      })
    );
    expect(rowsCreator.getRow(expectedContent)).to.eql(expected);
  });

  it('#getTimeDetailsContent', () => {
    const expectedDepartureTimeValue = 'foo';
    const expectedArrivalTimeValue = 'bar';
    const departureTime = { value: expectedDepartureTimeValue };
    const arrivalTime = { value: expectedArrivalTimeValue };
    const expected = 'Departing at foo and arriving at bar';
    expect(rowsCreator.getTimeDetailsContent(departureTime, arrivalTime)).to.eql(expected);
  });

  it('#getLegDetailsContent', () => {
    const start = 'foo';
    const end = 'bar';
    const duration = 'jae';
    const distance = 'baebae';
    const leg = {
      start: start,
      end: end,
      duration: duration,
      distance: distance
    };
    const expected = 'From foo to bar taking jae over baebae';
    expect(rowsCreator.getLegDetailsContent(leg)).to.eql(expected);
  });

  describe('#create', () => {
    it('With time details', () => {
      const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake(value => `foo ${value}`);
      const stubbedGetTimeDetailsContent = sinon.stub(rowsCreator, 'getTimeDetailsContent').returns('time details content');
      const stubbedGetLegDetailsContent = sinon.stub(rowsCreator, 'getLegDetailsContent').returns('leg details content');
      const leg = {
        departureTime: new Time(),
        arrivalTime: new Time()
      };
      const expected = List.of('foo leg details content', 'foo time details content');
      expect(rowsCreator.create(leg)).to.eql(expected);
      stubbedGetRow.restore();
      stubbedGetTimeDetailsContent.restore();
      stubbedGetLegDetailsContent.restore();
    });

    it('Without time details', () => {
      const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake(value => `foo ${value}`);
      const stubbedGetLegDetailsContent = sinon.stub(rowsCreator, 'getLegDetailsContent').returns('leg details content');
      const expected = List.of('foo leg details content');
      expect(rowsCreator.create({})).to.eql(expected);
      stubbedGetRow.restore();
      stubbedGetLegDetailsContent.restore();
    });
  });
});
