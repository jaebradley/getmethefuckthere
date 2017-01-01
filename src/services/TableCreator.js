'use es6';

import {List} from 'immutable';

import Table from 'cli-table2';

export default class TableCreator {
  static create(routes) {
    return List(routes.map(route => TableCreator.createRouteTable(route)));
  }

  static createRouteTable(route) {
    let table = new Table();

    table.push([
      {
        content: route.summary,
        colSpan: 2,
        hAlign: 'center'
      },
      {
        content: route.warnings.toJS().toString(),
        colSpan: 2,
        hAlign: 'center'
      }
    ]);

    route.legs.forEach(leg => TableCreator.createLegRow(table, leg));
    return table.toString();
  }

  static createLegRow(table, leg) {
    table.push([
      leg.distance,
      leg.duration,
      leg.start,
      leg.end
    ]);
    leg.steps.forEach(step => table.push(TableCreator.createStepRow(step).toJS()));
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
