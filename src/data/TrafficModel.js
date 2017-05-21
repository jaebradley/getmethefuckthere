import { Enum } from 'enumify';

export default class TrafficModel extends Enum {}

TrafficModel.initEnum({
  OPTIMISTIC: {
    value: 'optimistic',
  },
  PESSIMISTIC: {
    value: 'pessimistic',
  },
  BEST_GUESS: {
    value: 'best_guess',
  },
});
