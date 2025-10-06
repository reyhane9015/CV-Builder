import React, { useState, useEffect, useRef } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
// import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/Languagesection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillsSection from "../ResumeSections/SkillsSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#EBFDFF", "#3A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  );
};

function TemplateTwo({ resumeData, colorPalette, containerWidth }) {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const templateRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = templateRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    // setBaseWidth(800);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  console.log("resumeData in templateone is", resumeData);

  return (
    <div
      ref={templateRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top right",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="flex items-start gap-5 p-4 mb-5 ">
        <div
          className="w-[100px] h-[100px] max-w-[105px] max-h-[105px] rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: themeColors[1] }}
        >
          {resumeData.profileInfo.ProfilePreviewUrl ? (
            <img
              src={resumeData.profileInfo.ProfilePreviewUrl}
              className="w-[90px] h-[90px] rounded-lg"
            />
          ) : (
            <div
              className="w-[90px] h-[90px] rounded-full text-5xl flex items-center justify-center"
              style={{
                backgroundColor: themeColors[2],
                color: themeColors[4],
              }}
            >
              <LuUser />
            </div>
          )}
        </div>

        <div>
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="col-span-6 flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                {resumeData.profileInfo.fullName}
              </h2>
              <p className="text-[16px] font-bold mb-2">
                {resumeData.profileInfo.description}
              </p>
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.location}
              />
            </div>

            <div className="col-span-6 flex flex-col gap-5 mt-2">
              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.email}
              />
              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.phone}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Right section */}
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-2"></div>

          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}

              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.github}
                />
              )}

              {resumeData.contactInfo.website && (
                <ContactInfo
                  icon={<LuRss />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.website}
                />
              )}
            </div>
            <div className="mt-5">
              <Title text="تحصیلات" color={themeColors[2]} />

              {resumeData.education.map((data, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${data.startDate} - ${data.endDate}`}
                />
              ))}
            </div>

            <div className="mt-5">
              <Title text="زبانها" color={themeColors[2]} />

              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>
        {/* left section */}
        <div className="col-span-8 pt-2 ml-4 pb-5">
          <div>
            <Title text="معرفی خود" color={themeColors[2]} />
            <p className="text-sm font-medium">
              {resumeData.profileInfo.summary}
            </p>
          </div>

          <div className="mt-4">
            <Title text="سوابق کاری" color={themeColors[2]} />

            {resumeData.workExperience.map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${data.startDate} - ${data.endDate}`}
                durationColor={themeColors[4]}
                description={data.description}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="مهارتها" color={themeColors[2]} />
            <SkillsSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          <div className="mt-4">
            <Title text="پروژه ها" color={themeColors[2]} />

            {resumeData.projects.map((project, index) => (
              <ProjectInfo
                key={`project_${index}`}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
                isPreview={false}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="مدارک" color={themeColors[2]} />

            <div className="grid grid-cols-2 gap-2">
              {resumeData.certifications.map((data, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={data.title}
                  issuer={data.issuer}
                  year={data.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          {resumeData.interests.length > 0 &&
            resumeData.interests[0] !== "" && (
              <div className="mt-4">
                <Title text="علایق" color={themeColors[2]} />

                <div className="flex items-center flex-wrap gap-3 mt-4">
                  {resumeData.interests.map((interest, index) => {
                    if (!interest) return null;
                    return (
                      <div
                        key={`interest_${index}`}
                        className="text-[10px] font-medium py-1 px-3 rounded-lg"
                        style={{ backgroundColor: themeColors[2] }}
                      >
                        {interest}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default TemplateTwo;
