import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { client } from "./api/graphqlClient.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

