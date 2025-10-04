import React from "react";

function ColorPalette({ colors, isSelected, onSelect }) {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
        isSelected ? "border-purple-500" : "border-none"
      }`}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

export default ColorPalette;
