import { List } from 'immutable';


export default class TransitDetailsRowsCreator {
  getRows(transitDetails) {
    return List.of(this.getRidingRow(transitDetails), this.getDepartingRow(transitDetails));
  }

  getRidingRow(transitDetails) {
    return this.getRow(this.getRidingContent(transitDetails));
  }

  getDepartingRow(transitDetails) {
    return this.getRow(this.getDepartingContent(transitDetails));
  }

  getRidingContent(transitDetails) {
    return `Riding ${transitDetails.stopCount} stops on the ${transitDetails.line.name} ${transitDetails.line.vehicle.emoji}`;
  }

  getDepartingContent(transitDetails) {
    return `Departing ${transitDetails.departure.name} at ${transitDetails.departure.arrival.value} and arriving at ${transitDetails.arrival.name} at ${transitDetails.arrival.arrival.value}`
  }

  getRow(content) {
    return {
      content: content,
      colSpan: 5,
      hAlign: 'center'
    };
  }
}
