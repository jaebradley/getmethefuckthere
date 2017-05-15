import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

chai.use(chaiImmutable);

const expect = chai.expect;

import TransitDetails from '../src/data/TransitDetails';
import StepTranslator from '../src/services/translators/StepTranslator';

describe('Step Translator', () => {
  const translator = new StepTranslator();
  const stubbedStopTranslator = sinon.stub(translator, 'this.stopTranslator.translate').returns('foo');
  const stubbedLineTranslator = sinon.stub(translator, 'this.lineTranslator.translate').returns('bar');

  it('Get Transit Details', () => {
    const expectedStopCount = 'jaebaebae';
    const transitDetails = { 'num_stops': expectedStopCount };
    const expected = new TransitDetails({
      arrival: 'foo',
      departure: 'foo',
      line: 'bar',
      stopCount: expectedStopCount
    });
    expect(translator.getTransitDetails(transitDetails)).to.eql(expected);
  });
});
