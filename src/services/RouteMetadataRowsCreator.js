import { List } from 'immutable';

export default class RouteMetadataRowsCreator {
  getRows(route) {
    let rows = new List();
    if (route.summary !== '') {
      rows = rows.push(this.getRow('Summary', route.summary));
    }

    if (!route.warnings.isEmpty()) {
      rows = rows.push(this.getRow('Warnings', route.warnings.toJS().toString()));
    }

    return rows;
  }

  getRow(metadataField, metadataContent) {
    return List.of(
      {
        content: metadataField,
        colSpan: 1,
        hAlign: 'center'
      },
      {
        content: metadataContent,
        colSpan: 4,
        hAlign: 'center'
      }
    );
  }
}
