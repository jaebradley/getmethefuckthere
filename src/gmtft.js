#!/usr/bin/env node

/* eslint no-console: 0 */

import execute from '..';

try {
  execute()
    .catch((e) => {
      console.log('Unable to get you the fuck there');
      console.log(e);
    });
} catch (e) {
  console.log('Unable to get you the fuck there');
  console.log(e);
}
