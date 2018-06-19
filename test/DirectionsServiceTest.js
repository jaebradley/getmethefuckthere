import DirectionsService from '../src/services/DirectionsService';

describe('Test Directions Service', () => {
  const service = new DirectionsService();
  const destination = 'Harvard Square Cambridge MA';
  const origin = '25 First Street Cambridge MA';
  const defaultSearch = {
    destination,
    origin,
  };

  it('should return directions', () => {
    service.fetch(defaultSearch)
           .then(data => console.log(JSON.stringify(data)));
  });
});
