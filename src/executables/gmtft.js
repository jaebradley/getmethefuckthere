#!/usr/bin/env node

'use es6';

import program from 'commander';

import CommandExecutionService from '../CommandExecutionService'

let originValue;
let destinationValue;

program.version('0.0.1');
program.option('-d', '--driving', 'use driving')
       .option('-w', '--walking', 'use walking')
       .option('-b', '--biking', 'use biking')
       .option('-t', '--transit', 'use transit')
       .arguments('<origin> <destination>')
       .action((origin, destination) => {
         originValue = origin;
         destinationValue = destination;
       })
       .parse(process.argv);

let service = new CommandExecutionService();
console.log(program);
console.log(program.driving);
service.execute(originValue, destinationValue, 'DRIVING');
