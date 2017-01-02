'use es6';

import CommandQuery from '../src/data/CommandQuery';
import CommandExecutionService from '../src/services/CommandExecutionService';

describe('Test Command Execution Service', function() {
  let service = new CommandExecutionService();
  it('should test command execution service', function() {
    let origin = 'Harvard Square Cambridge MA';
    let destination = '25 First Street Cambridge MA';
    let transitQuery = new CommandQuery({
      origin: origin,
      destination: destination,
      travelMode: 'transit'
    });

    service.execute(transitQuery).then(table => console.log(table));

    let drivingQuery = new CommandQuery({
      origin: origin,
      destination: destination,
      travelMode: 'driving'
    });

    service.execute(drivingQuery).then(table => console.log(table));
  });
});
