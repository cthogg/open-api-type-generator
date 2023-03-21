import { endpointRegistry } from "./typescriptTypes";

export type EndpointRegistry = typeof endpointRegistry;
export type RegisteredHttpEndpoint = keyof typeof endpointRegistry;
export { endpointRegistry };
