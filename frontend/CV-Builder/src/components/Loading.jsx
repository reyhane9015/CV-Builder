import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
