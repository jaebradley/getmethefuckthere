'use es6';

import GoogleMaps from '@google/maps';

export default class DirectionsService {
  constructor() {
    this.client = GoogleMaps.createClient({
      key: 'AIzaSyDDFgQKQ25AmRPvZlZ7rfeVnlouhsnV7iI'
    });
  }

  fetch(origin, destination) {
    return new Promise((resolve, reject) => {
         this.client.directions({ origin: origin, destination: destination },
                               (err, data) => {
             if (err !== null) {
               return reject(err);
             }

             resolve(data.json);
         });
    });
  }
}
