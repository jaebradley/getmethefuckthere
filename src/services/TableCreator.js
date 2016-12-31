'use es6';

import Table from 'cli-table2';

export default class TableCreator {
  static create(routes) {

  }

  static createRouteTable(route) {

  }

  static createLegRow(leg) {
    
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
