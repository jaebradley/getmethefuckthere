import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
const expect = chai.expect;

chai.use(chaiImmutable);

import { List, Map } from 'immutable';

import TransitDetailsRowsCreator from '../src/services/TransitDetailsRowsCreator';

describe('Transit Details Rows Creator', () => {
  const rowsCreator = new TransitDetailsRowsCreator();

  it('Gets row', () => {
    const expectedContent = 'foo';
    const expected = List.of(Map({
      content: expectedContent,
      colSpan: 5,
      hAlign: 'center'
    }));
    expect(rowsCreator.getRow(expectedContent)).to.eql(expected);
  });

  it('Get step details content', () => {
    const expectedDepartureName = 'foo';
    const expectedDepartureArrivalValue = 'bar';
    const expectedArrivalName = 'jae';
    const expectedArrivalArrivalValue = 'baebae';
    const transitDetails = {
      departure: {
        name: expectedDepartureName,
        arrival: {
          value: expectedDepartureArrivalValue
        }
      },
      arrival: {
        name: expectedArrivalName,
        arrival: {
          value: expectedArrivalArrivalValue
        }
      }
    };
    const expected = 'Departing foo at bar and arriving at jae at baebae';
    expect(rowsCreator.getStepDetailsContent(transitDetails)).to.eql(expected);
  });

  it('Gets line details content', () => {
    const expectedStopCount = 'foo';
    const expectedName = 'bar';
    const expectedEmoji = 'jae';
    const transitDetails = {
      stopCount: expectedStopCount,
      line: {
        name: expectedName,
        vehicle: {
          emoji: expectedEmoji
        }
      }
    };
    const expected = 'Riding foo stops on the bar jae';
    expect(rowsCreator.getLineDetailsContent(transitDetails)).to.eql(expected);
  });

  it('Gets step details row', () => {
    const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake(function(value) {
      return `foo ${value}`;
    });
    const stubbedGetStepDetailsContent = sinon.stub(rowsCreator, 'getStepDetailsContent').returns('bar');
    const expected = 'foo bar';
    expect(rowsCreator.getStepDetailsRow({})).to.equal(expected);
    stubbedGetRow.restore();
    stubbedGetStepDetailsContent.restore();
  });

  it('Gets line details row', () => {
    const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake(function(value) {
      return `row ${value}`;
    });
    const stubbedGetLineDetailsRow = sinon.stub(rowsCreator, 'getLineDetailsContent').returns('line details');
    const expected = 'row line details';
    expect(rowsCreator.getLineDetailsRow({})).to.equal(expected);
    stubbedGetRow.restore();
    stubbedGetLineDetailsRow.restore();
  });

  it('Gets rows', () => {
    const expectedLineDetailsRow = 'line details row';
    const expectedStepDetailsRow = 'step details row';
    const stubbedGetLineDetailsRow = sinon.stub(rowsCreator, 'getLineDetailsRow').returns(expectedLineDetailsRow);
    const stubbedGetStepDetailsRow = sinon.stub(rowsCreator, 'getStepDetailsRow').returns(expectedStepDetailsRow);
    const expected = List.of(expectedLineDetailsRow, expectedStepDetailsRow);
    expect(rowsCreator.getRows({})).to.eql(expected);
  });
});
