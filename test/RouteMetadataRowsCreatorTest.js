import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import { List, Map } from 'immutable';

chai.use(chaiImmutable);

const expect = chai.expect;

import RouteMetadataRowsCreator from '../src/services/RouteMetadataRowsCreator';

describe('Route Metadata Rows Creator', () => {
  const rowsCreator = new RouteMetadataRowsCreator();

  describe('#getRow', () => {
    it('fetches', () => {
      const metadataField = 'metadataField';
      const metadataContent = 'metadataContent';
      const expected = List.of(
        Map({
          content: metadataField,
          colSpan: 1,
          hAlign: 'center'
        }),
        Map({
          content: metadataContent,
          colSpan: 4,
          hAlign: 'center'
        })
      );
      const result = rowsCreator.getRow(metadataField, metadataContent);
      for (let i = 0; i < result.size; i++) {
        expect(result.get(i)).to.eql(expected.get(i));
      }
    });
  });

  describe('#create', () => {
    it('without route summary and warnings', () => {
      const route = {
        summary: '',
        warnings: new List()
      };
      expect(rowsCreator.create(route)).to.eql(new List());
    });

    it('with route summary and without warnings', () => {
      const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake((metadataField, metadataContent) => `${metadataField} ${metadataContent}`);
      const route = {
        summary: 'foo',
        warnings: new List()
      };
      const expected = List.of('Summary foo');
      expect(rowsCreator.create(route)).to.eql(expected);
      stubbedGetRow.restore();
    });

    it('without route summary and with warnings', () => {
      const stubbedGetRow = sinon.stub(rowsCreator, 'getRow').callsFake((metadataField, metadataContent) => `${metadataField} ${metadataContent}`);
      const route = {
        summary: '',
        warnings: List.of('bar', 'baz')
      };
      const expected = List.of('Warnings bar,baz');
      expect(rowsCreator.create(route)).to.eql(expected);
      stubbedGetRow.restore();
    });
  });
});
