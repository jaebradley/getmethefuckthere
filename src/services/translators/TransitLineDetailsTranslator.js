import { List } from 'immutable';

export default class TransitLineDetailsTranslator {
  constructor(vehicleIdentifier) {
    this.vehicleIdentifier = vehicleIdentifier;
  }

  translate(lineDetails) {
    return {
      name: this.getLineName(lineDetails),
      agencies: this.getAgencyNames(lineDetails),
      vehicle: this.getVehicle(lineDetails),
    };
  }

  getLineName(lineDetails) {
    if ('name' in lineDetails) {
      return lineDetails.name;
    }

    return lineDetails.short_name;
  }

  getAgencyNames(lineDetails) {
    return List(lineDetails.agencies.map(agency => agency.name));
  }

  getVehicle(lineDetails) {
    return this.vehicleIdentifier.identify(lineDetails.vehicle.type);
  }
}
