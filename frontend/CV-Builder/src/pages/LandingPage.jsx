import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/HERO.webp";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { useContext } from "react";
import { UserContext } from "../context/userContextExp";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-full min-h-full bg-[#F6F8FC] pb-48">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="">رزومه ساز</div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-purple-600/15 text-sm font-semibpld text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              ورود/ثبت نام
            </button>
          )}
        </header>
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              <span>ساخت رزومه</span>{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shining">
                خیلی سریع و آسان
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              ساخت یک رزومه در یک دقیقه کاملا رایگان با رزمه ساز ما
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              همین الان رزمه تو بساز!
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img src={HERO_IMG} alt="Hero" className="w-1/2 rounded-lg" />
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-12">
            رزمه ساز ساز ساز
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">ویرایش راحت</h3>
              <p>رزمه خود را بصورت انلاین ایحاد و ادیت کن</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">قالبهای زیبا</h3>
              <p>از بین قالهای مدرن و زیبا انتخاب کن</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">دانلود با یک کلی</h3>
              <p>رزمه خود را با یک کلیک در فرمت PDF دانلود کن</p>
            </div>
          </div>
        </section>

        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}

            {currentPage === "signup" && (
              <SignUp setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LandingPage;
