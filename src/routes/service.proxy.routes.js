import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getServiceUrl } from "../services/service.registry.js";

const router = express.Router();
function setupProxy(context, serviceName, requiresAuth = false) {
    console.log('context', context);
    console.log('serviceName', serviceName);
    const targetUrl = getServiceUrl(serviceName);
    console.log('targetUrl', targetUrl);

    if (!targetUrl) {
        console.error(`❌ Proxy setup failed: Service "${serviceName}" not found in service registry.`);
        return; // 🛑 Prevents crashing
    }
    const proxyOptions = {
        target: targetUrl,
        changeOrigin: true,
        logLevel: 'debug',
    }
    const proxyMiddleware = createProxyMiddleware(proxyOptions);
    router.use(context, proxyMiddleware);
}
setupProxy('/api/users', 'userService', true);
export default router;