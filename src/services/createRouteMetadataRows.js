const createRouteMetadataRows = ({ summary, warnings }) => {
  const rows = [];

  if (summary.length > 0) {
    rows.push([
      {
        content: 'Summary',
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: summary,
        colSpan: 4,
        hAlign: 'center',
      },
    ]);
  }

  if (warnings.length > 0) {
    rows.push([
      {
        content: 'Warnings',
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: warnings.join(' | '),
        colSpan: 4,
        hAlign: 'center',
      },
    ]);
  }

  return rows;
};

export default createRouteMetadataRows;
