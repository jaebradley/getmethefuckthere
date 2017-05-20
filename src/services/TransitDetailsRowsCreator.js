import { List } from 'immutable';


export default class TransitDetailsRowsCreator {
  getRows(transitDetails) {
    return List.of(this.getLineDetailsRow(transitDetails),
                   this.getStepDetailsRow(transitDetails));
  }

  getLineDetailsRow(transitDetails) {
    return this.getRow(this.getLineDetailsContent(transitDetails));
  }

  getStepDetailsRow(transitDetails) {
    return this.getRow(this.getStepDetailsContent(transitDetails));
  }

  getLineDetailsContent(transitDetails) {
    return `Riding ${transitDetails.stopCount} stops on the ${transitDetails.line.name} ${transitDetails.line.vehicle.emoji}`;
  }

  getStepDetailsContent(transitDetails) {
    return `Departing ${transitDetails.departure.name} at ${transitDetails.departure.arrival.value} and arriving at ${transitDetails.arrival.name} at ${transitDetails.arrival.arrival.value}`
  }

  getRow(content) {
    return [{
      content: content,
      colSpan: 5,
      hAlign: 'center'
    }];
  }
}
