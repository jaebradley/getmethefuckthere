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
        hAlign: 'center'
      }
    ]);

    if (!route.warnings.isEmpty()) {
      table.push([
        {
          content: 'Warnings',
          colSpan: 1,
          hAlign: 'center'
        },
        {
          content: route.warnings.toJS().toString(),
          hAlign: 'center'
        }
      ]);
    }

    route.legs.forEach(leg => TableCreator.createLegRow(table, leg));
    return table.toString();
  }

  static createLegRow(table, leg) {
    table.push([`From ${leg.start} to ${leg.end} taking ${leg.duration} over ${leg.distance}`]);
    for (let i = 0; i < leg.steps.size; i++) {
      table.push(TableCreator.createStepRow(step, i).toJS());
    }
  }

  static createStepRow(step, index) {
    return List.of(
      `Step #${index + 1}`,
      step.distance,
      step.duration,
      step.instructions,
      step.mode.emoji
    );
  }
}
