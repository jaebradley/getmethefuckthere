import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import VehicleIdentifier from '../src/services/VehicleIdentifier';
import Vehicle from '../src/data/Vehicle';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Test Vehicle Identifier', () => {
  it('should identify vehicle', () => {
    expect(new VehicleIdentifier().identify('bUs')).to.eql(Vehicle.BUS);
  });

  it('should throw for invalid travel mode', () => {
    expect(() => new VehicleIdentifier().identify('foo')).to.throw(TypeError);
  });

  it('should throw for invalid input type', () => {
    expect(() => new VehicleIdentifier().identify(1)).to.throw(TypeError);
  });
});
