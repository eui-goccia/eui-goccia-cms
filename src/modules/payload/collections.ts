import type { CollectionConfig } from 'payload';
import { Authors } from '../authors/collection';
import { Events } from '../events/collection';
import { Posts } from '../posts/collection';
import { Resources } from '../resources/collection';
import { Audio } from '../storage/collections/Audio';
import { Images } from '../storage/collections/Images';
import { Tags } from '../tags/collection';
import { Users } from '../users/collection';

export const collections: CollectionConfig[] = [
	Audio,
	Images,
	Users,
	Posts,
	Events,
	Authors,
	Tags,
	Resources,
];
