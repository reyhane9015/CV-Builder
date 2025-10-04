import React, { useRef, useState, useEffect } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../../utils/data";
import { LuCircleCheckBig } from "react-icons/lu";

import Tabs from "../../../components/Tabs";
import TemplateCard from "../../../components/Cards/TemplateCard";
import ColorPalette from "../../../components/Cards/ColorPalette";
import RenderResume from "./../../../components/ResumeTemplates/RenderResume";

const TAB_DATA = [{ label: "قالبها" }, { label: "پالت رنگها" }];

function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) {
  const resumeRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("قالبها");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  const handeThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });

    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);
  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center justify-between mb-5 mt-2">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        <button
          className="btn-small-light"
          onClick={() => handeThemeSelection()}
        >
          <LuCircleCheckBig className="text-[16px]" />
          اعمال کن
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2 md:gap-5">
        <div className="col-span-12 md:col-span-6 bg-white border border-gray-400">
          {tabValue === "قالبها" && (
            <div className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-5 max-h-[80vh] overflow-y-scroll custom-scollbar md:pl-4">
              {resumeTemplates.map((template, index) => {
                return (
                  <TemplateCard
                    key={`templates_${index}`}
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate?.index === index}
                    onSelect={() =>
                      setSelectedTemplate({ theme: template.id, index })
                    }
                  />
                );
              })}
            </div>
          )}

          {tabValue === "پالت رنگها" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-h-[80vh] overflow-y-scroll custom-scollbar md:pl-4">
              {themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="col-span-12 md:col-span-6 bg-white  border border-gray-400 overflow-hidden"
          ref={resumeRef}
        >
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || ""}
          />
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;
