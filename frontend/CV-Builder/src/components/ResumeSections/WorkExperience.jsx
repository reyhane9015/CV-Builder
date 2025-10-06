import React from "react";

function WorkExperience({
  company,
  role,
  duration,
  durationColor,
  description,
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">{company}</h3>
          <p className="text-[15px] font-semibold text-gray-700">{role}</p>
        </div>

        <p
          className="text-[13px] font-bold italic"
          style={{ color: durationColor }}
        >
          {duration}
        </p>
      </div>

      <p className="text-sm text-gray-600 font-medium italic mt-2 leading-7">
        {description}
      </p>
    </div>
  );
}

export default WorkExperience;
