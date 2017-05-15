'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import TravelModeIdentifier from '../src/services/TravelModeIdentifier';
import TravelMode from '../src/data/TravelMode';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Travel Mode Identifier', function() {
  it('should identify travel mode', function() {
    expect(new TravelModeIdentifier().identify('dRivIng')).to.eql(TravelMode.DRIVING);
  });

  it('should throw for invalid travel mode', function() {
    expect(() => new TravelModeIdentifier().identify('foo')).to.throw(TypeError);
  });

  it('should throw for invalid input type', function() {
    expect(() => new TravelModeIdentifier().identify(1)).to.throw(TypeError);
  });
});
