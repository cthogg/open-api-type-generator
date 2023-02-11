import { createZodFetchersFromEndpoints } from "../adapters/zodFetch/zodFetch";
import { endpoints } from "./endpoints";

const fetchers = createZodFetchersFromEndpoints(endpoints);

export { fetchers };
