import React, { useState } from "react";
import nationContext from "./nationContext.js";

const NationContextProvider = ({ children }) => {
  const [nation, setNation] = useState(null);

  return (
    <nationContext.Provider value={{ nation, setNation }}>
      {children}
    </nationContext.Provider>
  );
};

export default NationContextProvider;