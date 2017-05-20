'use es6';

import DirectionsSearch from '../data/DirectionsSearch';
import DirectionsService from './DirectionsService';
import RoutesTranslator from './translators/RoutesTranslator';
import TableCreator from './TableCreator';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
    this.routesTranslator = new RoutesTranslator();
    this.routeTableCreator = new RouteTableCreator();
  }

  execute(query) {
    return this.getDirections(query.toDirectionsSearch());
  }

  getDirections(search) {
    return this.directionsService
               .fetch(search)
               .then(data => this.routesTranslator.translate(data))
               .then(routes.map(route => this.routeTableCreator(route))
               .then(tables.forEach(table => console.log(table.toString()))));
  }
}
