#!/usr/bin/env node

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
