import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

function TitleInput({ title, setTitle, onSave }) {
  const [showInput, setShowInput] = useState(false);

  const handelSave = () => {
    if (onSave) onSave(title);
    setShowInput((prevState) => !prevState);
  };

  return (
    <div className="flex items-center gap-3">
      {showInput ? (
        <>
          <input
            type="text"
            placeholder="عنوان رزومه"
            className="max-w-[60%] mb-2 text-sm md:text-[15px] bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-2"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <button className="cursor-pointer" onClick={handelSave}>
            <LuCheck className="text-[16px] text-purple-500" />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-sm md:text-[17px] font-semibold">{title}</h2>
          <button
            className="cursor-pointer"
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            <LuPencil className="text-sm text-purple-500" />
          </button>
        </>
      )}
    </div>
  );
}

export default TitleInput;
