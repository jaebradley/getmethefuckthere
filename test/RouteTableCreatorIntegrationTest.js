'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import { List } from 'immutable';

import Leg from '../src/data/Leg';
import Route from '../src/data/Route';
import Step from '../src/data/Step';
import RouteTableCreator from '../src/services/RouteTableCreator';
import TravelMode from '../src/data/TravelMode';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Route Table Creator Integration Test', () => {
  const tableCreator = new RouteTableCreator();

  const distance = 'foo';
  const duration = 'bar';
  const instructions = 'baz';
  const mode = TravelMode.DRIVING;
  const start = 'jae';
  const end = 'baebae';
  const summary = 'summary';
  const warnings = List.of('warning', 'another warning');
  const step = new Step({
    distance,
    duration,
    instructions,
    mode,
  });
  const leg = new Leg({
    distance,
    duration,
    start,
    end,
    steps: List.of(step, step),
  });
  const route = new Route({
    summary,
    warnings,
    legs: List.of(leg, leg),
  });

  it('Tests Route Table Creation', () => {
    const table = tableCreator.create(route).toString();
    const expected = '\u001b[90m┌────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #1  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #2  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────┴───────┴───────┴───────┴────┤\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #1  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #2  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────┴───────┴───────┴────┤\u001b[39m\n\u001b[90m│\u001b[39m  Summary  \u001b[90m│\u001b[39m          summary           \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Warnings  \u001b[90m│\u001b[39m  warning,another warning   \u001b[90m│\u001b[39m\n\u001b[90m└───────────\u001b[39m\u001b[90m┴────────────────────────────┘\u001b[39m';
    console.log(table);
    expect(table).to.eql(expected);
  });
});
