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

export default createLegRows;
