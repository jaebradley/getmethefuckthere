#!/usr/bin/env node

'use es6';

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService'
import CommandQuery from '../data/CommandQuery';

program.version('0.0.1')
       .option('-t, --travel-mode <mode>', 'specify travel mode')
       .option('-o, --origin <origin>', 'specify origin')
       .option('-d, --destination <destination>', 'specify destination')
       .parse(process.argv);

let service = new CommandExecutionService();
let query = new CommandQuery({
  origin: program.origin,
  destination: program.destination,
  travelMode: program.travelMode
});
service.execute(query);