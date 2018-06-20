import { List } from 'immutable';

const translatePlaces = ({ results }) => (
  results.map(({ formatted_address: address, geometry, place_id: placeId }) => {
    const {
      lat: latitude,
      lng: longitude,
    } = geometry.location;

    return {
      address,
      location: { latitude, longitude },
      placeId,
    };
  })
);

export default translatePlaces;
