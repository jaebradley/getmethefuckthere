/* eslint-disable no-return-assign */

import translateRoute from './translators/route';
import LocationSelector from './LocationSelector';
import {
  GEOCODE_API_KEY,
  DIRECTIONS_API_KEY,
} from './constants';
import GoogleMapsService from './GoogleMapsService';
import createRouteTable from './createRouteTable';
import selectTravelMode from './selectTravelMode';

const execute = async () => {
  const googleMapsService = new GoogleMapsService({
    directionsAPIKey: DIRECTIONS_API_KEY,
    geocodeAPIKey: GEOCODE_API_KEY,
  });
  const locationSelector = new LocationSelector(googleMapsService);
  const origin = await locationSelector.selectLocation('Select start location');
  const destination = await locationSelector.selectLocation('Select end location');
  const travelMode = await selectTravelMode();

  const { routes } = await googleMapsService.getDirections({
    origin,
    destination,
    travelMode,
  });

  routes
    .map(route => translateRoute(route))
    .map(route => createRouteTable(route))
    .forEach(table => console.log(table.toString()));
};

export default execute;
