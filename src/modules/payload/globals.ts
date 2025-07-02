import type { GlobalConfig } from 'payload';
import { About } from '../settings/about';
import { Goccia } from '../settings/goccia';
import { Project } from '../settings/project';

export const globals: GlobalConfig[] = [Project, Goccia, About];
