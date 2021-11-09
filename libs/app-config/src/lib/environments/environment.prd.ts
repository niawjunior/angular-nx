import {
  EApiEndpoint,
  EEnvironment,
  IEnvironmentConfig,
} from '../app-config-model';

const name = EEnvironment.prd;

export const environment: IEnvironmentConfig = {
  backendUrl: EApiEndpoint[name],
  production: true,
};
