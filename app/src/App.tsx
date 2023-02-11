import { GetArtistsDTO } from "open-api-type-generator";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const myType: GetArtistsDTO = {
    albums_recorded: 2,
    artist_genre: "rock",
    artist_name: "The Beatles",
    username: "BB King",
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <pre>
        <code>{JSON.stringify(myType, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
