import * as http from "http";

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Check for the /artists endpoint
  if (req.url === "/artists") {
    // Set the response headers
    res.setHeader("Content-Type", "application/json");

    // Create the response object based on the OpenAPI spec
    const response = {
      artist_name: "Example Artist",
      artist_genre: "Example Genre",
      albums_recorded: 10,
      username: "example_user",
    };

    // Send the response
    res.statusCode = 200;
    res.end(JSON.stringify(response));
  } else {
    // Return a 404 error for any other endpoint
    res.statusCode = 404;
    res.end();
  }
});

const port = 8088;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
