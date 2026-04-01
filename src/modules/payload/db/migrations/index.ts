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
import * as migration_20260204_181859 from './20260204_181859';
import * as migration_20260312_195611 from './20260312_195611';
import * as migration_20260312_215107_add_about_hero_image from './20260312_215107_add_about_hero_image';
import * as migration_20260331_212435_add_events_collection from './20260331_212435_add_events_collection';
import * as migration_20260401_082831_add_events_seo from './20260401_082831_add_events_seo';
import * as migration_20260401_091233_add_event_labels from './20260401_091233_add_event_labels';
import * as migration_20260401_112231_add_event_organizer_links_booking from './20260401_112231_add_event_organizer_links_booking';

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
    name: '20260119_140942',
  },
  {
    up: migration_20260204_181859.up,
    down: migration_20260204_181859.down,
    name: '20260204_181859',
  },
  {
    up: migration_20260312_195611.up,
    down: migration_20260312_195611.down,
    name: '20260312_195611',
  },
  {
    up: migration_20260312_215107_add_about_hero_image.up,
    down: migration_20260312_215107_add_about_hero_image.down,
    name: '20260312_215107_add_about_hero_image',
  },
  {
    up: migration_20260331_212435_add_events_collection.up,
    down: migration_20260331_212435_add_events_collection.down,
    name: '20260331_212435_add_events_collection',
  },
  {
    up: migration_20260401_082831_add_events_seo.up,
    down: migration_20260401_082831_add_events_seo.down,
    name: '20260401_082831_add_events_seo',
  },
  {
    up: migration_20260401_091233_add_event_labels.up,
    down: migration_20260401_091233_add_event_labels.down,
    name: '20260401_091233_add_event_labels',
  },
  {
    up: migration_20260401_112231_add_event_organizer_links_booking.up,
    down: migration_20260401_112231_add_event_organizer_links_booking.down,
    name: '20260401_112231_add_event_organizer_links_booking'
  },
];
