import React from "react";

import Layout from "./components/Layout";
import Store from "./components/Store";
import Header from "./components/Header";
function App() {
  return (
    <Layout>
      <Header />
      <Store />
    </Layout>
  );
}

export default App;
