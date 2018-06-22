#!/usr/bin/env node

import execute from '../services/execute';

try {
  execute()
    .catch((e) => console.log(e));
} catch (e) {
  console.log('Unable to fetch directions');
}
