import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

chai.use(chaiImmutable);

const expect = chai.expect;

import TransitDetails from '../src/data/TransitDetails';
import StepTranslator from '../src/services/translators/StepTranslator';
import TransitStopDetailsTranslator from '../src/services/translators/TransitStopDetailsTranslator';
import TransitLineDetailsTranslator from '../src/services/translators/TransitLineDetailsTranslator';

describe('Step Translator', () => {
  const translator = new StepTranslator();
  const stubbedStopTranslator = sinon.stub(TransitStopDetailsTranslator.prototype, 'translate').returns('foo');
  const stubbedLineTranslator = sinon.stub(TransitLineDetailsTranslator.prototype, 'translate').returns('bar');

  it('Get Transit Details', () => {
    const expectedStopCount = 'jaebaebae';
    const transitDetails = {
      'num_stops': expectedStopCount,
      'arrival_stop': {
        'name': 'baz'
      },
      'arrival_time': 'now',
      'departure_stop': {
        'name': 'biz'
      },
      'departure_time': 'or never',
      'line': 'coke'
    };
    const expected = new TransitDetails({
      arrival: 'foo',
      departure: 'foo',
      line: 'bar',
      stopCount: expectedStopCount
    });
    expect(translator.getTransitDetails(transitDetails)).to.eql(expected);
  });
});
