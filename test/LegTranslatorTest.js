import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';

chai.use(chaiImmutable);

const expect = chai.expect;

import { List } from 'immutable';

import Time from '../src/data/Time';
import Leg from '../src/data/Leg';
import StepTranslator from '../src/services/translators/StepTranslator';
import LegTranslator from '../src/services/translators/LegTranslator';

describe('Leg Translator', () => {
  const translator = new LegTranslator();

  it('Get Steps', () => {
    const expectedStepValue = 'foo';
    const stubbedStepTranslator = sinon.stub(StepTranslator.prototype, 'translate').returns(expectedStepValue);
    const steps = ['step1', 'step2', 'step3'];
    const expected = List.of('foo', 'foo', 'foo');
    expect(translator.getSteps(steps)).to.eql(expected);
    stubbedStepTranslator.restore();
  });

  it('Get Arrival Time', () => {
    const expectedArrivalTimeText = 'jae';
    const expectedArrivalTimeTimeZone = 'baebae';
    const arrivalTime = {
      text: expectedArrivalTimeText,
      time_zone: expectedArrivalTimeTimeZone
    };
    const expected = new Time({
      value: expectedArrivalTimeText,
      timezone: expectedArrivalTimeTimeZone
    });
    expect(translator.getArrivalTime(arrivalTime)).to.eql(expected);
  });

  describe('Translates', () => {

    const distanceText = 'distanceText';
    const durationText = 'durationText';
    const endAddress = 'endAddress';
    const startAddress = 'startAddress';
    const steps = 'steps';
    const arrivalTime = 'arrivalTime';

    it('Without Arrival Time And Departure Time', () => {
      const stubbedGetSteps = sinon.stub(translator, 'getSteps').returns(steps);
      const leg = {
        distance: {
          text: distanceText
        },
        duration: {
          text: durationText
        },
        end_address: endAddress,
        start_address:startAddress,
        steps: steps
      };
      const expected = new Leg({
        distance: distanceText,
        duration: durationText,
        end: endAddress,
        start: startAddress,
        steps: steps
      });
      expect(translator.translate(leg)).to.eql(expected);

      stubbedGetSteps.restore();
    });

    it('With Arrival Time', () => {
      const stubbedGetSteps = sinon.stub(translator, 'getSteps').returns(steps);
      const stubbedGetArrivalTime = sinon.stub(translator, 'getArrivalTime').returns(arrivalTime);
      const leg = {
        distance: {
          text: distanceText
        },
        duration: {
          text: durationText
        },
        end_address: endAddress,
        start_address:startAddress,
        steps: steps,
        arrival_time: arrivalTime
      };
      const expected = new Leg({
        distance: distanceText,
        duration: durationText,
        end: endAddress,
        start: startAddress,
        steps: steps,
        arrivalTime: arrivalTime
      });
      expect(translator.translate(leg)).to.eql(expected);

      stubbedGetSteps.restore();
      stubbedGetArrivalTime.restore();
    });

    it('With Departure Time', () => {
      const stubbedGetSteps = sinon.stub(translator, 'getSteps').returns(steps);
      const stubbedGetArrivalTime = sinon.stub(translator, 'getArrivalTime').returns(arrivalTime);
      const leg = {
        distance: {
          text: distanceText
        },
        duration: {
          text: durationText
        },
        end_address: endAddress,
        start_address:startAddress,
        steps: steps,
        departure_time: arrivalTime
      };
      const expected = new Leg({
        distance: distanceText,
        duration: durationText,
        end: endAddress,
        start: startAddress,
        steps: steps,
        departureTime: arrivalTime
      });
      expect(translator.translate(leg)).to.eql(expected);

      stubbedGetSteps.restore();
      stubbedGetArrivalTime.restore();
    });
  });
});
