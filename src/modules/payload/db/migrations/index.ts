import * as migration_20250703_095301_init from './20250703_095301_init';
import * as migration_20250703_145016 from './20250703_145016';
import * as migration_20250707_141106 from './20250707_141106';
import * as migration_20250708_100331 from './20250708_100331';
import * as migration_20250709_150306 from './20250709_150306';
import * as migration_20250723_152246 from './20250723_152246';
import * as migration_20251204_141659 from './20251204_141659';
import * as migration_20260119_134006 from './20260119_134006';
import * as migration_20260119_135318 from './20260119_135318';
import * as migration_20260119_140942 from './20260119_140942';

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
    name: '20250709_150306',
  },
  {
    up: migration_20250723_152246.up,
    down: migration_20250723_152246.down,
    name: '20250723_152246',
  },
  {
    up: migration_20251204_141659.up,
    down: migration_20251204_141659.down,
    name: '20251204_141659',
  },
  {
    up: migration_20260119_134006.up,
    down: migration_20260119_134006.down,
    name: '20260119_134006',
  },
  {
    up: migration_20260119_135318.up,
    down: migration_20260119_135318.down,
    name: '20260119_135318',
  },
  {
    up: migration_20260119_140942.up,
    down: migration_20260119_140942.down,
    name: '20260119_140942'
  },
];
