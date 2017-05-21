import { Enum } from 'enumify';
import emoji from 'node-emoji';

export default class TravelMode extends Enum {}

TravelMode.initEnum({
  DRIVING: {
    value: 'driving',
    emoji: emoji.get('car'),
  },
  WALKING: {
    value: 'walking',
    emoji: emoji.get('walking'),
  },
  BICYCLING: {
    value: 'bicycling',
    emoji: emoji.get('bicyclist'),
  },
  TRANSIT: {
    value: 'transit',
    emoji: emoji.get('metro'),
  },
});
