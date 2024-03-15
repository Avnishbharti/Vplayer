import { useState } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <VideoPlayer/>
    </>
  );
}

export default App;
