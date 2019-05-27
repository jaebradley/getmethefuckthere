import {
  AutoComplete,
} from 'enquirer';
import debounce from 'lodash.debounce';

import {
  GEOCODE_API_KEY,
} from './constants';
import createLocationsSearcher from './createLocationsSearcher';
import searchLocations from './searchLocations';

const searcher = createLocationsSearcher(GEOCODE_API_KEY);
const debouncedSearchLocations = debounce(searchLocations, 500, { leading: false, trailing: true });

async function generateSuggestions(input) {
  const results = await debouncedSearchLocations({ input, locationsSearcher: searcher });
  if (results && results.length > 0) {
    return results.map(location => ({
      name: location.formattedAddress,
      message: location.formattedAddress,
      value: location.formattedAddress,
      location,
    }));
  }
  return [];
}

export default function selectLocation({ message }) {
  return new AutoComplete({
    name: 'location',
    limit: 5,
    choices: [],
    message,
    suggest: generateSuggestions,
    // override the default behavior of using number keys
    // to select choices, so the user can enter a value for "address"
    number(...args) {
      return this.append(...args);
    },
    // this will return the entire choice object
    result(value) {
      return this.choices.find(choice => choice.name === value);
    },
  });
}
