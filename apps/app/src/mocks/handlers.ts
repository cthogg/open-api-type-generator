import { rest } from "msw";
import { SHOULD_WORK } from "./getArtistsMocks";

export const handlers = [
  // Match a GET request to a third-party server.
  rest.get("http://localhost:8088/artists", (req, res, ctx) => {
    return res(ctx.json(SHOULD_WORK));
  }),
];
