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

export default createTransitDetailsRows;
