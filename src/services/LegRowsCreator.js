export default class LegRowsCreator {
  getRows(leg) {
    let rows = List.of(this.getLegDetailsContent(leg));
    if ((leg.departureTime instanceof Time) && (leg.arrivalTime instanceof Time)) {
      return rows.push(this.getTimeDetailsContent(leg));
    }

    return rows;
  }

  getLegDetailsContent(leg) {
    return `From ${leg.start} to ${leg.end} taking ${leg.duration} over ${leg.distance}`;
  }

  getTimeDetailsContent(leg) {
    return `Departing at ${leg.departureTime.value} and arriving at ${leg.arrivalTime.value}`;
  }

  getRow(content) {
    return {
      content: content,
      colSpan: 5,
      hAlign: 'center'
    };
  }
}
