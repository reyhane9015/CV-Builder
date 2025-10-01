import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800 font-semibold">
        {label}
      </label>
      <div className="input-box flex border border-gray-100 rounded-lg mb-2">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          label="Email Address"
          placeholder={placeholder}
          className="w-full outline-none text-gray-700"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
