import { List } from 'immutable';

import Route from '../../data/Route';
import LegTranslator from './LegTranslator';

export default class RoutesTranslator {
  constructor() {
    this.legTranslator = new LegTranslator();
  }

  translate(routes) {
    return List(routes.map(route => this.getRoute(route)));
  }

  getRoute(route) {
    return new Route({
      summary: route.summary,
      warnings: List(route.warnings),
      legs: this.getLegs(route.legs)
    });
  }

  getLegs(legs) {
    return List(legs.map(leg => this.legTranslator.translate(leg)));
  }
}
