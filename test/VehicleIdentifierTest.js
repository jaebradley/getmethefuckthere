'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import VehicleIdentifier from '../src/services/VehicleIdentifier';
import Vehicle from '../src/data/Vehicle';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Vehicle Identifier', function() {
  it('should identify vehicle', function() {
    expect(VehicleIdentifier.identify('bUs')).to.eql(Vehicle.BUS);
  });

  it('should throw for invalid travel mode', function() {
    expect(() => VehicleIdentifier.identify('foo')).to.throw(TypeError);
  });

  it('should throw for invalid input type', function() {
    expect(() => VehicleIdentifier.identify(1)).to.throw(TypeError);
  });
});
