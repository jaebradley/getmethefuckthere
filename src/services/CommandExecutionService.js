'use es6';

import DirectionsSearch from '../data/DirectionsSearch';
import DirectionsService from './DirectionsService';
import DirectionsTranslator from './translators/DirectionsTranslator';
import TableCreator from './TableCreator';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
  }

  execute(query) {
    return this.getDirections(query.toDirectionsSearch());
  }

  getDirections(search) {
    return this.directionsService
               .fetch(search)
               .then(data => DirectionsTranslator.translate(data))
               .then(translation => TableCreator.create(translation));
  }
}
