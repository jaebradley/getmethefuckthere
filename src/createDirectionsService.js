import GoogleMapsClient from '@google/maps';

export default function createDirectionsService(apiKey) {
  const client = GoogleMapsClient.createClient({
    key: apiKey,
    Promise,
  });

  async function getDirections({
    destination,
    origin,
    travelMode,
  }) {
    const {
      json,
    } = await client.directions({
      destination,
      origin,
      mode: travelMode,
    }).asPromise();
    return json;
  }

  return {
    getDirections,
  };
}
