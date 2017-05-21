import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

import { List } from 'immutable';

import Line from '../src/data/Line';
import TransitLineDetailsTranslator from '../src/services/translators/TransitLineDetailsTranslator';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Transit Line Details Translator', () => {
  const vehicleIdentifier = { identify: vehicleType => vehicleType };
  const translator = new TransitLineDetailsTranslator(vehicleIdentifier);

  describe('Get line name', () => {
    it('Use short name', () => {
      const expectedLineName = 'jae';
      const lineDetails = { short_name: expectedLineName };
      expect(translator.getLineName(lineDetails)).to.equal(expectedLineName);
    });

    it('Use name', () => {
      const expectedLineName = 'jaebaebae';
      const lineDetails = { name: expectedLineName };
      expect(translator.getLineName(lineDetails)).to.equal(expectedLineName);
    });
  });

  it('Get agency names', () => {
    const agencies = [
      { name: 'jae' },
      { name: 'baebae' },
    ];
    const lineDetails = { agencies };
    const expected = List.of('jae', 'baebae');
    expect(translator.getAgencyNames(lineDetails)).to.eql(expected);
  });

  it('Get vehicle', () => {
    const vehicleType = 'jaebaebae';
    const lineDetails = {
      vehicle: {
        type: vehicleType,
      },
    };
    expect(translator.getVehicle(lineDetails)).to.eql(vehicleType);
  });

  it('Translates', () => {
    const lineName = 'jae';
    const agencyNames = 'baebae';
    const vehicle = 'foobar';
    const stubbedGetLineName = sinon.stub(translator, 'getLineName').returns(lineName);
    const stubbedGetAgencyNames = sinon.stub(translator, 'getAgencyNames').returns(agencyNames);
    const stubbedGetVehicle = sinon.stub(translator, 'getVehicle').returns(vehicle);
    const expected = new Line({
      name: lineName,
      agencies: agencyNames,
      vehicle,
    });
    expect(translator.translate({})).to.eql(expected);
    stubbedGetLineName.restore();
    stubbedGetAgencyNames.restore();
    stubbedGetVehicle.restore();
  });
});
