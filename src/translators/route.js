import translateStep from './step';

const translateLeg = ({
  distance,
  duration,
  steps,
  end_address: endAddress,
  start_address: startAddress,
  arrival_time: arrivalTime,
  departure_time: departureTime,
}) => ({
  distance: distance.text,
  duration: duration.text,
  end: endAddress,
  start: startAddress,
  steps: steps.map(step => translateStep(step)),
  arrivalTime: arrivalTime ? {
    value: arrivalTime.text,
    timezone: arrivalTime.time_zone,
  } : null,
  departureTime: departureTime ? {
    value: departureTime.text,
    timezone: departureTime.time_zone,
  } : null,
});

const translateRoute = ({ summary, warnings, legs }) => ({
  summary,
  warnings,
  legs: legs.map(leg => translateLeg(leg)),
});

export default translateRoute;
