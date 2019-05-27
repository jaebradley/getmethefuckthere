import GoogleMapsClient from '@google/maps';

export default function createLocationsSearcher(apiKey) {
  const client = GoogleMapsClient.createClient({
    key: apiKey,
    Promise,
  });

  async function searchLocations(address) {
    const {
      json,
    } = await client.geocode({ address }).asPromise();
    return json;
  }

  return {
    searchLocations,
  };
}
