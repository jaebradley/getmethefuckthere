import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

chai.use(chaiImmutable);

const expect = chai.expect;

import { List } from 'immutable';

import Route from '../src/data/Route';
import LegTranslator from '../src/services/translators/LegTranslator';
import RoutesTranslator from '../src/services/translators/RoutesTranslator';

describe('Routes Translator', () => {
  const translator = new RoutesTranslator();

  it('Get Legs', () => {
    const expectedLeg = 'leg';
    const stubbedLegTranslator = sinon.stub(LegTranslator.prototype, 'translate').returns(expectedLeg);
    const legs = ['leg1', 'leg2', 'leg3'];
    const expected = List.of(expectedLeg, expectedLeg, expectedLeg);
    expect(translator.getLegs(legs)).to.eql(expected);
    stubbedLegTranslator.restore();
  });

  it('Get Route', () => {
    const routeSummary = 'routeSummary';
    const warnings = ['warning1', 'warning2'];
    const legs = 'legs';
    const stubbedGetLegs = sinon.stub(translator, 'getLegs').returns(legs);
    const route = {
      summary: routeSummary,
      warnings: warnings,
      legs: legs
    };
    const expected = new Route({
      summary: routeSummary,
      warnings: List(warnings),
      legs: legs
    });
    expect(translator.getRoute(route)).to.eql(expected);
    stubbedGetLegs.restore();
  });

  it('Translate', () => {
    const route = 'route';
    const routes = ['route1', 'route2', 'route3'];
    const stubbedGetRoute = sinon.stub(translator, 'getRoute').returns(route);
    const expected = List.of(route, route, route);
    expect(translator.translate(routes)).to.eql(expected);
    stubbedGetRoute.restore();
  });
});
