//AUTOGENERATED FILE - DO NOT EDIT MANUALLY
import { z } from "zod";

const getArtistsDTOSchema = z.object({
  artist_name: z.string(),
  artist_genre: z.string(),
  albums_recorded: z.number(),
  username: z.string(),
});
