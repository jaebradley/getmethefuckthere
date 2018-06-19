import emoji from 'node-emoji';

const TravelMode = Object.freeze({
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

export default TravelMode;
