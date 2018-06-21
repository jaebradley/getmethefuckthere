const createRouteMetadataRows = ({ summary, warnings }) => {
  const rows = [];

  if (summary) {
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

  if (warnings) {
    rows.push([
      {
        content: 'Warnings',
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: warnings,
        colSpan: 4,
        hAlign: 'center',
      },
    ]);
  }

  return rows;
};

export default createRouteMetadataRows;
