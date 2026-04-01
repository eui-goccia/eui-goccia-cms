import * as migration_20260401_121108 from './20260401_121108';

export const migrations = [
  {
    up: migration_20260401_121108.up,
    down: migration_20260401_121108.down,
    name: '20260401_121108'
  },
];
