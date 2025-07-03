import * as migration_20250703_095301_init from './20250703_095301_init';
import * as migration_20250703_145016 from './20250703_145016';

export const migrations = [
  {
    up: migration_20250703_095301_init.up,
    down: migration_20250703_095301_init.down,
    name: '20250703_095301_init',
  },
  {
    up: migration_20250703_145016.up,
    down: migration_20250703_145016.down,
    name: '20250703_145016'
  },
];
