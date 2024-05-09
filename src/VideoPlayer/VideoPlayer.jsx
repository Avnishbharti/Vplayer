import React, { useEffect, useRef, useState } from "react";
import { videosData } from "./data";
import PlayList from "./PlayList";
import { Icon } from "@iconify/react";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const [videoData, setVideoData] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideoData, setCurrentVideoData] = useState({
    index: 0,
    info: videosData[0],
  });

  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seekPosition, setSeekPosition] = useState(0);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setVideoData(videosData);
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlay(true);
    } else {
      video.pause();
      setIsPlay(false);
    }
  };

  const [showFullText, setShowFullText] = useState(false);
  let maxLength = 150;

  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handlePlaybackRateChange = (e) => {
    const newPlaybackRate = parseFloat(e.target.value);
    console.log("jhddjhfuhdfoueodfobhjk", newPlaybackRate);
    setPlaybackRate(newPlaybackRate);
    videoRef.current.playbackRate = newPlaybackRate;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", () => {
        const newSeekPosition = (video.currentTime / video.duration) * 100;
        setSeekPosition(newSeekPosition);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", () => {});
      }
    };
  }, [videoRef]);

  const handleSeeking = (e) => {
    const newCurrentTime = e.target.value / 100;
    videoRef.current.currentTime = newCurrentTime * videoRef.current.duration;
    setSeekPosition(e.target.value);
  };

  const getFormattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const videoDuration = videoRef.current?.duration;
  const currentVideoTime = videoRef.current?.currentTime;

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [previousWidth, setPreviousWidth] = useState(null);
  const [previousHeight, setPreviousHeight] = useState(null);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      setPreviousWidth(videoRef.current.offsetWidth);
      setPreviousHeight(videoRef.current.offsetHeight);
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isFullScreen) {
        // const videoWidth = videoRef.current.videoWidth;
        // const videoHeight = videoRef.current.videoHeight;
        // const containerWidth = videoRef.current.parentElement.offsetWidth;
        // const containerHeight = videoRef.current.parentElement.offsetHeight;
        // // Calculate optimal scaling based on aspect ratio
        // const widthScale = containerWidth / videoWidth;
        // const heightScale = containerHeight / videoHeight;
        // const scale = Math.min(widthScale, heightScale); // Maintain aspect ratio
        // videoRef.current.style.transform = `scale(${scale})`;
      } else {
        if (previousWidth && previousHeight) {
          videoRef.current.style.transform = `scale(1)`; // Reset scale for non-fullscreen
          videoRef.current.style.width = `${previousWidth}px`; // Set previous width
          videoRef.current.style.height = `${previousHeight}px`; // Set previous height
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isFullScreen, previousWidth, previousHeight]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Ensure case-insensitive search
    setSearchText(searchTerm);
    console.log("sjhgdfidhcvgdshbknj", searchTerm);

    if (searchTerm != "") {
      const filtered = videoData.filter((video) =>
        video.title.toLowerCase().includes(searchTerm)
      );
      setVideoData(filtered);
    } else {
      setVideoData(videosData);
    }
  };

  return (
    <div className="w-full" style={{fontFamily:'sans-serif',fontStyle:'oblique'}}>
      <div className="w-full sticky top-0 bg-white flex justify-center py-3" style={{backgroundColor:'rgb(145 145 145)',color:'#fff'}}>
        <h1 className="text-2xl font-bold">Video Player App</h1>
      </div>
      <div className="lg:grid lg:grid-cols-3 gap-3 px-2" style={{marginTop:'10px'}}>
        <div className="lg:col-span-2">
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
          {/* <div className="w-description flex items-center justify-between p-1 gap-2 bg-slate-300 rounded-b-md">
            <button onClick={togglePlayPause}>
              {isPlay ? (
                <Icon icon="fluent:pause-24-regular" height={30} width={30} />
              ) : (
                <Icon icon="fluent:play-24-regular" height={30} width={30} />
              )}
            </button>

              <div className="">
                <h3 className="text-center text-sm">
                  {getFormattedTime(currentVideoTime)}/
                  {getFormattedTime(videoDuration)}
                </h3>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={seekPosition} 
                onChange={handleSeeking}
                className="ml-4 w-full" 
              />


              <div className="flex gap-1">
                <h4 className="text-center text-sm">volume</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="w-14"
                />
              </div>

              <div className="ml-4 w-40 ">
                <label className="text-sm">speed:</label>
                <select
                  id="playbackRate"
                  className="text-sm"
                  value={playbackRate}
                  onChange={handlePlaybackRateChange}
                >
                  <option className="text-sm" value={0.5}>
                    0.5x
                  </option>
                  <option className="text-sm" value={1} selected>
                    1.0x (Normal)
                  </option>
                  <option className="text-sm" value={1.5}>
                    1.5x
                  </option>
                  <option className="text-sm" value={2}>
                    2.0x
                  </option>
                </select>
              </div>

              <button className="" onClick={toggleFullScreen}>
                <Icon icon="fluent:page-fit-24-regular" height={30} width={30} />
              </button>
              </div> */}

          <div className="rounded-md bg-slate-200 p-3 mt-2 text-start w-description">
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
        <div className="md:col-span-0 flex flex-col items-center">
          <input
            value={searchText}
            onChange={handleSearchChange}
            placeholder="search"
            style={{ border: "1px solid black" }}
            className="w-filter rounded-md h-10  border-1 border-black pl-3 border-solid"
          />
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
