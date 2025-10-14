import TEMPLATE_ONE_IMG from "../assets/template-one.jpg";
import TEMPLATE_TWO_IMG from "../assets/template-two.jpg";
import TEMPLATE_THREE_IMG from "../assets/template-three.jpg";
import TEMPLATE_FOUR_IMG from "../assets/template-four.jpg";

export const resumeTemplates = [
  {
    id: "Template One",
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: "themeOne",
  },
  {
    id: "Template Two",
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: "themeTwo",
  },
  {
    id: "Template Three",
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: "themeThree",
  },
  {
    id: "Template Four",
    thumbnailImg: TEMPLATE_FOUR_IMG,
    colorPaletteCode: "themeFour",
  },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#FOFAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#CODDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0047A1"],
  ],
};

export const DUMMY_RESUME_DATA = {
  title: "برنامه نویس",
  thumbnailLink:
    "https://cv-builder-backend-wbds.onrender.com/uploads/resume-1759587595195-454737433.png",
  profileInfo: {
    ProfilePreviewUrl: "https://cv-builder-backend-wbds.onrender.com/uploads/1.png",
    previewUrl: "",
    fullName: "مریم محمدی",
    description: "برنامه نویس",
    summary:
      "علاقمند به یادگیری مباحث جدید و طراحی وبسایت ریسپانسیو با تکنولوژی های بروز و جدید",
  },
  template: {
    colorPalette: [],
  },
  contactInfo: {
    email: "ali123@gmail.com",
    phone: "0904567890",
    location: "ایران. تبریز",
    linkedin: "linkedin.com/mrm123",
    github: "gitHub.com/mrm123",
    website: "sdd//d.mrm123",
  },
  workExperience: [
    {
      company: "ایرانسل",
      role: "برنامه نویس",
      startDate: "1400/06",
      endDate: "1405/06",
      description:
        "ارتقا اپلیکیشن و سایت مشتری در مدت شش ماه و افزایش بازدهی 20% و بازید سایت.",
    },
  ],
  education: [
    {
      degree: "ارشد مدیریت",
      institution: "دانشگاه تهران",
      startDate: "1404/06",
      endDate: "1404/12",
    },
  ],
  skills: [
    {
      name: "ریکت",
      progress: 80,
    },
    {
      name: "جاواسکریپ",
      progress: 60,
    },
  ],
  projects: [
    {
      title: "گوگل انالتیکس",
      description: "ارتقا پیج و اپ ایرانسل بصورت پله ای در مدت شش ماه",
      github: "linkedin.com/mrm123",
      liveDemo: "linkedin.com/mrm123",
    },
  ],
  certifications: [
    {
      title: "لینوکس",
      issuer: "دانشگاه تهران",
      year: "1402",
    },
    {
      title: "دواپس",
      issuer: "دانشگاه تهران",
      year: "1404",
    },
  ],

  languages: [
    {
      name: "انگلیسی",
      progress: 80,
    },
  ],
  interests: ["پیاده روی", "مطالعه"],
};
