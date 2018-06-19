import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';

import GeocodeService from './GeocodeService';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

class LocationSelector {
  constructor() {
    this.geocodeService = new GeocodeService();
    this.locations = {};
  }

  parseLocations(locations) {
    const choices = [];
    locations.results.forEach((result) => {
      const location = {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      };
      this.locations[result.formatted_address] = location;
      choices.push({ name: result.formatted_address, short: result.formatted_address });
    });
    return choices;
  }

  selectLocation(message) {
    return inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'location',
        validate: value => value.trim().length > 0,
        source: (answersSoFar, input) => {
          if (input && input.trim().length > 0) {
            return this.geocodeService
              .fetch(input)
              .then(locations => this.parseLocations(locations));
          }
          return Promise.resolve([]);
        },
        message,
      },
    ]).then(({ location }) => (this.locations[location]));
  }
}

export default LocationSelector;
