import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function CreateResumeForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("لطفا یک عنوان وارد کنید.");
      return;
    }

    // api call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.message) {
        setError(error.response.data.message);
      } else {
        setError("مشکلی پیش آمده لطفا مجدد امتحان کنید.");
      }
    }

    setError("");
  };

  return (
    <div className="w-[90vw] md:w-[50vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">افزودن رزمه جدید</h3>
      <p className="text-xs text-slate-700 mt-[8px] mb-3">
        یک عنوان برای رزمه خود انتخاب کنید.شما بعدا میتوانید تمام جزییات را
        تغییر دهید
      </p>
      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="عنوان رزمه"
          placeholder="مثال: برنامه نویس"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          افزودن رزمه
        </button>
      </form>
    </div>
  );
}

export default CreateResumeForm;
