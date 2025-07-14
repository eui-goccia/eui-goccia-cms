import { posts_en } from '@/modules/posts/data.en';
import { posts_it } from '@/modules/posts/data.it';
import { about_en } from '@/modules/settings/data/about.en';
import { about_it } from '@/modules/settings/data/about.it';
import { goccia_en } from '@/modules/settings/data/goccia.en';
import { goccia_it } from '@/modules/settings/data/goccia.it';
import { home_en } from '@/modules/settings/data/home.en';
import { home_it } from '@/modules/settings/data/home.it';
import { project_en } from '@/modules/settings/data/project.en';
import { project_it } from '@/modules/settings/data/project.it';
import type { About, Home, LaGoccia, Post, Progetto } from '../payload-types';

export interface LocalizedData {
  posts: Post[];
  goccia: LaGoccia;
  project: Progetto;
  about: About;
  home: Home;
}

export const data: Record<'it' | 'en', LocalizedData> = {
  it: {
    home: home_it,
    goccia: goccia_it,
    project: project_it,
    about: about_it,
    posts: posts_it,
  },
  
  en: {
    home: home_en,
    goccia: goccia_en,
    project: project_en,
    about: about_en,
    posts: posts_en,
  },
};

export const getDataForLocale = (locale: 'it' | 'en'): LocalizedData => {
  return data[locale];
}; 