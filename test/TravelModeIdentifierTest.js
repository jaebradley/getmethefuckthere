import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import TravelModeIdentifier from '../src/services/TravelModeIdentifier';
import TravelMode from '../src/data/TravelMode';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Test Travel Mode Identifier', () => {
  it('should identify travel mode', () => {
    expect(new TravelModeIdentifier().identify('dRivIng')).to.eql(TravelMode.DRIVING);
  });

  it('should throw for invalid travel mode', () => {
    expect(() => new TravelModeIdentifier().identify('foo')).to.throw(TypeError);
  });

  it('should throw for invalid input type', () => {
    expect(() => new TravelModeIdentifier().identify(1)).to.throw(TypeError);
  });
});
