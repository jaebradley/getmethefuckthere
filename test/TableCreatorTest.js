'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {List} from 'immutable';

import TableCreator from '../src/services/TableCreator';
import Route from '../src/data/Route';
import Leg from '../src/data/Leg';
import Step from '../src/data/Step';
import TravelMode from '../src/data/TravelMode';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Table Creator', function() {
  let distance = 'foo';
  let duration = 'bar';
  let instructions = 'baz';
  let mode = TravelMode.DRIVING;
  let step = new Step({
    distance: distance,
    duration: duration,
    instructions: instructions,
    mode: mode
  });
  it('Tests Step Row Creation', function() {
    let expected = List.of(distance, duration, instructions, mode.emoji);
    expect(TableCreator.createStepRow(step)).to.eql(expected);
  });
});
