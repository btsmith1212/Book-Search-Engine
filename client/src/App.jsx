import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Important for API Consumption: Wrap your component tree with the ApolloProvider component to enable access to the ApolloClient from anywhere within the application
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}
export default App;
