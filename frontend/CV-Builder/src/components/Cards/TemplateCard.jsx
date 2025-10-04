import React from "react";

function TemplateCard({ thumbnailImg, isSelected, onSelect }) {
  return (
    <div
      className={`h-auto  flex flex-col items-center justify-between overflow-hidden bg-white rounded-lg border border-gray-200 hover:border-4 hover:border-purple-300 cursor-pointer ${
        isSelected ? "border-purple-500 border-2" : ""
      }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img src={thumbnailImg} alt="template" className="w-[100%] rounded" />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TemplateCard;
