/* eslint-disable no-return-assign */

import GoogleMapsClient from '@google/maps';

import translateRoutes from './translators/translateRoutes';
import LocationSelector from './LocationSelector';
import { GOOGLE_MAPS_API_KEY } from '../data/constants';
import GoogleMapsService from './GoogleMapsService';
import createRouteTable from './createRouteTable';
import selectTravelMode from './selectTravelMode';

const execute = async () => {
  const googleMapsClient = GoogleMapsClient.createClient({
    key: GOOGLE_MAPS_API_KEY,
    Promise,
  });
  const googleMapsService = new GoogleMapsService(googleMapsClient);
  const locationSelector = new LocationSelector(googleMapsService);
  const origin = await locationSelector.selectLocation('Select start location');
  const destination = await locationSelector.selectLocation('Select end location');
  const travelMode = await selectTravelMode();
  const { routes } = await googleMapsService.getDirections({
    origin,
    destination,
    travelMode,
  });

  translateRoutes(routes).map(route => createRouteTable(route)).forEach(table => console.log(table.toString()));
};

export default execute;
