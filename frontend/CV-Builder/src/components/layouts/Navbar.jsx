import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import LOGO from "../../assets/LOGO.PNG";

function Navbar() {
  return (
    <div className="h-20 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/">
          <img src={LOGO} alt="LOGO" className="w-[130px] h-[60px]" />
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
}

export default Navbar;
