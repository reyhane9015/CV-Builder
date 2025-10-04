import React from "react";

function TemplateCard({ thumbnailImg, isSelected, onSelect, theme }) {
  return (
    <div
      className={`h-auto flex flex-col items-center text-center justify-between overflow-hidden bg-white relative group
      `}
    >
      {thumbnailImg ? (
        <div className="w-full">
          <img
            src={thumbnailImg}
            alt={`Template ${theme}`}
            className={`w-[100%] min-h-[250px] rounded rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 ease-in-out group-hover:border-4 group-hover:border-purple-300 cursor-pointer ${
              isSelected ? "border-purple-500 border-2" : ""
            }`}
            onClick={onSelect}
          />
          <div
            className={`pt-3 text-[13px] font-bold text-gray-500 cursor-pointer transition-all duration-300 ease-in-out group-hover:text-purple-300 ${
              isSelected ? "text-purple-500" : ""
            }`}
          >
            {theme}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TemplateCard;
