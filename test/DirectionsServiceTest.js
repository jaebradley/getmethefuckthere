'use es6';

import DirectionsService from '../src/services/DirectionsService';

describe('Test Directions Service', function() {
  let service = new DirectionsService();
  it('should return directions', function() {
    return service.fetch('Harvard Square Cambridge MA', '25 First Street Cambridge MA')
                  .then(data => console.log(data));
  });
});
