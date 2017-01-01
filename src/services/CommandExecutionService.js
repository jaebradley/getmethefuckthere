'use es6';

import DirectionsSearch from '../data/DirectionsSearch';
import DirectionsService from './DirectionsService';
import DirectionsTranslator from './translators/DirectionsTranslator';
import TableCreator from './TableCreator';

export default class CommandExecutionService {
  constructor() {
    this.directionsService = new DirectionsService();
  }

  execute(origin, destination, travelMode) {
    let search = CommandExecutionService.buildSearch(origin, destination, travelMode);
    return this.getDirections(search);
  }

  getDirections(search) {
    return this.directionsService
               .fetch(search)
               .then(data => DirectionsTranslator.translate(data))
               .then(translation => TableCreator.create(translation));
  }

  static buildSearch(origin, destination, travelMode) {
    return new DirectionsSearch({
      origin: origin,
      destination: destination,
      travelMode: travelMode
    });
  }
}
