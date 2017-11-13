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
    const expected = '┌────────────────────────────────────────┐\n│ From jae to baebae taking bar over foo │\n├───────────┬───────┬───────┬───────┬────┤\n│  Step #1  │  foo  │  bar  │  baz  │ 🚗  │\n├───────────┼───────┼───────┼───────┼────┤\n│  Step #2  │  foo  │  bar  │  baz  │ 🚗  │\n├───────────┴───────┴───────┴───────┴────┤\n│ From jae to baebae taking bar over foo │\n├───────────┬───────┬───────┬───────┬────┤\n│  Step #1  │  foo  │  bar  │  baz  │ 🚗  │\n├───────────┼───────┼───────┼───────┼────┤\n│  Step #2  │  foo  │  bar  │  baz  │ 🚗  │\n├───────────┼───────┴───────┴───────┴────┤\n│  Summary  │          summary           │\n├───────────┼────────────────────────────┤\n│ Warnings  │  warning,another warning   │\n└───────────┴────────────────────────────┘';
    console.log(table);
    expect(table).to.eql(expected);
  });
});
