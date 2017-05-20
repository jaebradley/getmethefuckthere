import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import { List } from 'immutable';
import Table from 'cli-table2';

chai.use(chaiImmutable);

const expect = chai.expect;

import RouteTableCreator from '../src/services/RouteTableCreator';
import RouteMetadataRowsCreator from '../src/services/RouteMetadataRowsCreator';
import StepRowsCreator from '../src/services/StepRowsCreator';
import LegRowsCreator from '../src/services/LegRowsCreator';

describe('Route Table Creator', () => {
  const tableCreator = new RouteTableCreator();

  describe('#addMetadataRows', () => {
    it('should add metadata rows to table', () => {
      const rows = List.of(List.of('foo'), List.of('bar', 'baz'));
      const stubbedMetadataRowsCreator = sinon.stub(RouteMetadataRowsCreator.prototype, 'create').returns(rows);

      const table = [];
      const expected = [['foo'], ['bar', 'baz']];

      tableCreator.addMetadataRows(table, {});

      expect(table).to.eql(expected);

      stubbedMetadataRowsCreator.restore();
    });
  });

  describe('#addLegRows', () => {
    it('should add leg rows to table', () => {
      const rows = List.of(List.of('foo'), List.of('bar', 'baz'));
      const stubbedlegRowsCreator = sinon.stub(LegRowsCreator.prototype, 'create').returns(rows);

      const table = [];
      const expected = [['foo'], ['bar', 'baz']];

      tableCreator.addLegRows(table, {});

      expect(table).to.eql(expected);

      stubbedlegRowsCreator.restore();
    });
  });

  describe('#addStepsRows', () => {
    it('should add step rows', () => {
      const step = List.of(List.of('foo'));
      const steps = List.of(1, 2);
      const stubbedStepRowsCreator = sinon.stub(StepRowsCreator.prototype, 'create').returns(step);

      const table = [];
      const expected = [ ['foo'], ['foo'] ];

      tableCreator.addStepsRows(table, steps);

      expect(table).to.eql(expected);

      stubbedStepRowsCreator.restore();
    });
  });

  describe('#create', () => {
    it('should build table', () => {
      const leg = {
        name: 'leg',
        steps: 'steps'
      };
      const route = {
        metadata: 'metadata',
        legs: [ leg, leg ]
      };
      const stubbedAddLegRows = sinon.stub(tableCreator, 'addLegRows')
                                      .callsFake((table, leg) => { table.push(leg.name) });
      const stubbedAddStepRows = sinon.stub(tableCreator, 'addStepsRows')
                                      .callsFake((table, steps) => { table.push(steps) });
      const stubbedAddMetadataRows = sinon.stub(tableCreator, 'addMetadataRows')
                                          .callsFake((table, route) => { table.push(route.metadata) });
      let expected = new Table();
      expected.push(leg.name);
      expected.push('steps');
      expected.push(leg.name);
      expected.push('steps');
      expected.push('metadata');

      expect(tableCreator.create(route)).to.eql(expected);

      stubbedAddLegRows.restore();
      stubbedAddStepRows.restore();
      stubbedAddMetadataRows.restore();
    });
  });
});
