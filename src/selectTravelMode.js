import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import { TRAVEL_MODE } from './constants';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

const getTravelModeKey = (mode) => `${mode.emoji}   (${mode.value})`;

const formattedTravelModesToValues = Object.freeze({
  [getTravelModeKey(TRAVEL_MODE.DRIVING)]: TRAVEL_MODE.DRIVING,
  [getTravelModeKey(TRAVEL_MODE.WALKING)]: TRAVEL_MODE.WALKING,
  [getTravelModeKey(TRAVEL_MODE.BICYCLING)]: TRAVEL_MODE.BICYCLING,
  [getTravelModeKey(TRAVEL_MODE.TRANSIT)]: TRAVEL_MODE.TRANSIT,
});

const formattedTravelModes = Object.keys(formattedTravelModesToValues);

const selectTravelMode = async () => {
  const { travelMode } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'travelMode',
      message: 'Select your travel mode',
      source: (_, input) => Promise.resolve(fuzzy.filter(input || '', formattedTravelModes).map((match) => match.original)),
    },
  ]);
  return formattedTravelModesToValues[travelMode];
};

export default selectTravelMode;
