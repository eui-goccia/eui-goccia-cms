import * as migration_20250703_095301_init from './20250703_095301_init';
import * as migration_20250703_145016 from './20250703_145016';
import * as migration_20250707_141106 from './20250707_141106';
import * as migration_20250708_100331 from './20250708_100331';
import * as migration_20250709_150306 from './20250709_150306';

export const migrations = [
  {
    up: migration_20250703_095301_init.up,
    down: migration_20250703_095301_init.down,
    name: '20250703_095301_init',
  },
  {
    up: migration_20250703_145016.up,
    down: migration_20250703_145016.down,
    name: '20250703_145016',
  },
  {
    up: migration_20250707_141106.up,
    down: migration_20250707_141106.down,
    name: '20250707_141106',
  },
  {
    up: migration_20250708_100331.up,
    down: migration_20250708_100331.down,
    name: '20250708_100331',
  },
  {
    up: migration_20250709_150306.up,
    down: migration_20250709_150306.down,
    name: '20250709_150306'
  },
];
