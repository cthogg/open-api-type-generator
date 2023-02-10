import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetchWithZod = createZodFetcher();

export const fetchZod = () =>
  fetchWithZod(
    // The schema you want to validate with
    z.object({
      hello: z.literal("world"),
    }),
    // Any parameters you would usually pass to fetch
    "https://dummy.restapiexample.com/api/v1/employees"
  ).then((res) => {
    console.log(res);
    //          ^? { hello: string }
  });
