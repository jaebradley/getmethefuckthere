'use es6';

import {List} from 'immutable';

import Table from 'cli-table2';

import Line from '../data/Line';
import TransitDetails from '../data/TransitDetails';

export default class TableCreator {
  static create(routes) {
    return List(routes.map(route => TableCreator.createRouteTable(route)));
  }

  static createRouteTable(route) {
    let table = new Table();

    route.legs.forEach(leg => TableCreator.createLegRow(table, leg));

    if (route.summary !== "") {
      table.push([
        {
          content: route.summary,
          colSpan: 5,
          hAlign: 'center'
        }
      ]);
    }

    if (!route.warnings.isEmpty()) {
      table.push([
        {
          content: 'Warnings',
          colSpan: 1,
          hAlign: 'center'
        },
        {
          content: route.warnings.toJS().toString(),
          colSpan: 4,
          hAlign: 'center'
        }
      ]);
    }

    return table.toString();
  }

  static createLegRow(table, leg) {
    table.push([
      {
        content: `From ${leg.start} to ${leg.end} taking ${leg.duration} over ${leg.distance}`,
        colSpan: 5,
        hAlign: 'center'
      }
    ]);

    if ((leg.departureTime instanceof Time) && (leg.arrivalTime instanceof Time)) {
      table.push([
        {
          content: `Departing at ${leg.departureTime.value} and arriving at ${leg.arrivalTime.value}`,
          colSpan: 5
        }
      ])
    }

    for (let i = 0; i < leg.steps.size; i++) {
      TableCreator.createStepRow(table, leg.steps.get(i), i);
    }
  }

  static createStepRow(table, step, index) {
    table.push([
      {
        content: `Step #${index + 1}`,
        colSpan: 1,
        hAlign: 'center'
      },
      {
        content: step.distance,
        colSpan: 1,
        hAlign: 'center'
      },
      {
        content: step.duration,
        colSpan: 1,
        hAlign: 'center'
      },
      {
        content: step.instructions,
        colSpan: 1,
        hAlign: 'center'
      },
      {
        content: step.mode.emoji,
        colSpan: 1,
        hAlign: 'center'
      }
    ]);

    if (step.transitDetails instanceof TransitDetails) {
      table.push(
        [
          `Riding ${step.transitDetails.stopCount} stops on the ${step.transitDetails.line.name} ${step.transitDetails.line.vehicle.emoji}`
        ],
        [
          `Departing ${step.transitDetails.departure.name} at ${step.transitDetails.departure.arrival.value} and arriving at ${step.transitDetails.arrival.name} at ${step.transitDetails.arrival.arrival.value}`
        ]
      )
    }
  }
}
