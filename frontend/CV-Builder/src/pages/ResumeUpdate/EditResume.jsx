import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuTrash2,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
} from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/workExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailsForm from "./Forms/ProjectsDetailsForm";
import CertificationsInfoForm from "./Forms/CertificationInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import toast from "react-hot-toast";
import {
  captureElementAsImage,
  dataURLtoFile,
  fixTailwindColors,
} from "../../utils/helper";
import Modal from "./../../components/Modal";
import ThemeSelector from "./Forms/ThemeSelector";
import { DateObject } from "react-multi-date-picker";

function EditResume() {
  const { resumeId } = useParams();

  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      ProfilePreviewUrl: "",
      previewUrl: "",
      fullName: "",
      description: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [{ name: "", progress: 0 }],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
        // title: "",
        // issuer: "",
        // year: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [{ name: "", progress: 0 }],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdditionalInfoValid, setIsAdditionalInfoValid] = useState(false);

  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info":
        if (resumeData.profileInfo) {
          const { fullName, description, summary } = resumeData.profileInfo;
          if (!fullName.trim()) errors.push("لطفا یک نام وارد کنید.");
          if (!description.trim()) errors.push("لطفا یک عنوان وارد کنید.");
          if (!summary.trim()) errors.push("لطفا توضیحات را وارد کنید.");
        } else {
          errors.push("اطلاعات پروفایل ناقص است.");
        }
        break;

      case "contact-info":
        if (resumeData.contactInfo) {
          const { email, phone } = resumeData.contactInfo;
          if (
            !email.trim() ||
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
          )
            errors.push("لطفا یک ایمیل معتبر وارد کنید.");
          if (!phone.trim()) errors.push("لطفا یک شماره تماس وارد کنید.");
        } else {
          errors.push("اطلاعات پروفایل ناقص است.");
        }
        break;

      case "work-experience":
        (resumeData.workExperience || []).forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              errors.push(`نام شرکت در سابقه کاری ${index + 1} را وارد کنید`);
            if (!role.trim())
              errors.push(`عنوان شغلی در سابقه کاری ${index + 1} را وارد کنید`);
            // if (!startDate || !/^\d{4}\/\d{2}\/\d{2}$/.test(startDate)) {
            //   errors.push(
            //     `تاریخ شروع معتبر در سابقه کاری ${index + 1} را وارد کنید`
            //   );
            // }
            // if (!endDate || !/^\d{4}\/\d{2}\/\d{2}$/.test(endDate)) {
            //   errors.push(
            //     `تاریخ پایان معتبر در سابقه کاری ${index + 1} را وارد کنید`
            //   );
            // }
            if (!startDate || !endDate)
              errors.push(
                `تاریخ شروع و پایان در سابقه کاری ${index + 1} را وارد کنید`
              );
          }
        );
        break;

      case "education-info":
        (resumeData.education || []).forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`مقطع در ${index + 1} را وارد کنید`);
            if (!institution.trim())
              errors.push(`موسسه در ${index + 1} را وارد کنید`);
            // if (!startDate || !/^\d{4}-\d{2}$/.test(startDate)) {
            //   errors.push(
            //     `تاریخ شروع معتبر در تحصیلات ${index + 1} را وارد کنید`
            //   );
            // }
            // if (!endDate || !/^\d{4}-\d{2}$/.test(endDate)) {
            //   errors.push(
            //     `تاریخ پایان معتبر در تحصیلات ${index + 1} را وارد کنید`
            //   );
            // }
            if (!startDate || !endDate)
              errors.push(
                `تاریخ شروع و پایان در تحصیلات ${index + 1} را وارد کنید`
              );
          }
        );
        break;

      case "skills":
        (resumeData.skills || []).forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`عنوان در مهارت ${index + 1} را وارد کنید`);
          if (progress < 1 || progress > 100)
            errors.push(
              `میزان تسلط در مهارت ${index + 1} باید بین 1 تا 100 باشد`
            );
        });
        break;

      case "projects":
        (resumeData.projects || []).forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`عنوان در پروژه ها ${index + 1} را وارد کنید`);
          if (!description.trim())
            errors.push(`${index + 1} توضیحات در پروژه ها را وارد کنید`);
        });
        break;

      case "certifications":
        (resumeData.certifications || []).forEach(
          ({ title, issuer, year }, index) => {
            if (!title.trim())
              errors.push(`عنوان در مدارک ${index + 1} را وارد کنید`);
            if (!issuer.trim())
              errors.push(`${index + 1} توضیحات در مدرک را وارد کنید`);
            if (!year) errors.push(`${index + 1} تاریخ در مدرک را وارد کنید`);
          }
        );
        break;

      case "additionalInfo":
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0]?.name?.trim()
        ) {
          errors.push("حداقل باید یک زبان وارد کنید.");
        }
        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("حداقل باید یک علاقه وارد کنید.");
        }
        break;

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      if (currentPage === "additionalInfo") {
        setIsAdditionalInfoValid(false);
      }
    } else {
      setErrorMsg("");
      if (currentPage === "additionalInfo") {
        setIsAdditionalInfoValid(true);
      }
      goToNextStep();
    }
  };

  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo" && isAdditionalInfoValid)
      setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goToPrevStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            deleteArrayItem={(index) =>
              deleteArrayItem("workExperience", index)
            }
          />
        );
      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            deleteArrayItem={(index) => deleteArrayItem("education", index)}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            deleteArrayItem={(index) => deleteArrayItem("skills", index)}
          />
        );
      case "projects":
        return (
          <ProjectsDetailsForm
            projectsInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            deleteArrayItem={(index) => deleteArrayItem("projects", index)}
          />
        );
      case "certifications":
        return (
          <CertificationsInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            deleteArrayItem={(index) =>
              deleteArrayItem("certifications", index)
            }
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) => {
              updateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            deleteArrayItem={(section, index) =>
              deleteArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  };

  // update objects(profilesInfo...)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // update array item(profilesInfo[0]...)
  const updateArrayItem = (section, index, key, value) => {
    console.log("Updating", { section, index, key, value });

    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      }

      return { ...prev, [section]: updatedArray };
    });
  };

  // add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // delete item from array
  const deleteArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return { ...prev, [section]: updatedArray };
    });

    // setResumeData((prev) => {
    //   const updatedArray = prev[section].filter((_, i) => i !== index);
    //   return { ...prev, [section]: updatedArray };
    // });
  };

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      console.log("response data", response.data);

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        console.log("resumeInfo", resumeInfo);

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "عنوان پیش فرض",
          thumbnailLink: resumeInfo?.thumbnailLink || "",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const uploadResumeThumbnail = async (resumeId, elementRef) => {
    const imageDataUrl = await captureElementAsImage(elementRef.current);
    const thumbnailFile = dataURLtoFile(imageDataUrl, `resume-${resumeId}.png`);

    const formData = new FormData();
    formData.append("thumbnail", thumbnailFile);

    return axiosInstance.post(
      API_PATHS.RESUME.UPLOAD_THUMBNAIL(resumeId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      if (!resumeRef.current) {
        throw new Error("Resume element not found");
      }

      fixTailwindColors(resumeRef.current);

      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      const thumbnailFile = dataURLtoFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );
      const profileImageFile =
        resumeData?.profileInfo?.profileImg instanceof File
          ? resumeData.profileInfo.profileImg
          : null;

      // console.log(
      //   "profileImageFileeeeeeee:",
      //   resumeData?.profileInfo?.profileImg
      // );

      const formData = new FormData();
      if (profileImageFile instanceof File) {
        formData.append("profileImage", profileImageFile);
      }
      if (thumbnailFile instanceof File) {
        formData.append("thumbnail", thumbnailFile);
      }

      // console.log("FormData contents:", [...formData.entries()]);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("thumb issss", uploadResponse.data.thumbnailLink);
      const { thumbnailLink, ProfilePreviewUrl } = uploadResponse.data;

      if (thumbnailLink || ProfilePreviewUrl) {
        await updateResumeDetails(
          thumbnailLink,
          ProfilePreviewUrl || resumeData.profileInfo.ProfilePreviewUrl
        );

        await uploadResumeThumbnail(resumeId, resumeRef);

        navigate("/dashboard");
        toast.success("رزمه با موفقیت اپلود شد.");
      } else {
        setErrorMsg("No image links returned from the server.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrorMsg(
        error.response?.data?.message || "خطایی در آپلود تصاویر رخ داد."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, ProfilePreviewUrl) => {
    try {
      setIsLoading(true);

      const updatedResumeData = {
        ...resumeData,
        thumbnailLink: thumbnailLink || resumeData.thumbnailLink,
        profileInfo: {
          ...resumeData.profileInfo,
          profileImg: undefined,
          ProfilePreviewUrl:
            ProfilePreviewUrl || resumeData.profileInfo.ProfilePreviewUrl,
        },
      };

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        updatedResumeData
      );

      console.log("Resume updated with imageeeeeeeeee:", response.data);
    } catch (error) {
      console.error("Error capturing image:", error);
      setErrorMsg(
        error.response?.data?.message || "خطایی در بروزرسانی رزومه رخ داد."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));

      toast.success("رزومه باموفقیت حذف شد.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error capturing images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      const parentWidth = resumeRef.current.offsetWidth;
      setBaseWidth(parentWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, [resumeId]);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <p className="pb-4"> ویرایش رزمه</p>

        <div className="flex items-center justify-between bg-white rounded-lg border border-purple-200 p-3 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
            onSave={() => toast.success("رزومه با موفقیت ویرایش شد.")}
          />

          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">تغییر تم</span>
            </button>

            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">حذف</span>
            </button>

            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">مشاهده و دانلود</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden h-fit">
            <StepProgress progress={progress} />

            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert />
                  {errorMsg}
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mt-3 mb-5">
                <button
                  className="btn-small"
                  onClick={
                    currentPage !== "additionalInfo"
                      ? validateAndNext
                      : () => setOpenPreviewModal(true)
                  }
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]" />
                  )}

                  {currentPage !== "additionalInfo"
                    ? "مرحله بعد"
                    : "پیش نمایش و دانلود"}
                </button>

                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "درحال بروزرسانی..." : "ذخیره و خروج"}
                </button>

                <button
                  className="btn-small-light"
                  onClick={goToPrevStep}
                  disabled={isLoading}
                >
                  مرحله قبل
                  <LuArrowLeft className="text-[16px]" />
                </button>
              </div>
            </div>
          </div>

          <div ref={resumeRef} className="w-full overflow-hidden h-fit">
            <RenderResume
              resumeData={resumeData}
              templateId={resumeData?.template?.theme || ""}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="تمامی قالبها"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
            }}
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        showActionBtn
        actionBtnText="دانلود"
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="max-w-[90vw] max-h-[80vh]">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default EditResume;
