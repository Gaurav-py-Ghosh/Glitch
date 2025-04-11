import React, { useEffect, useState } from "react";
import Planets from "./components/Planets";

import Home from "./mobile/Home/Home";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? <Home/> : <Planets />}
    </div>
  );
};

export default App;
