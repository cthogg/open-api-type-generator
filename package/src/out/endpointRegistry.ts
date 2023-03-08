import { endpointRegistry as mockEndpointRegistry } from "../mocks/mockRegistry";

const endpointRegistry = mockEndpointRegistry;

export type EndpointRegistry = typeof mockEndpointRegistry;
export type RegisteredHttpEndpoint = keyof typeof mockEndpointRegistry;
export { endpointRegistry };
