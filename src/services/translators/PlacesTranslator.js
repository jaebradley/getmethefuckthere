import { List } from 'immutable';


const translate = data => (
  List(data.results.map((result) => {
    const {
      formatted_address,
      geometry,
      place_id,
    } = result;

    const {
      lat,
      lng,
    } = geometry.location;

    return {
      address: formatted_address,
      location: { latitude: lat, longitude: lng },
      placeId: place_id,
    };
  }))
);

module.exports = {
  translate,
};
