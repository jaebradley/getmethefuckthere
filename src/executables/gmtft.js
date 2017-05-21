#!/usr/bin/env node

'use es6';

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';
import CommandQuery from '../data/CommandQuery';
import TravelMode from '../data/TravelMode';

program.version('0.0.1')
       .option('-t, --travel-mode <mode>', 'specify travel mode')
       .option('-o, --origin <origin>', 'specify origin')
       .option('-d, --destination <destination>', 'specify destination')
       .parse(process.argv);

const service = new CommandExecutionService();

// default travel mode should be driving
const travelModeValue = (typeof program.travelMode === 'undefined')
  ? TravelMode.DRIVING.value
  : program.travelMode;

const query = new CommandQuery({
  origin: program.origin,
  destination: program.destination,
  travelMode: travelModeValue,
});
try {
  service.execute(query);
} catch (Error) {
  console.error('Could not fetch directions');
}
