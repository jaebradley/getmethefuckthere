/* eslint no-console: 0 */

import createRouteTable from './createRouteTable';
import {
  DIRECTIONS_API_KEY,
} from './constants';
import selectTravelMode from './selectTravelMode';
import translateRoute from './translateRoute';
import createDirectionsService from './createDirectionsService';
import selectLocation from './selectLocation';

const execute = async () => {
  const originSelector = selectLocation({ message: 'Select start location' });
  const originResult = await originSelector.run();

  const destinationSelector = selectLocation({ message: 'Select end location' });
  const destinationResult = await destinationSelector.run();

  const travelModeSelector = selectTravelMode({ message: 'Select travel mode' });
  const travelModeResult = await travelModeSelector.run();

  const directionsService = createDirectionsService(DIRECTIONS_API_KEY);
  const {
    routes,
  } = await directionsService.getDirections({
    origin: originResult.location,
    destination: destinationResult.location,
    travelMode: travelModeResult,
  });

  routes
    .map(route => translateRoute(route))
    .map(route => createRouteTable(route))
    .forEach(table => console.log(table.toString()));
};

export default execute;
