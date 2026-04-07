import * as migration_20260401_121108 from './20260401_121108';
import * as migration_20260401_162953_add_booking_label from './20260401_162953_add_booking_label';

export const migrations = [
  {
    up: migration_20260401_121108.up,
    down: migration_20260401_121108.down,
    name: '20260401_121108',
  },
  {
    up: migration_20260401_162953_add_booking_label.up,
    down: migration_20260401_162953_add_booking_label.down,
    name: '20260401_162953_add_booking_label'
  },
];
