'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {List} from 'immutable';

import DirectionsTranslator from '../src/services/translators/DirectionsTranslator';
import Leg from '../src/data/Leg';
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

  let endAddress = 'jae';
  let startAddress = 'baebae';
  let legJson = {
    'distance': {
      'text': distanceDescription
    },
    'duration': {
      'text': durationDescription
    },
    'end_address': endAddress,
    'start_address': startAddress,
    'steps': [
      stepJson,
      stepJson
    ]
  };

  let expectedStep = new Step({
    distance: distanceDescription,
    duration: durationDescription,
    instructions: htmlInstructions,
    mode: TravelModeIdentifier.identify(travelMode)
  });

  let expectedLeg = new Leg({
    distance: distanceDescription,
    duration: durationDescription,
    end: endAddress,
    start: startAddress,
    steps: List.of(expectedStep, expectedStep)
  });

  it('should translate step', function() {
    let translatedStep = DirectionsTranslator.translateStep(stepJson);
    expect(translatedStep).to.eql(expectedStep);
  });

  it('should translate leg', function() {
    let translatedLeg = DirectionsTranslator.translateLeg(legJson);
    expect(translatedLeg).to.eql(expectedLeg);
  });
});