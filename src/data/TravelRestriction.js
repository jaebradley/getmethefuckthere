import { Enum } from 'enumify';

export default class TravelRestriction extends Enum {}

TravelRestriction.initEnum({
  TOLLS: {
    value: 'tolls',
  },
  HIGHWAYS: {
    value: 'highways',
  },
  FERRIES: {
    value: 'ferries',
  },
  INDOOR: {
    value: 'indoor',
  },
});
