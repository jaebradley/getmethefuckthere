import Table from 'cli-table2';

import RouteMetadataRowsCreator from './RouteMetadataRowsCreator';
import LegRowsCreator from './LegRowsCreator';
import StepRowsCreator from './StepRowsCreator';

export default class RouteTableCreator {
  constructor() {
    this.legRowsCreator = new LegRowsCreator();
    this.stepRowsCreator = new StepRowsCreator();
    this.metadataRowsCreator = new RouteMetadataRowsCreator();
  }

  create(route) {
    let table = new Table();

    route.legs.forEach(leg => {
      this.addLegRows(table, leg);
      this.addStepsRows(table, leg.steps);
    });

    this.addMetadataRows(table, route);

    return table;
  }

  addMetadataRows(table, route) {
    this.metadataRowsCreator.create(route)
                            .forEach(row => table.push(row.toJS()));
  }

  addLegRows(table, leg) {
    this.legRowsCreator.create(leg)
                       .forEach(row => table.push(row.toJS()));
  }

  addStepsRows(table, steps) {
    steps.forEach((step, index) => {
      this.stepRowsCreator.create(step, index)
                          .forEach(row => table.push(row.toJS()));
    });
  }
}
