import configs from "../config/index.js";
const services = configs.serviceRegistry;

export function getServiceUrl(serviceName) {
    const key = serviceName.trim();
    const serviceUrl = services[key];
    if (!serviceUrl) {
        // logger?.error(`Service "${serviceName}" URL not found in the registry configuration.`);
        return null;
    }
    return serviceUrl;
}

export function getAllServices() {
    return { ...services };
}
