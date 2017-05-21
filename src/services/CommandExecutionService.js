import DirectionsService from './DirectionsService';
import RoutesTranslator from './translators/RoutesTranslator';
import RouteTableCreator from './RouteTableCreator';

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
               .then(data => this.routesTranslator.translate(data.routes))
               .then(routes => routes.map(route => this.routeTableCreator.create(route)))
               .then(tables => tables.forEach(table => console.log(table.toString())));
  }
}
