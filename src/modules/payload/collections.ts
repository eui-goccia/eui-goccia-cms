import type { CollectionConfig } from 'payload';
import { Authors } from '../authors/collection';
import { Posts } from '../posts/collection';
import { Audio } from '../storage/collections/Audio';
import { Images } from '../storage/collections/Images';
import { Tags } from '../tags/collection';
import { Users } from '../users/collection';

export const collections: CollectionConfig[] = [
	Audio,
	Images,
	Users,
	Posts,
	Authors,
	Tags,
];
