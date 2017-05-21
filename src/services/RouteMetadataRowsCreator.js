import { List, Map } from 'immutable';

export default class RouteMetadataRowsCreator {
  create(route) {
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
      Map({
        content: metadataField,
        colSpan: 1,
        hAlign: 'center',
      }),
      Map({
        content: metadataContent,
        colSpan: 4,
        hAlign: 'center',
      }),
    );
  }
}
