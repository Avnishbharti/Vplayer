import { Icon } from "@iconify/react";
import React, { useRef } from "react";

const PlayList = (props) => {
  const {
    data,
    setCurrentVideoData,
    currentVideoData,
    setData,
    togglePlayPause,
  } = props;
  const containerRef = useRef();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = (e) => {
    console.log("dragagfayfayta end", e, dragItem, dragOverItem);
    let tempData = [...data];
    const draggedItemContent = tempData.splice(dragItem.current, 1)[0];
    tempData.splice(dragOverItem.current, 0, draggedItemContent);
    console.log("draggedDtaata", dragItem.current, dragOverItem.current);
    if (currentVideoData?.index === dragItem.current) {
      setCurrentVideoData((prev) => ({ ...prev, index: dragOverItem.current }));
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setData(tempData);
  };

  return (
    <div
      ref={containerRef}
      className="h-mh md:h-full max-h-full overflow-auto w-full max-w-full flex gap-2 flex-col px-8 py-3"
    >
      {data?.map((item, idx) => {
        return (
          <div
            className="flex justify-between items-center px-4 py-6 cursor-pointer rounded-md shadow-card hover:bg-gray-300 "
            key={idx}
            style={{
              background: currentVideoData?.index === idx ? "#ccffff" : null,
            }}
            onClick={() => {
              setCurrentVideoData({ index: idx, info: item });
            }}
            draggable={true}
            onDragStart={(e) => {
              console.log("dragagfayfayta start", e);
              return (dragItem.current = idx);
            }}
            onDragEnter={(e) => {
              console.log("dragagfayfayta enter", e);
              return (dragOverItem.current = idx);
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-3">
              <h2 className="text-black-400 text-lg">{idx + 1}</h2>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvqzfNJ2P74SYkL42GG7D3Hfxrl5fEX8xH-SkWgiJag&s"
                height={20}
                width={20}
                alt="videos"
              />
              <div>
                <h2 className="text-black-400 text-lg">{item?.title}</h2>
                <h3 className="text-black-200 text-xs">{item?.subtitle}</h3>
              </div>
            </div>
            <div className="flex gap-2">
              {item?.playStatus ? (
                <Icon
                  icon="fluent:pause-24-regular"
                  onClick={() => {
                    togglePlayPause();
                    setData((prev) => {
                      let temp = [...prev];
                      let tempObj = {
                        ...temp[idx],
                        playStatus: !temp[idx]?.playStatus,
                      };
                      temp[idx] = tempObj;
                      return temp;
                    });
                    setCurrentVideoData((prev) => ({
                      ...prev,
                      index: idx,
                      info: { ...prev?.info, playStatus: !prev?.playStatus },
                    }));
                  }}
                />
              ) : (
                <Icon
                  icon="fluent:play-24-regular"
                  onClick={() => {
                    togglePlayPause();
                    setData((prev) => {
                      let temp = [...prev];
                      let tempObj = {
                        ...temp[idx],
                        playStatus: !temp[idx]?.playStatus,
                      };
                      temp[idx] = tempObj;
                      return temp;
                    });
                    setCurrentVideoData((prev) => ({
                      ...prev,
                      index: idx,
                      info: { ...prev?.info, playStatus: !prev?.playStatus },
                    }));
                  }}
                />
              )}

              <Icon
                icon="fluent:re-order-dots-vertical-20-regular"
                className="cursor-move"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayList;
