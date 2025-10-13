import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuCirclePlus } from "react-icons/lu";
// import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import Modal from "../../components/Modal";
import CreateResumeForm from "./CreateResumeForm";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { toShamsi } from "../../utils/helper";

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);

      console.log("data in dashboard is", response.data);
    } catch (error) {
      console.log("Error on fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async (resumeId) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));

      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success("رزومه باموفقیت حذف شد.");
    } catch (error) {
      console.error("Error capturing images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateResume = async (resumeId) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.RESUME.DUPLICATE(resumeId)
      );
      setAllResumes((prev) => [response.data, ...prev]);
      toast.success("رزومه با موفقیت کپی شد.");
    } catch (error) {
      console.log("Error on fetching resumes:", error);
      toast.error("خطا در کپی رزومه");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTitle = async (resumeId, newTitle) => {
    const prevResume = allResumes.find((r) => r._id === resumeId);
    const prevTitle = prevResume?.title;

    try {
      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === resumeId ? { ...resume, title: newTitle } : resume
        )
      );

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        title: newTitle,
      });

      if (newTitle !== prevTitle) {
        toast.success("عنوان رزومه باموفقیت ویرایش شد.");
      }
    } catch (error) {
      console.log("Error on fetching resumes:", error);
      toast.error("خطا در ویرایش رزومه");

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === resumeId ? { ...resume, title: prevTitle } : resume
        )
      );
    }
  };

  return (
    <DashboardLayout>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div
          className="h-[450px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border-3 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50/50 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/50 rounded-lg">
            <LuCirclePlus className="text-lg text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800 text-center">
            افزودن رزومه جدید
          </h3>
        </div>

        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            resumeId={resume?._id}
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            handleSaveTitle={handleSaveTitle}
            // lastUpdated={
            //   resume?.updatedAt
            //     ? moment(resume.updatedAt).format("YYYYY/MM/DD")
            //     : ""
            // }
            lastUpdated={resume?.updatedAt ? toShamsi(resume.updatedAt) : ""}
            onSelect={() => navigate(`/resume/${resume?._id}`)}
            handleDeleteResume={() => handleDeleteResume(resume?._id)}
            handleDuplicateResume={() => handleDuplicateResume(resume?._id)}
          />
        ))}
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateResumeForm />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
