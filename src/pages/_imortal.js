import React from "react";
import VideoPlayer from "../../components/VideoPlayer";

import "../app.styles.scss";

import { getVideoJsConfig } from "../../mock";


const VideoPlayerOptions = getVideoJsConfig({imortal: !0});
console.log("VideoPlayerOptions are : ", VideoPlayerOptions);

const App = () => {
  const playerRef = React.useRef(null);

  const handlePlayerReady = ({ videojs }) => {
    playerRef.current = videojs;

    // configSubtitile(videojs);

    // you can handle player events here
    videojs.on("waiting", () => {
      console.log("player is waiting");
    });

    videojs.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VideoPlayer options={VideoPlayerOptions} onReady={handlePlayerReady} />
      
    </div>
  );
};

export default App;
