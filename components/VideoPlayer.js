import React, { useEffect, useRef } from "react";

import classnames from "classnames";
import VJSPlayer from "@filmgardi/phoenix-video-player";

import "@filmgardi/phoenix-video-player/dist/phoenix-video-player.min.css";
import "@filmgardi/videojs-phoenix-theme/dist/videojs-phoenix-theme.css";


const DEFAULT_OPTIONS = {
  autoplay: false,
  controls: true,
  playbackRates: [0.5, 1, 1.25, 1.5, 3],
  // language: "fa",
  // addLanguage: { fa: fa },
  // initPlugins: {
  //   seekButtons,
  //   vttThumbnails
  // },
  // controlBar: { children: ['playToggle'] },
  autofocus: true,
  muted: false,
  // techOrder: ["html5"],
  // flash: {
  //   swf: "/video/video-js.swf",
  //   hls: {
  //     // withCredentials: true
  //   }
  // },
  // techOrder: ["html5"],
  //         hlsjs: {
  //             favorNativeHLS: !0
  //         },
  html5: {
    nativeTextTracks: !1,
    hlsjsConfig: {
      // Put your hls.js config here
    },
  },
  // html5: {
  //   nativeAudioTracks: false,
  //   nativeVideoTracks: false,
  //   nativeTextTracks: false,
  //   vhs: {
  //     overrideNative: true, // add this line
  //     enableLowInitialPlaylist: true,
  //     smoothQualityChange: true,
  //   },
  // },
  preload: "meta",
  aspectratio: null,
  touchnativecontrols: false,
  share: false,
  liveSeekButtons: {
    back: 10,
  },
};

const VideoPlayer = ({ options, onReady = () => {}, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observeVideoProgress = setInterval(() => {
      const video = (videoRef && videoRef.current) || null;

      if (video && !video.paused) {
        const { duration, currentTime } = video;

        props.videoProgress({
          duration,
          currentTime,
        });
      }
    }, 500);

    return () => {
      clearInterval(observeVideoProgress);
    };
  });

  useEffect(() => {
    const playerOptions = Object.assign({}, DEFAULT_OPTIONS, options);

    const player = new VJSPlayer(videoRef.current, playerOptions, (player) => {
      onReady(player);
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  });

  return (
    <div className={classnames("wrapper", props.className)}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={classnames(
            "video-js",
            "vjs-big-play-centered ",
            "fullscreen ",
            "fullScreen-fixed",
            "vjs-fill"
          )}
        />
      </div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  className: "",
  autoplay: false,
  controls: true,
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  poster: "",
  sources: [],
  videoProgress: () => null,
};

export default VideoPlayer;
