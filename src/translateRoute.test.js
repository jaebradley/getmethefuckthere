import translateRoute from './translateRoute';
import {
  TRAVEL_MODE,
  VEHICLE,
} from './constants';

describe('translateRoute', () => {
  const summary = 'summary';
  const warnings = 'warnings';
  const endAddress = 'endAddress';
  const startAddress = 'startAddress';
  const arrivalTime = {
    text: 'arrivalTimeText',
    time_zone: 'arrivalTimeTimeZone',
  };
  const departureTime = {
    text: 'departureTimeText',
    time_zone: 'departureTimeTimeZone',
  };
  const distance = { text: 'distanceText' };
  const duration = { text: 'durationText' };
  const htmlInstructions = 'htmlInstructions';
  const travelMode = TRAVEL_MODE.DRIVING.value;
  const vehicle = { type: VEHICLE.TRAM.value };
  const name = 'name';
  const agencies = [{ name: 'agency1' }];
  const shortName = 'shortName';
  const transitLine = {
    name,
    agencies,
    vehicle,
    short_name: shortName,
  };
  const arrivalStop = { name: 'arrivalStopName' };
  const departureStop = { name: 'departureStopName' };
  const stopCount = 'stopCount';

  const transitDetails = {
    line: transitLine,
    arrival_stop: arrivalStop,
    arrival_time: arrivalTime,
    departure_stop: departureStop,
    departure_time: departureTime,
    num_stops: stopCount,
  };

  const step = {
    distance,
    duration,
    html_instructions: htmlInstructions,
    travel_mode: travelMode,
    transit_details: transitDetails,
  };

  const leg = {
    distance,
    duration,
    steps: [step],
    end_address: endAddress,
    start_address: startAddress,
    arrival_time: arrivalTime,
    departure_time: departureTime,
  };

  const route = {
    summary,
    warnings,
    legs: [leg],
  };

  it('translates transit route', () => {
    const expected = {
      summary,
      warnings,
      legs: [
        {
          distance: distance.text,
          duration: duration.text,
          end: endAddress,
          start: startAddress,
          arrivalTime: {
            value: arrivalTime.text,
            timezone: arrivalTime.time_zone,
          },
          departureTime: {
            value: departureTime.text,
            timezone: departureTime.time_zone,
          },
          steps: [
            {
              distance: distance.text,
              duration: duration.text,
              instructions: htmlInstructions,
              mode: TRAVEL_MODE.DRIVING,
              transitDetails: {
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
                line: {
                  name,
                  agencies: ['agency1'],
                  vehicle: VEHICLE.TRAM,
                },
                stopCount,
              },
            },
          ],
        },
      ],
    };
    expect(expected).toEqual(translateRoute(route));
  });
});
