import Table from 'cli-table2';

const createRouteMetadataRows = ({ summary, warnings }) => {
  const rows = [];

  if (summary.length > 0) {
    rows.push([
      {
        content: 'Summary',
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: summary,
        colSpan: 4,
        hAlign: 'center',
      },
    ]);
  }

  if (warnings.length > 0) {
    rows.push([
      {
        content: 'Warnings',
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: warnings.join(' | '),
        colSpan: 4,
        hAlign: 'center',
      },
    ]);
  }

  return rows;
};

const createTransitDetailsRows = ({
  stopCount,
  line,
  departure,
  arrival,
}) => {
  const {
    name: lineName,
    vehicle,
  } = line;

  const {
    name: departureName,
    arrival: departureArrival,
  } = departure;

  return [
    [{
      content: `Riding ${stopCount} stops on the ${lineName} ${vehicle.emoji}`,
      colSpan: 5,
      hAlign: 'center',
    }],
    [{
      content: `Departing ${departureName} at ${departureArrival.value} and arriving at ${arrival.name} at ${arrival.arrival.value}`,
      colSpan: 5,
      hAlign: 'center',
    }],
  ];
};

const buildCell = content => ({
  content,
  colSpan: 1,
  hAlign: 'center',
});

const createStepRows = ({ step, index }) => {
  const {
    distance,
    duration,
    instructions,
    mode,
    transitDetails,
  } = step;

  const rows = [[
    buildCell(`Step #${index}`),
    buildCell(distance),
    buildCell(duration),
    buildCell(instructions),
    buildCell(mode.emoji),
  ]];

  if (transitDetails) {
    rows.push.apply(rows, createTransitDetailsRows(transitDetails));
  }

  return rows;
};

const createLegRows = ({
  start,
  end,
  duration,
  distance,
  departureTime,
  arrivalTime,
}) => {
  const rows = [
    [
      {
        content: `From ${start} to ${end} taking ${duration} over ${distance}`,
        colSpan: 5,
        hAlign: 'center',
      },
    ],
  ];

  if (departureTime && arrivalTime) {
    rows.push([
      {
        content: `Departing at ${departureTime.value} and arriving at ${arrivalTime.value}`,
        colSpan: 5,
        hAlign: 'center',
      },
    ]);
  }

  return rows;
};

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

