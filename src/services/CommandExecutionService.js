/* eslint-disable no-return-assign */

import DirectionsService from './DirectionsService';
import RoutesTranslator from './translators/RoutesTranslator';
import RouteTableCreator from './RouteTableCreator';
import GeocodeService from './GeocodeService';
import LocationSelector from './LocationSelector';
import TravelModeSelector from './TravelModeSelector';
import CommandQuery from '../data/CommandQuery';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
    this.routesTranslator = new RoutesTranslator();
    this.routeTableCreator = new RouteTableCreator();
    this.geocodeService = new GeocodeService();
    this.locationSelector = new LocationSelector();
    this.travelModeSelector = new TravelModeSelector();
    this.origin = null;
    this.destination = null;
    this.travelMode = null;
  }

  execute() {
    return this.locationSelector.selectLocation('Select start location')
      .then(location => this.origin = location)
      .then(() => this.locationSelector.selectLocation('Select end location'))
      .then(location => this.destination = location)
      .then(() => this.travelModeSelector.selectTravelMode())
      .then(travelMode => this.travelMode = travelMode)
      .then(() => {
        const directionSearch = new CommandQuery(
          {
            origin: this.origin,
            destination: this.destination,
            travelMode: this.travelMode,
          },
        ).toDirectionsSearch();

        return this.getDirections(directionSearch);
      })
      .catch(() => console.log('Unable to fetch directions'));
  }

  getDirections(search) {
    return this.directionsService
      .fetch(search)
      .then(data => this.routesTranslator.translate(data.routes))
      .then(routes => routes.map(route => this.routeTableCreator.create(route)))
      .then(tables => tables.forEach(table => console.log(table.toString())));
  }
}
