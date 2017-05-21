import CommandQuery from '../src/data/CommandQuery';
import CommandExecutionService from '../src/services/CommandExecutionService';

describe('Test Command Execution Service', () => {
  const service = new CommandExecutionService();
  it('should test command execution service', () => {
    const origin = 'Harvard Square Cambridge MA';
    const destination = '25 First Street Cambridge MA';
    const transitQuery = new CommandQuery({
      origin,
      destination,
      travelMode: 'transit',
    });

    service.execute(transitQuery).then(table => console.log(table));

    const drivingQuery = new CommandQuery({
      origin,
      destination,
      travelMode: 'driving',
    });

    service.execute(drivingQuery).then(table => console.log(table));
  });
});
