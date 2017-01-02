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
  let start = 'jae';
  let end = 'baebae';
  let summary = 'summary';
  let warnings = List.of('warning', 'another warning');
  let step = new Step({
    distance: distance,
    duration: duration,
    instructions: instructions,
    mode: mode
  });
  let leg = new Leg({
    distance: distance,
    duration: duration,
    start: start,
    end: end,
    steps: List.of(step, step)
  });
  let route = new Route({
    summary: summary,
    warnings: warnings,
    legs: List.of(leg, leg)
  });

  it('Tests Step Row Creation', function() {
    let expected = List.of('Step #1', distance, duration, instructions, mode.emoji);
    expect(TableCreator.createStepRow(step, 0)).to.eql(expected);
  });

  it('Tests Route Table Creation', function() {
    let table = TableCreator.createRouteTable(route);
    let expected = '\u001b[90m┌────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m                summary                 \u001b[90m│\u001b[39m\n\u001b[90m├────────────\u001b[39m\u001b[90m┬───────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m  Warnings  \u001b[90m│\u001b[39m  warning,another warning  \u001b[90m│\u001b[39m\n\u001b[90m├────────────┴───────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├────────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬──────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m Step #1    \u001b[90m│\u001b[39m foo   \u001b[90m│\u001b[39m bar  \u001b[90m│\u001b[39m baz   \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├────────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼──────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m Step #2    \u001b[90m│\u001b[39m foo   \u001b[90m│\u001b[39m bar  \u001b[90m│\u001b[39m baz   \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├────────────┴───────┴──────┴───────┴────┤\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├────────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬──────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m Step #1    \u001b[90m│\u001b[39m foo   \u001b[90m│\u001b[39m bar  \u001b[90m│\u001b[39m baz   \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├────────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼──────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m Step #2    \u001b[90m│\u001b[39m foo   \u001b[90m│\u001b[39m bar  \u001b[90m│\u001b[39m baz   \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m└────────────\u001b[39m\u001b[90m┴───────\u001b[39m\u001b[90m┴──────\u001b[39m\u001b[90m┴───────\u001b[39m\u001b[90m┴────┘\u001b[39m';
    console.log(table);
    expect(table).to.eql(expected);
  })
});
