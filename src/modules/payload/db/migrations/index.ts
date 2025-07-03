import * as migration_20250703_095301_init from './20250703_095301_init';

export const migrations = [
  {
    up: migration_20250703_095301_init.up,
    down: migration_20250703_095301_init.down,
    name: '20250703_095301_init'
  },
];
