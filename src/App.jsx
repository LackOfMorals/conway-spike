import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { client } from "./utils/api/graphqlClient.jsx";

// We need to include the base CSS in the root of
// the app so all of our components can inherit the styles
import "./index.css";

import Main from "./components/main/main.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  </StrictMode>
);
