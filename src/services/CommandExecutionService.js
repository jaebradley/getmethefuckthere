'use es6';

import DirectionsService from './DirectionsService';
import DirectionsTranslator from './translators/DirectionsTranslator';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
  }

  getDirections() {
    return this.directionsService
               .fetch(search)
               .then(data => DirectionsTranslator.translate(data));
  }
}
