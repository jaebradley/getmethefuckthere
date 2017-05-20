'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import Table from 'cli-table2';
import {List} from 'immutable';

import Line from '../src/data/Line';
import Leg from '../src/data/Leg';
import Route from '../src/data/Route';
import Step from '../src/data/Step';
import Stop from '../src/data/Stop';
import RouteTableCreator from '../src/services/RouteTableCreator';
import TransitDetails from '../src/data/TransitDetails';
import TravelMode from '../src/data/TravelMode';
import Time from '../src/data/Time';
import Vehicle from '../src/data/Vehicle';

let expect = chai.expect;

chai.use(chaiImmutable);


describe('Route Table Creator Integration Test', function() {
  const tableCreator = new RouteTableCreator();

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
  let stop = new Stop({
    name: 'jaebaebae',
    arrival: new Time({
      value: '1234',
      timezone: 'jibbityjabbity'
    })
  });
  let line = new Line({
    name: 'bibbitybabbity',
    agencies: List.of('jae', 'bae', 'bae'),
    vehicle: Vehicle.BUS
  });
  let transitDetails = new TransitDetails({
    arrival: stop,
    departure: stop,
    stopCount: 12,
    line: line
  });
  let stepWithTransitDetails = new Step({
    distance: distance,
    duration: duration,
    instructions: instructions,
    mode: mode,
    transitDetails: transitDetails
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

  // TODO: move this to step row integration tests
  // it('Tests Step Row Creation', function() {
  //   let table = new Table();
  //   let expected = '\u001b[90m┌─────────\u001b[39m\u001b[90m┬─────\u001b[39m\u001b[90m┬─────\u001b[39m\u001b[90m┬─────\u001b[39m\u001b[90m┬───┐\u001b[39m\n\u001b[90m│\u001b[39m Step #1 \u001b[90m│\u001b[39m foo \u001b[90m│\u001b[39m bar \u001b[90m│\u001b[39m baz \u001b[90m│\u001b[39m 🚗 \u001b[90m│\u001b[39m\n\u001b[90m└─────────\u001b[39m\u001b[90m┴─────\u001b[39m\u001b[90m┴─────\u001b[39m\u001b[90m┴─────\u001b[39m\u001b[90m┴───┘\u001b[39m';
  //   tableCreator.createStepRow(table, step, 0);
  //   console.log(table.toString());
  //   expect(table.toString()).to.eql(expected);
  // });
  //
  // it('Tests Step With Transit Details Creation', function() {
  //   let table = new Table();
  //   let expected = '\u001b[90m┌───────────────\u001b[39m\u001b[90m┬────────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬────────────\u001b[39m\u001b[90m┬─────────┐\u001b[39m\n\u001b[90m│\u001b[39m    Step #1    \u001b[90m│\u001b[39m    foo     \u001b[90m│\u001b[39m    bar    \u001b[90m│\u001b[39m    baz     \u001b[90m│\u001b[39m    🚗    \u001b[90m│\u001b[39m\n\u001b[90m├───────────────┴────────────┴───────────┴────────────┴─────────┤\u001b[39m\n\u001b[90m│\u001b[39m            Riding 12 stops on the bibbitybabbity 🚌            \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Departing jaebaebae at 1234 and arriving at jaebaebae at 1234 \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────────────────────────────────────────┘\u001b[39m';
  //   tableCreator.createStepRow(table, stepWithTransitDetails, 0);
  //   console.log(table.toString());
  //   expect(table.toString()).to.eql(expected);
  // })

  it('Tests Route Table Creation', function() {
    let table = tableCreator.create(route).toString();
    let expected = '\u001b[90m┌────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #1  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #2  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────┴───────┴───────┴───────┴────┤\u001b[39m\n\u001b[90m│\u001b[39m From jae to baebae taking bar over foo \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #1  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼────┤\u001b[39m\n\u001b[90m│\u001b[39m  Step #2  \u001b[90m│\u001b[39m  foo  \u001b[90m│\u001b[39m  bar  \u001b[90m│\u001b[39m  baz  \u001b[90m│\u001b[39m 🚗  \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼───────┴───────┴───────┴────┤\u001b[39m\n\u001b[90m│\u001b[39m  Summary  \u001b[90m│\u001b[39m          summary           \u001b[90m│\u001b[39m\n\u001b[90m├───────────\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Warnings  \u001b[90m│\u001b[39m  warning,another warning   \u001b[90m│\u001b[39m\n\u001b[90m└───────────\u001b[39m\u001b[90m┴────────────────────────────┘\u001b[39m';
    console.log(table);
    expect(table).to.eql(expected);
  })
});
