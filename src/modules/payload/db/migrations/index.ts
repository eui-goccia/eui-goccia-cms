import * as migration_20250627_104314_init from './20250627_104314_init';
import * as migration_20250627_110122 from './20250627_110122';
import * as migration_20250627_110418 from './20250627_110418';
import * as migration_20250627_114741 from './20250627_114741';
import * as migration_20250627_122058 from './20250627_122058';

export const migrations = [
  {
    up: migration_20250627_104314_init.up,
    down: migration_20250627_104314_init.down,
    name: '20250627_104314_init',
  },
  {
    up: migration_20250627_110122.up,
    down: migration_20250627_110122.down,
    name: '20250627_110122',
  },
  {
    up: migration_20250627_110418.up,
    down: migration_20250627_110418.down,
    name: '20250627_110418',
  },
  {
    up: migration_20250627_114741.up,
    down: migration_20250627_114741.down,
    name: '20250627_114741',
  },
  {
    up: migration_20250627_122058.up,
    down: migration_20250627_122058.down,
    name: '20250627_122058'
  },
];
