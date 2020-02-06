import striptags from 'striptags';

import {
  TRAVEL_MODE,
  VEHICLE,
} from './constants';

const translateTransitLineDetails = ({
  name,
  agencies,
  vehicle,
  short_name: shortName,
}) => (
  {
    name: name || shortName,
    agencies: agencies.map(({ name: agencyName }) => agencyName),
    vehicle: VEHICLE[vehicle.type.toUpperCase()],
  }
);

const translateTransitDetails = ({
  line,
  arrival_stop: arrivalStop,
  arrival_time: arrivalTime,
  departure_stop: departureStop,
  departure_time: departureTime,
  num_stops: stopCount,
}) => ({
  arrival: {
    name: arrivalStop.name,
    arrival: {
      value: arrivalTime.text,
      timezone: arrivalTime.time_zone,
    },
  },
  departure: {
    name: departureStop.name,
    arrival: {
      value: departureTime.text,
      timezone: departureTime.time_zone,
    },
  },
  line: translateTransitLineDetails(line),
  stopCount,
});

const translateStep = ({
  distance,
  duration,
  html_instructions: htmlInstructions,
  travel_mode: travelMode,
  transit_details: transitDetails,
}) => ({
  distance: distance.text,
  duration: duration.text,
  instructions: striptags(htmlInstructions),
  mode: TRAVEL_MODE[travelMode.toUpperCase()],
  transitDetails: transitDetails
    ? translateTransitDetails(transitDetails)
    : null,
});

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
  steps: steps.map((step) => translateStep(step)),
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
  legs: legs.map((leg) => translateLeg(leg)),
});

export default translateRoute;
