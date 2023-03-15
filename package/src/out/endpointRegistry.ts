import { endpointRegistryTwo } from "./typescriptTypes";

const endpointRegistry = endpointRegistryTwo;

export type EndpointRegistry = typeof endpointRegistryTwo;
export type RegisteredHttpEndpoint = keyof typeof endpointRegistryTwo;
export { endpointRegistry };
