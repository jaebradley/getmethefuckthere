import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import { List } from "immutable";

chai.use(chaiImmutable);

const expect = chai.expect;

import Time from "../src/data/Time";
import Stop from "../src/data/Stop";
import TransitLineDetailsTranslator from "../src/services/translators/TransitStopDetailsTranslator";

describe("Transit Stop Details Translator", () => {
  const translator = new TransitLineDetailsTranslator();

  it("Gets arrival time", () => {
    const expectedArrivalValue = "jae";
    const expectedArrivalTimezone = "baebae";
    const expected = new Time({
      value: expectedArrivalValue,
      timezone: expectedArrivalTimezone
    });
    const stopDetails = {
      text: expectedArrivalValue,
      time_zone: expectedArrivalTimezone
    };
    expect(translator.getArrivalTime(stopDetails)).to.eql(expected);
  });

  it("Translates", () => {
    const expectedArrivalTime = "bar";
    const stubbedGetArrivalTime = sinon.stub(translator, "getArrivalTime").returns(expectedArrivalTime);
    const expectedName = "foo";
    const stopDetails = { name: expectedName };
    const expected = new Stop({
      name: expectedName,
      arrival: expectedArrivalTime
    });
    expect(translator.translate(stopDetails)).to.eql(expected);
  });
});
