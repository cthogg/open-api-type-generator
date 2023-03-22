import { useHttpQuery } from "open-api-type-generator";
import "./App.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");

  worker.start();
}

function App() {
  const { data, error, isError, isLoading } = useHttpQuery(
    "GET /artists",
    { retry: 1 }
    // "token"
  );
  console.log(error);
  return (
    <div className="App">
      {isLoading && <p>is loading...</p>}
      <p>
        data is <code>{JSON.stringify(data)}</code>
      </p>
      {isError && (
        <p style={{ color: "red" }}>
          error is {JSON.stringify((error as Error).message, null, 2)}
        </p>
      )}
    </div>
  );
}

export default App;
