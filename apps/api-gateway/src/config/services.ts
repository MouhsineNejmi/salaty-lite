import { Application } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import config from '.';
import logger from './logger';
import { ProxyErrorResponse, ServiceConfig } from '../types';

class ServiceProxy {
  private static readonly serviceConfigs: ServiceConfig[] = [
    {
      path: '/api/auth/',
      url: config.auth_service_url,
      pathRewrite: { '^/api/auth/': '' },
      name: 'auth-service',
      timeout: 5000,
    },
  ];

  private static createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.url,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      timeout: service.timeout || config.default_timeout,
      logger: logger,
      on: {
        error: ServiceProxy.handleProxyError,
        proxyReq: ServiceProxy.handleProxyRequest,
        proxyRes: ServiceProxy.handleProxyResponse,
      },
    };
  }

  private static handleProxyError(err: Error, req: any, res: any): void {
    logger.error(`Proxy error for ${req.path}:`, err);

    const error: ProxyErrorResponse = {
      message: 'Service unavailable',
      status: 503,
      timestamp: new Date().toISOString(),
    };

    res.status(error.status).json(error);
  }

  private static handleProxyRequest(proxyReq: any, req: any): void {
    logger.debug(`Proxying request to ${req.path}`);
  }

  private static handleProxyResponse(proxyRes: any, req: any): void {
    logger.debug(`Received response for ${req.path}`);
  }

  public static setupProxy(app: Application): void {
    ServiceProxy.serviceConfigs.forEach((service) => {
      const proxyOptions = ServiceProxy.createProxyOptions(service);
      app.use(service.path, createProxyMiddleware(proxyOptions));
      logger.info(`Configured proxy for ${service.name} at ${service.path}`);
    });
  }
}

export const proxyServices = (app: Application): void => {
  ServiceProxy.setupProxy(app);
};
