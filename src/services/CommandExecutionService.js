/* eslint-disable no-return-assign */

import { Spinner } from 'clui';

import DirectionsService from './DirectionsService';
import RoutesTranslator from './translators/RoutesTranslator';
import RouteTableCreator from './RouteTableCreator';
import GeocodeService from './GeocodeService';
import { translate as translatePlaces } from './translators/PlacesTranslator';
import { getInputtedLocation, getSelectedLocation } from './InteractiveLocationIdentifier';
import { getSelectedTravelMode } from './InteractiveTravelModeIdentifier';
import CommandQuery from '../data/CommandQuery';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
    this.routesTranslator = new RoutesTranslator();
    this.routeTableCreator = new RouteTableCreator();
    this.geocodeService = new GeocodeService();
  }

  execute() {
    let origin;
    let destination;
    let travelMode;

    return this.getLocation('start')
      .then(value => origin = value.location)
      .then(() => this.getLocation('end'))
      .then(value => destination = value.location)
      .then(() => getSelectedTravelMode())
      .then(answer => travelMode = answer.travelMode)
      .then(() => {
        const directionSearch = new CommandQuery({ origin, destination, travelMode })
          .toDirectionsSearch();
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

  getLocation(point) {
    const spinner = new Spinner('Fetching address...');

    return getInputtedLocation(`Enter your ${point} location`)
      .then((answer) => {
        spinner.start();
        return this.geocodeService
          .fetch(answer.location)
          .then((values) => {
            spinner.stop();
            if (values.results.length === 0) {
              throw new Error(`Unable to identify ${point} location`);
            }
            return values;
          });
      })
      .then(values => translatePlaces(values))
      .then(places => getSelectedLocation(`Select your ${point} location`, places.toJSON()));
  }
}
