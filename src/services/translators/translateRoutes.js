import translateStep from './translateStep';

const translateLeg = ({
  distance,
  duration,
  end_address,
  start_address,
  steps,
  arrival_time,
  departure_time,
}) => ({
  distance: distance.text,
  duration: duration.text,
  end: end_address,
  start: start_address,
  steps: steps.map(step => translateStep(step)),
  arrivalTime: arrival_time ? {
    value: arrival_time.text,
    timezone: arrival_time.time_zone,
  } : null,
  departureTime: departure_time ? {
    value: departure_time.text,
    timezone: departure_time.time_zone,
  } : null,
});

const translateRoutes = ({ summary, warnings, legs }) => ({
  summary,
  warnings,
  legs: legs.map(leg => translateLeg(leg)),
});

export default translateRoutes;
