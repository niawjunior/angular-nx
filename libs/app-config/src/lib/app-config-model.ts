export enum EApiEndpoint {
  local = 'http://localhost:8080',
  dev = 'https://api.bts.dev-ops.cloud',
  uat = 'https://api.bts.dev-ops.cloud',
  prd = 'https://api.bts.dev-ops.cloud',
}

export enum EEnvironment {
  local = 'local',
  dev = 'dev',
  uat = 'uat',
  prd = 'prd',
}

export interface IEnvironmentConfig {
  backendUrl: EApiEndpoint;
  production: boolean;
}

export enum EDefaultData {
  // Default debounce 500 ms
  DEBOUNCE = 500,
  PAGE_SIZE = 10,
  LIMIT = 20,
}

export enum EFormMode {
  CREATE = 'create',
  UPDATE = 'update',
}
