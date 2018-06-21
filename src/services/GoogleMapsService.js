class GoogleMapsService {
  constructor(googleMapsClient) {
    this.googleMapsClient = googleMapsClient;
  }

  getDirections(query) {
    const { json } = await this.googleMapsClient.directions(query).asPromise();
    return json;
  }

  getGeocode(address) {
    const { json } = await this.googleMapsClient.geocode({ address }).asPromise();
    return json;
  }
};

export default GoogleMapsService
