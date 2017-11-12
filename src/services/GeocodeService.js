import GoogleMaps from '@google/maps';

export default class GeocodeService {
  constructor() {
    this.client = GoogleMaps.createClient({ key: 'AIzaSyBfyXZ3kDp03V_o7_mak0wxVU4B2Zcl0Ak' });
  }

  fetch(address) {
    return new Promise((resolve, reject) => {
      this.client.geocode({ address }, (err, data) => {
        if (err !== null) {
          return reject(err);
        }
        return resolve(data.json);
      });
    });
  }
}
