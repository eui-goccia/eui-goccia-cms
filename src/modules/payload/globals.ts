import type { GlobalConfig } from 'payload';
import { About } from '../settings/about';
import { Goccia } from '../settings/goccia';
import { Home } from '../settings/home';
import { Project } from '../settings/project';

export const globals: GlobalConfig[] = [Home, Project, Goccia, About];
