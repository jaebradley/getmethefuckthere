import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

class LocationSelector {
  constructor(googleMapsService) {
    this.googleMapsService = googleMapsService;
    this.locations = {};
  }

  parseLocations(locations) {
    const choices = [];
    locations.results.forEach(({ geometry, formatted_address: formattedAddress }) => {
      const location = {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
      };
      this.locations[formattedAddress] = location;
      choices.push({ name: formattedAddress, short: formattedAddress });
    });
    return choices;
  }

  async selectLocation(message) {
    const { location } = await inquirer.prompt([
      {
        message,
        type: 'autocomplete',
        name: 'location',
        validate: value => value.trim().length > 0,
        source: async (_, input) => {
          if (input) {
            const results = await this.googleMapsService.getGeocode(input);
            const locations = this.parseLocations(results);
            return Promise.resolve(locations);
          }

          return Promise.resolve([]);
        },
      },
    ]);
    return this.locations[location];
  }
}

export default LocationSelector;
