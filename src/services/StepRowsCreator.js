import { List } from 'immutable';

import TransitDetails from '../data/TransitDetails';
import TransitDetailsRowsCreator from './TransitDetailsRowsCreator';

export default class StepRowsCreator {
  constructor() {
    this.transitDetailsRowsCreator = new TransitDetailsRowsCreator();
  }

  create(step, index, steps) {
    const rows = List.of(this.getStepRow(step, index));
    if (step.transitDetails instanceof TransitDetails) {
      return rows.concat(this.transitDetailsRowsCreator.getRows(step.transitDetails));
    }
    return rows;
  }

  getStepRow(step, index) {
    return List.of(
      this.getCell(`Step #${index + 1}`),
      this.getCell(step.distance),
      this.getCell(step.duration),
      this.getCell(step.instructions),
      this.getCell(step.mode.emoji)
    );
  }

  getCell(content) {
    return {
      content: content,
      colSpan: 1,
      hAlign: 'center'
    };
  }
}
