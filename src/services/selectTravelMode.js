import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import TravelMode from '../data/TravelMode';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

const getTravelModeKey = mode => `${mode.emoji}   (${mode.value})`;

const formattedTravelModesToValues = Object.freeze({
  [getTravelModeKey(TravelMode.DRIVING)]: TravelMode.DRIVING.value,
  [getTravelModeKey(TravelMode.WALKING)]: TravelMode.WALKING.value,
  [getTravelModeKey(TravelMode.BICYCLING)]: TravelMode.BICYCLING.value,
  [getTravelModeKey(TravelMode.TRANSIT)]: TravelMode.TRANSIT.value,
});

const formattedTravelModes = Object.keys(formattedTravelModesToValues);

const selectTravelMode = () => {
  const { travelMode } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'travelMode',
      message: 'Select your travel mode',
      source: (_, input) => Promise.resolve(fuzzy.filter(input || '', formattedTravelModes).map(match => match.original)),
    }
  ]);
  return formattedTravelModesToValues[travelMode];
}

export default selectTravelMode;
