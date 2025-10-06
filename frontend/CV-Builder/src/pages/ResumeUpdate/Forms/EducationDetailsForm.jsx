import React from "react";
import Input from "./../../../components/Inputs/Input";
import InputDate from "./../../../components/Inputs/InputDate";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function EducationDetailsForm({
  educationInfo,
  updateArrayItem,
  addArrayItem,
  deleteArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">تحصیلات</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {educationInfo.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={education.degree || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "degree", target.value)
                }
                label="مقطع"
                placeholder="لیسانس"
                type="text"
              />
              <Input
                value={education.institution || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "institution", target.value)
                }
                label="نام دانشگاه"
                placeholder="دانشگاه تهران"
                type="text"
              />

              {/* <Input
                value={education.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
                label="تاریخ شروع"
                placeholder="1404/10/10"
                type="month"
              /> */}

              <InputDate
                value={education.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
                label="تاریخ شروع"
                placeholder="1404/10"
              />

              {/* <Input
                value={education.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
                label="تاریخ پایان"
                placeholder="1404/10/10"
                type="month"
              /> */}
              <InputDate
                value={education.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
                label="تاریخ پایان"
                placeholder="1405/10"
              />

              {educationInfo.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 left-3 text-sm text-red-600 hover:underline cursor-pointer"
                  onClick={() => deleteArrayItem(index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          className="mb-8 self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          <LuPlus />
          افزودن تحصیلات جدید
        </button>
      </div>
    </div>
  );
}

export default EducationDetailsForm;
