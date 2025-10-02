interface Config {
  service_name: string;
  port: number;
  node_env: string;
  log_level: string;
  default_timeout: number;
  rate_limit_window: number;
  rate_limit_max_requests: number;
  auth_service_url: string;
}

const config: Config = {
  service_name: require('../../package.json').name,
  port: Number(process.env.PORT) || 8080,
  node_env: process.env.NODE_ENV || 'development',
  log_level: process.env.LOG_LEVEL || 'debug',
  default_timeout: Number(process.env.DEFAULT_TIMEOUT) || 3000,
  rate_limit_window: Number(process.env.RATE_LIMIT_WINDOW),
  rate_limit_max_requests: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
  auth_service_url: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
};

export default config;
