import { z } from "zod";
import { Endpoint } from "../lexer/types";

export const endpoints: Endpoint[] = [
  {
    endpoint: "GET /artists",
    responseBody: z.object({
      artist_name: z.string(),
      artist_genre: z.string(),
      albums_recorded: z.number(),
      username: z.string(),
    }),
  },
];
