'use es6';

import {List} from 'immutable';

import Table from 'cli-table2';

export default class TableCreator {
  static create(routes) {
    return List(routes.map(route => TableCreator.createRouteTable(route)));
  }

  static createRouteTable(route) {
    let row = List.of(
      route.summary,
      route.warnings
    );

    row = row.concat(route.legs.map(leg => TableCreator.createLegRow(leg)));
    return new Table(row.toJS()).toString();
  }

  static createLegRow(leg) {
    let row = List.of(
      leg.distance,
      leg.duration,
      leg.start,
      leg.end
    );
    return row.concat(leg.steps.map(step => TableCreator.createStepRow(step)));
  }

  static createStepRow(step) {
    return List.of(
      step.distance,
      step.duration,
      step.instructions,
      step.mode.emoji
    );
  }
}
