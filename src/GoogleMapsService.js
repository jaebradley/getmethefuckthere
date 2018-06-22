
import GoogleMapsClient from '@google/maps';

class GoogleMapsService {
  constructor({ directionsAPIKey, geocodeAPIKey }) {
    this.directionsAPIClient = GoogleMapsClient.createClient({
      key: directionsAPIKey,
      Promise,
    });
    this.geocodeAPIClient = GoogleMapsClient.createClient({
      key: geocodeAPIKey,
      Promise,
    });
  }

  // https://developers.google.com/maps/documentation/directions/intro
  async getDirections({
    destination,
    origin,
    travelMode,
  }) {
    const query = {
      destination,
      origin,
      mode: travelMode.value,
    };

    const { json } = await this.directionsAPIClient.directions(query).asPromise();
    return json;
  }

  async getGeocode(address) {
    const { json } = await this.geocodeAPIClient.geocode({ address }).asPromise();
    return json;
  }
};

export default GoogleMapsService
