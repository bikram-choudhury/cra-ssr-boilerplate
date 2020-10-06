import React from "react";

function Home({ staticContext = {} }) {
  return <div>Learn {staticContext.data}</div>;
}

export default Home;
