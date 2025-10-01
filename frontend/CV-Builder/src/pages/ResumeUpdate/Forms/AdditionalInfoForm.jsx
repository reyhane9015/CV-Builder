import React from "react";
import Input from "./../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

function AdditionalInfoForm({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  deleteArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">اطلاعات بیشتر</h2>

      {/* languages section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold">زبانها</h3>
        <div className="mt-4 flex flex-col gap-4 mb-3">
          {languages?.map((lang, index) => (
            <div
              key={index}
              className="border border-gray-200/80 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  value={lang.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem("languages", index, "name", target.value)
                  }
                  label="زبان"
                  placeholder="انگلیسی"
                  type="text"
                />

                <div className="flex flex-col">
                  <label>میزان تسلط ({lang.progress / 20 || 0}/5)</label>
                  <div className="mt-5">
                    <RatingInput
                      value={lang.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem(
                          "languages",
                          index,
                          "progress",
                          newValue
                        )
                      }
                    />
                  </div>
                </div>

                {languages.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-3 left-3 text-sm text-red-600 hover:underline cursor-pointer"
                    onClick={() => deleteArrayItem("languages", index)}
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
              addArrayItem("languages", {
                name: "",
                progress: 0,
              })
            }
          >
            <LuPlus />
            افزودن زبان جدید
          </button>
        </div>
      </div>

      {/* interests section */}
      <div className="">
        <h3 className="">علایق</h3>
        <div className="mt-4 flex flex-col gap-4 mb-3">
          {interests?.map((interest, index) => (
            <div
              key={index}
              className="border border-gray-200/80 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={interest || ""}
                  onChange={({ target }) =>
                    updateArrayItem("interests", index, null, target.value)
                  }
                  label="عنوان"
                  placeholder="مطالعه"
                  type="text"
                />

                {interests.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-3 left-3 text-sm text-red-600 hover:underline cursor-pointer"
                    onClick={() => deleteArrayItem("interests", index)}
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
            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus />
            افزودن علاقه جدید
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfoForm;
