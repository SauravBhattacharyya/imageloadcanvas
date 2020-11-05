import React, { useEffect, useState } from "react";
import CanvasFreeDrawing from "canvas-free-drawing";

const App = () => {
  const [cfd, setCfd] = useState(null);

  useEffect(() => {
    setCfd(
      new CanvasFreeDrawing({
        elementId: "canvasDraw",
        width: 500,
        height: 500,
      })
    );
  }, []);

  return (
    <div>
      <canvas id="canvasDraw"></canvas>
    </div>
  );
};

export default App;
