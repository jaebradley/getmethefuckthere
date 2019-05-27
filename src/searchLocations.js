function parseLocations(locations) {
  return locations.map((location) => {
    const {
      geometry,
      formatted_address: formattedAddress,
    } = location;
    const parsedLocation = {
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
      formattedAddress,
    };
    return parsedLocation;
  });
}

export default async function searchLocations({ input, locationsSearcher }) {
  const searchResults = await locationsSearcher.searchLocations(input);
  return parseLocations(searchResults.results);
}
