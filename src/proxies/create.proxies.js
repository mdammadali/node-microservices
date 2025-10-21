import { createProxyMiddleware } from 'http-proxy-middleware';

export const createServiceProxy = ({ pathPrefix, target, rewritePath }) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${pathPrefix}`]: rewritePath
        }
    });
};
