import React, { useRef } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// import { FiCalendar } from "react-icons/fi";

export default function InputDate({ value, onChange, label, placeholder }) {
  const ref = useRef();

  const handleChange = (dateObject) => {
    if (!dateObject) return;
    const formattedData = dateObject?.format("YYYY/MM/DD") || "";

    console.log("Date picked:", formattedData);

    onChange({ target: { value: formattedData } });
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800 font-semibold">
        {label}
      </label>
      <div className="input-box flex border border-gray-100 rounded-lg mb-2 cursor-pointer px-3 py-2">
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          calendarPosition="right-right"
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
