import Table from 'cli-table2';

import createRouteMetadataRows from './createRouteMetadataRows';
import createLegRows from './createLegRows';
import createStepRows from './createStepRows';

const createRouteTable = (route) => {
  const table = new Table();

  route.legs.forEach((leg) => {
    createLegRows(leg).forEach(row => table.push(row));
    leg.steps.forEach((step, index) => {
      createStepRows({ step, index }).forEach(row => table.push(row));
    });
  });

  createRouteMetadataRows(route).forEach(row => table.push(row));

  return table;
};

export default createRouteTable;

