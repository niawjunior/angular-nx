import {
  EApiEndpoint,
  EEnvironment,
  IEnvironmentConfig,
} from '../app-config-model';

const name = EEnvironment.local;

export const environment: IEnvironmentConfig = {
  backendUrl: EApiEndpoint[name],
  production: false,
};
