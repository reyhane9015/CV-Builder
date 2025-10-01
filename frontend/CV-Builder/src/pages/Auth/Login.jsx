import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContextExp";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("لطفا یک ایمیل معتبر وارد کنید");
      return;
    }

    if (!password) {
      setError("لطفا یک رمز عبور وارد کنید");
      return;
    }

    // login api
    try {
      // setError("");

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("data is", response.data);

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message ||
          "مشکلی پیش آمده لطفا بعدا مجددا امتحان کنید"
      );
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">خوش آمدید</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        لطفا اطلاعات خود را وارد کنید
      </p>

      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="ایمیل"
            placeholder="xxx@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="رمز عبور"
            placeholder="1234"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            ورود
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            قبلا ثبت نام نکرده اید؟
            <button
              type="button"
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("signup")}
            >
              ثبت نام
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
