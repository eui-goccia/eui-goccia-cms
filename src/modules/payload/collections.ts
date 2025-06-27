import type { CollectionConfig } from 'payload';
import { Authors } from '../authors/collection';
import { Posts } from '../posts/collection';
import { Images } from '../storage/collections/Images';
import { Users } from '../users/collection';

export const collections: CollectionConfig[] = [Images, Users, Posts, Authors];
