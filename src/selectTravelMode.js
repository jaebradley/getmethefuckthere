import {
  AutoComplete,
} from 'enquirer';

import { TRAVEL_MODE } from './constants';

const getTravelModeKey = mode => `${mode.emoji}   (${mode.value})`;

const choices = Object.values(TRAVEL_MODE).map(mode => ({
  message: getTravelModeKey(mode),
  name: getTravelModeKey(mode),
  value: mode.value,
}));

export default function selectTravelMode({ message }) {
  return new AutoComplete({
    name: 'travelMode',
    message,
    choices,
  });
}
