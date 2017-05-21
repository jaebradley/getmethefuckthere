import TravelMode from '../data/TravelMode';

export default class TravelModeIdentifier {
  identify(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
    }

    const travelMode = TravelMode.enumValues
                                 .find(enumValue => enumValue.value === value.toLowerCase());

    if (typeof travelMode === 'undefined') {
      throw new TypeError('Unable to identify travel mode');
    }

    return travelMode;
  }
}
