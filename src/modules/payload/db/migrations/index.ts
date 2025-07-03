import * as migration_20250703_001051_init from './20250703_001051_init';

export const migrations = [
  {
    up: migration_20250703_001051_init.up,
    down: migration_20250703_001051_init.down,
    name: '20250703_001051_init'
  },
];
