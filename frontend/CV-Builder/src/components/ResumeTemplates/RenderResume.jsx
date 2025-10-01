import React from "react";
import TemplateOne from "./TemplateOne";

function RenderResume({
  resumeData,
  templateId,
  colorPalette,
  containerWidth,
}) {
  console.log("resumeData in renderResume is", resumeData);

  switch (templateId) {
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
  }
}

export default RenderResume;
