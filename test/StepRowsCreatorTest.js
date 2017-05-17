import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import { List } from 'immutable';

chai.use(chaiImmutable);

const expect = chai.expect;

import TransitDetails from '../src/data/TransitDetails';
import TransitDetailsRowsCreator from '../src/services/TransitDetailsRowsCreator';
import StepRowsCreator from '../src/services/StepRowsCreator';

describe('Step Rows Creator', () => {
  const rowsCreator = new StepRowsCreator();

  it('Gets cell', () => {
    const expectedContent = 'foo';
    const expected = {
      content: expectedContent,
      colSpan: 1,
      hAlign: 'center'
    };
    expect(rowsCreator.getCell(expectedContent)).to.eql(expected);
  });

  it('Get step row', () => {
    const stubbedGetCell = sinon.stub(rowsCreator, 'getCell').callsFake(function(content) {
      return `foo ${content}`;
    });
    const index = 1;
    const step = {
      distance: 'distance',
      duration: 'duration',
      instructions: 'instructions',
      mode: {
        emoji: 'emoji'
      }
    };
    const expected = List.of('foo Step #2', 'foo distance', 'foo duration', 'foo instructions', 'foo emoji');
    expect(rowsCreator.getStepRow(step, index)).to.eql(expected);
    stubbedGetCell.restore();
  });

  describe('Get rows', () => {

    it('With Transit Details', () => {
      const stubbedGetStepRow = sinon.stub(rowsCreator, 'getStepRow').returns('jae');
      const stubbedGetRows = sinon.stub(TransitDetailsRowsCreator.prototype, 'getRows').returns(List.of(1, 2, 3));
      const step = { transitDetails: new TransitDetails() };
      const expected = List.of('jae', 1, 2, 3);
      expect(rowsCreator.getRows(step, 1)).to.eql(expected);
      stubbedGetStepRow.restore();
      stubbedGetRows.restore();
    });

    it('Without Transit Details', () => {
      const stubbedGetStepRow = sinon.stub(rowsCreator, 'getStepRow').returns('jae');
      const expected = List.of('jae');
      expect(rowsCreator.getRows({}, 1)).to.eql(expected);
      stubbedGetStepRow.restore();
    });
  });
});
