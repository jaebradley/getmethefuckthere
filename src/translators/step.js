import striptags from 'striptags';

import {
  TRAVEL_MODE,
  VEHICLE,
 } from '../constants';

const translateTransitLineDetails = ({
  name,
  short_name: shortName,
  agencies,
  vehicle,
}) => (
  {
    name: name || shortName,
    agencies: agencies.map(({ name }) => name),
    vehicle: VEHICLE[vehicle.type.toUpperCase()],
  }
);

const translateTransitDetails = ({
  arrival_stop,
  arrival_time,
  departure_stop,
  departure_time,
  line,
  num_stops,
}) => ({
  arrival: {
    name: arrival_stop.name,
    arrival: {
      value: arrival_time.text,
      timezone: arrival_time.time_zone,
    },
  },
  departure: {
    name: departure_stop.name,
    arrival: {
      value: departure_time.text,
      timezone: departure_time.time_zone,
    },
  },
  line: translateTransitLineDetails(line),
  stopCount: num_stops,
});

const translateStep = ({
  distance,
  duration,
  html_instructions,
  travel_mode,
  transit_details,
}) => ({
  distance: distance.text,
  duration: duration.text,
  instructions: striptags(html_instructions),
  mode: TRAVEL_MODE[travel_mode.toUpperCase()],
  transitDetails: transit_details
    ? translateTransitDetails(transit_details)
    : null,
});

export default translateStep;
