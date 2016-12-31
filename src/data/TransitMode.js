'use es6';

import {Enum} from 'enumify';

export default class TransitMode extends Enum {};

TransitMode.initEnum({
  BUS: {
    value: 'bus'
  },
  SUBWAY: {
    value: 'subway'
  },
  TRAIN: {
    value: 'train'
  },
  TRAM: {
    value: 'tram'
  },
  RAIL: {
    value: 'rail'
  }
});
