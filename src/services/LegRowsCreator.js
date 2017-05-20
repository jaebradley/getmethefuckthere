import { List } from 'immutable';

import Time from '../data/Time';


export default class LegRowsCreator {
  create(leg) {
    let rows = List.of(this.getRow(this.getLegDetailsContent(leg)));
    if ((leg.departureTime instanceof Time) && (leg.arrivalTime instanceof Time)) {
      return rows.push(this.getRow(this.getTimeDetailsContent(leg.departureTime, leg.arrivalTime)));
    }

    return rows;
  }

  getLegDetailsContent(leg) {
    return `From ${leg.start} to ${leg.end} taking ${leg.duration} over ${leg.distance}`;
  }

  getTimeDetailsContent(departureTime, arrivalTime) {
    return `Departing at ${departureTime.value} and arriving at ${arrivalTime.value}`;
  }

  getRow(content) {
    return [{
      content: content,
      colSpan: 5,
      hAlign: 'center'
    }];
  }
}
