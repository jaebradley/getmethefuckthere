import { List } from "immutable";

import Line from "../../data/Line";
import VehicleIdentifier from '../VehicleIdentifier';

export default class TransitLineDetailsTranslator {
  constructor(vehicleIdentifier) {
    this.vehicleIdentifier = vehicleIdentifier;
  }

  translate(lineDetails) {
    return new Line({
      name: this.getLineName(lineDetails),
      agencies: this.getAgencyNames(lineDetails),
      vehicle: this.getVehicle(lineDetails)
    });
  }

  getLineName(lineDetails) {
    if ("name" in lineDetails) {
      return lineDetails.name;
    }

    return lineDetails.short_name;
  }

  getAgencyNames(lineDetails) {
    return Line(lineDetails.agencies.map(agency => agency.name));
  }

  getVehicle(lineDetails) {
    return this.vehicleIdentifier.identify(lineDetails.vehicle.type);
  }
}
