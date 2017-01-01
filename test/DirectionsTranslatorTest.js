'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import DirectionsTranslator from '../src/services/translators/DirectionsTranslator';
import Step from '../src/data/Step';
import TravelModeIdentifier from '../src/services/TravelModeIdentifier';
import TravelMode from '../src/data/TravelMode';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Directions Translator', function() {
  let distanceDescription = 'foo';
  let durationDescription = 'bar';
  let htmlInstructions = 'instructions';
  let travelMode = 'driving';
  let stepJson = {
    'distance': {
      'text': distanceDescription
    },
    'duration': {
      'text': durationDescription
    },
    'html_instructions': htmlInstructions,
    'travel_mode': travelMode
  };
  it('should translate step', function() {
    let expected = new Step({
      distance: distanceDescription,
      duration: durationDescription,
      instructions: htmlInstructions,
      mode: TravelModeIdentifier.identify(travelMode)
    });
    let translatedStep = DirectionsTranslator.translateStep(stepJson);
    expect(translatedStep).to.eql(expected);
  });
});
