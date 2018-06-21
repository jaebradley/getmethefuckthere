import createTransitDetailsRows from './createTransitDetailsRows';

const buildCell = content => ({
  content,
  colSpan: 1,
  hAlign: 'center',
});

const createStepRows = ({ step, index }) => {
  const {
    distance,
    duration,
    instructions,
    mode,
    transitDetails,
  } = step;

  const rows = [
    buildCell(`Step #${index}`),
    buildCell(distance),
    buildCell(duration),
    buildCell(instructions),
    buildCell(mode.emoji),
  ];

  if (transitDetails) {
    rows.concat(createTransitDetailsRows(transitDetails));
  }

  return rows;
};

export default createStepRows;
