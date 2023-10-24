import dotenv from 'dotenv';

import {
  featureToggleDev,
  featureToggleProd,
  featureToggleQA,
} from './feature-toggle';
dotenv.config();

type EnvironmentData = {
  appName: string;
  envName: string;
  hotjarAmbienteID: number;
  versions: Record<string, any>;
  featureToggle: Record<string, boolean>;
};

const enviromentInfo = {
  appName: 'Network',
  versions: {
    app: process.env.version,
  },
};

const dev: EnvironmentData = {
  envName: 'development',
  appName: enviromentInfo.appName,
  versions: enviromentInfo.versions,
  hotjarAmbienteID: 0,
  featureToggle: featureToggleDev,
};

const qa: EnvironmentData = {
  envName: 'test',
  appName: enviromentInfo.appName,
  versions: enviromentInfo.versions,
  hotjarAmbienteID: 0,
  featureToggle: featureToggleQA,
};

const prod: EnvironmentData = {
  envName: 'production',
  appName: enviromentInfo.appName,
  versions: enviromentInfo.versions,
  hotjarAmbienteID: 0,
  featureToggle: featureToggleProd,
};

export const environment = (): EnvironmentData => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prod;
    case 'test':
      return qa;
    default:
      return dev;
  }
};

export const featureToggle = environment()?.featureToggle;
