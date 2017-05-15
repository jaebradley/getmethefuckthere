import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

chai.use(chaiImmutable);

const expect = chai.expect;

import TransitDetails from '../src/data/TransitDetails';
import Step from '../src/data/Step';
import StepTranslator from '../src/services/translators/StepTranslator';
import TransitStopDetailsTranslator from '../src/services/translators/TransitStopDetailsTranslator';
import TransitLineDetailsTranslator from '../src/services/translators/TransitLineDetailsTranslator';
import TravelModeIdentifier from '../src/services/TravelModeIdentifier';

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

  describe('Translates', () => {
    const stubbedTravelModeIdentifier = sinon.stub(TravelModeIdentifier.prototype, 'identify').returns('biz');

    it('Without Transit Details', () => {
      const distanceText = 'distanceText';
      const durationText = 'durationText';
      const htmlInstructions = 'htmlInstructions';
      const step = {
        distance: {
          text: distanceText
        },
        duration: {
          text: durationText
        },
        html_instructions: htmlInstructions,
        travel_mode: 'travelMode'
      };
      const expected = new Step({
        distance: distanceText,
        duration: durationText,
        instructions: htmlInstructions,
        mode: 'biz'
      });
      expect(translator.translate(step)).to.eql(expected);
    })
  });
});
