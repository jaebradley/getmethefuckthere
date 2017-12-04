import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import TravelMode from '../data/TravelMode';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

class TravelModeSelector {
  constructor() {
    this.travelModesByKey = {};
    this.travelModes = [];

    // eslint-disable-next-line no-return-assign
    TravelMode.enumValues.forEach((mode) => {
      const formattedTravelMode = this.getFormattedTravelMode(mode);
      this.travelModesByKey[formattedTravelMode] = mode.value;
      this.travelModes.push(formattedTravelMode);
    });
  }

  getFormattedTravelMode(mode) {
    return `${mode.emoji}   (${mode.value})`;
  }

  selectTravelMode() {
    return inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'travelMode',
        message: 'Select your travel mode',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', this.travelModes).map(match => match.original))
        ),
      },
    ]).then(({ travelMode }) => this.travelModesByKey[travelMode]);
  }

}

export default TravelModeSelector;
