import React, { useState, useEffect } from "react";
import InputDate from "../components/Inputs/InputDate";

export default function ResumeForm() {
  const [resumeData, setResumeData] = useState({
    experience: [{ startDate: "1404/07" }, { startDate: "1403/05" }],
  });

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray[index] = { ...updatedArray[index], [key]: value };
      return { ...prev, [section]: updatedArray };
    });
  };

  useEffect(() => {
    console.log("resumeData.experience:", resumeData.experience);
  }, [resumeData.experience]);

  return (
    <div>
      {resumeData.experience.map((experience, index) => (
        <InputDate
          key={index}
          value={experience.startDate || ""}
          onChange={({ target }) =>
            updateArrayItem("experience", index, "startDate", target.value)
          }
          label={`تاریخ شروع ${index + 1}`}
          placeholder="1404/10"
        />
      ))}
    </div>
  );
}
