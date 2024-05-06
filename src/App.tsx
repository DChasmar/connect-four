import React from "react";
import { ConnectProvider } from "./components/ConnectContext";
import Game from "./components/Game";

const App: React.FC = () => {
  return (
    <ConnectProvider>
      <Game />
    </ConnectProvider>
  );
};

export default App;
