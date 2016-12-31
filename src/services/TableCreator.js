'use es6';

import Table from 'cli-table2';

export default class TableCreator {
  static create(routes) {
    return List(routes.map(route => TableCreator.createRouteTable(route)));
  }

  static createRouteTable(route) {
    let route = List.of(
      route.summary,
      route.warnings
    );

    let route = route.concat(route.legs.map(leg => TableCreator.createLegRow(leg)));
    return new Table(route.toJS()).toString();
  }

  static createLegRow(leg) {
    let leg = List.of(
      leg.distance,
      leg.duration,
      leg.start,
      leg.end
    );
    return leg.concat(leg.steps.map(step => TableCreator.createStepRow(step)));
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
