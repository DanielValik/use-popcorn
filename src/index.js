import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import StarRating from "./components-api/StarRating";
import TextExpander from "./components-api/TextExpander";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating messages={["Terrible", "Bad", "Ok", "Good", "Exelent"]} /> */}

    <TextExpander
      collapsedNumWords={20}
      expandButtonText="Show text"
      collapseButtonText="Collapse text"
      buttonColor="#ff6622"
      expanded={true}
      className="box-expander"
    >
      Space travel requires some seriously amazing technology and collaboration
      between countries, private companies, and international space
      organizations. And while it's not always easy (or cheap), the results are
      out of this world. Think about the first time humans stepped foot on the
      moon or when rovers were sent to roam around on Mars.
    </TextExpander>
  </React.StrictMode>
);
