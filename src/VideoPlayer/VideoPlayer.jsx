import React, { useEffect, useRef, useState } from "react";
import { videosData } from "./data";
import PlayList from "./PlayList";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const [videoData, setVideoData] = useState([]);
  const [currentVideoData, setCurrentVideoData] = useState({
    index: 0,
    info: videosData[0],
  });
  useEffect(() => {
    setVideoData(videosData);
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const [showFullText, setShowFullText] = useState(false);
  let maxLength = 150;

  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="h-v w-screen">
      <div className="w-full flex justify-center">
        <h1 className="text-2xl font-bold">Video Player App</h1>
      </div>
      <div className="h-full w-full md:grid md:gap-4 md:grid-cols-2 md:grid-rows-1 lg:grid lg:gap-4 lg:grid-cols-2 lg:grid-rows-1 p-3 xl:grid xl:gap-4 xl:grid-cols-31 xl:grid-rows-1">
        <div className="md:col-span-1">
          <video
            src={currentVideoData?.info?.sources}
            controls
            autoPlay
            width={"99%"}
            // height={"700px"}
            ref={videoRef}
            onPlay={(e, x) => {
              console.log("playingVideosssss", e, x);
              setVideoData((prev) => {
                let temp = [...prev];
                let idx = currentVideoData?.index;
                let tempObj = {
                  ...temp[idx],
                  playStatus: temp[idx]?.playStatus
                    ? temp[idx]?.playStatus
                    : !temp[idx]?.playStatus,
                };
                temp[idx] = tempObj;
                return temp;
              });
            }}
            onPause={(e, x) => {
              console.log("playingVideosssss", e, x);
              setVideoData((prev) => {
                let temp = [...prev];
                let idx = currentVideoData?.index;
                let tempObj = {
                  ...temp[idx],
                  playStatus: temp[idx]?.playStatus
                    ? !temp[idx]?.playStatus
                    : temp[idx]?.playStatus,
                };
                temp[idx] = tempObj;
                return temp;
              });
            }}
          />

          <div className="rounded-md bg-slate-200 p-6 mt-2 text-start w-description">
            <h3
              className={`text-gray-600 ${showFullText ? "" : "truncate"}`}
              style={{ maxWidth: "100%" }}
            >
              {showFullText
                ? currentVideoData?.info?.description
                : `${currentVideoData?.info?.description?.slice(0, maxLength)}${
                    currentVideoData?.info?.description?.length > maxLength
                      ? "..."
                      : ""
                  }`}
              {currentVideoData?.info?.description?.length > maxLength && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleFullText}
                >
                  {showFullText ? " Less" : " More"}
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="md:col-span-0">
          <PlayList
            data={videoData}
            setData={setVideoData}
            setCurrentVideoData={setCurrentVideoData}
            currentVideoData={currentVideoData}
            togglePlayPause={togglePlayPause}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
