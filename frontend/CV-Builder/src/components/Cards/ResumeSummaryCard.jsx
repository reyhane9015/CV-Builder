import React, { useState, useEffect } from "react";
import { getLightColorFormImage } from "../../utils/helper";
import { FiMoreVertical } from "react-icons/fi";
import TitleInput from "../Inputs/TitleInput";

function ResumeSummaryCard({
  imgUrl,
  title,
  lastUpdated,
  onSelect,
  handleDeleteResume,
  handleDuplicateResume,
  handleSaveTitle,
  resumeId,
}) {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotsBtns, setDotsBtns] = useState(false);

  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    if (imgUrl) {
      getLightColorFormImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff");
        });
    }
  }, [imgUrl]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const handleDots = () => {
    setDotsBtns(!dotsBtns);
  };

  return (
    <div
      className="relative h-[450px] flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <div className="group p-4 flex-1 ">
        {imgUrl ? (
          <div className="relative w-full h-[300px] rounded overflow-hidden">
            <img
              src={imgUrl}
              alt=""
              className="w-full h-full object-cover rounded"
            />

            {/* layout */}
            <div
              className="absolute inset-0 bg-gray-100/50 group-hover:bg-transparent bg-opacity-40 group-hover:bg-opacity-0 
                   transition-all duration-300 rounded flex items-center justify-center"
            >
              <button
                className="btn-small hidden group-hover:block"
                onClick={onSelect}
              >
                مشاهده رزمه
              </button>
            </div>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>

      <div className="flex items-center justify-between w-full bg-white p-3">
        <div>
          {/* <h5 className="text-sm font-medium truncate py-2 overflow-hidden whitespace-nowrap">
            {title}
          </h5> */}
          <TitleInput
            title={titleValue}
            setTitle={(newTitle) => {
              setTitleValue(newTitle);
            }}
            onSave={(newTitle) => handleSaveTitle(resumeId, newTitle)}
          />

          <p className="text-xs font-medium text-gray-500 mt-2">
            آخرین بازدید: {lastUpdated}{" "}
          </p>
        </div>

        <button
          onClick={handleDots}
          className="text-gray-500 hover:cursor-pointer hover:bg-gray-100 rounded"
        >
          <FiMoreVertical size={24} />
        </button>

        {dotsBtns && (
          <div className="absolute bottom-14 left-4 w-[50%] flex flex-col items-start gap-3 text-[14px] font-bold bg-white border border-gray-200 rounded p-2 text-gray-600">
            <button
              onClick={handleDuplicateResume}
              className="hover:cursor-pointer hover:text-gray-800"
            >
              کپی کردن رزومه
            </button>
            <button
              className="hover:cursor-pointer hover:text-gray-800"
              onClick={handleDeleteResume}
            >
              حذف رزمه
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeSummaryCard;
