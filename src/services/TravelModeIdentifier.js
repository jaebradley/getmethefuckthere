import TravelMode from '../data/TravelMode';

export default class TravelModeIdentifier {
  identify(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
    }

    const travelMode = TravelMode.enumValues
                                 .map(mode => mode.value)
                                 .find(modeValue => value.toLowerCase() === modeValue);

    if (typeof travelMode === 'undefined') {
      throw new TypeError('Unable to identify travel mode');
    }

    return travelMode;
  }
}
