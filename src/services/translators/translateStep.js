import striptags from 'striptags';

import TravelMode from '../../data/TravelMode';
import translateTransitLineDetails from './translateTransitLineDetails';

const translateStep = ({
  distance,
  duration,
  html_instructions,
  travel_mode,
  transit_details,
}) => {
  const {
    arrival_stop,
    arrival_time,
    departure_stop,
    departure_time,
    line,
    num_stops,
  } = transit_details;

  return {
    distance: distance.text,
    duration: duration.text,
    instructions: striptags(html_instructions),
    mode: TravelMode[travel_mode.toLowerCase()],
    transitDetails: transit_details
      ? {
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
      }
      : null,
  }
};

export default translateStep;
