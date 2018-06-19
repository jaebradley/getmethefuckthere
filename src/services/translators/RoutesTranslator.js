import { List } from 'immutable';

import LegTranslator from './LegTranslator';

export default class RoutesTranslator {
  constructor() {
    this.legTranslator = new LegTranslator();
  }

  translate(routes) {
    return List(routes.map(route => this.getRoute(route)));
  }

  getRoute(route) {
    return {
      summary: route.summary,
      warnings: route.warnings,
      legs: route.legs.map(leg => this.legTranslator.translate(leg)),
    };
  }
}
