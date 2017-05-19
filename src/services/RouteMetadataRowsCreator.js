export default class RouteMetadataRowsCreator {
  getRows(route) {
    const rows = new List();
    if (route.summary !== '') {
      rows.push(this.getRow('Summary', route.summary).toJS());
    }

    if (!route.warnings.isEmpty()) {
      rows.push(this.getRow('Warnings', route.warnings.toJS().toString()));
    }

    return rows;
  }

  getRow(startCellContent, endCellContent) {
    return List.of(this.getStartCell(startCellContent),
                   this.getEndCell(endCellContent));
  }

  getStartCell(content) {
    return {
      content: content,
      colSpan: 1,
      hAlign: 'center'
    };
  }

  getEndCell(content) {
    return {
      content: content,
      colSpan: 1,
      hAlign: 'center'
    };
  }
}
