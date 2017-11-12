#!/usr/bin/env node

import CommandExecutionService from '../services/CommandExecutionService';

try {
  new CommandExecutionService()
    .execute()
    .catch(() => console.log('Unable to fetch directions'));
} catch (e) {
  console.log('Unable to fetch directions');
}
