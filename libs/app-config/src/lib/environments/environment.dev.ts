import {
  EApiEndpoint,
  EEnvironment,
  IEnvironmentConfig,
} from '../app-config-model';

const name = EEnvironment.dev;

export const environment: IEnvironmentConfig = {
  backendUrl: EApiEndpoint[name],
  production: false,
};
