import React from "react";
import Input from "./../../../components/Inputs/Input";
import InputDate from "./../../../components/Inputs/InputDate";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function CertificationsInfoForm({
  certifications,
  updateArrayItem,
  addArrayItem,
  deleteArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">مدارک</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {certifications.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={experience.title || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
                label="عنوان"
                placeholder="توسعه دهنده"
                type="text"
              />
              <Input
                value={experience.issuer || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "issuer", target.value)
                }
                label="موسسه"
                placeholder="بوت کمپ"
                type="text"
              />

              {/* <Input
                value={experience.year || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "year", target.value)
                }
                label="سال اخذ"
                placeholder="1404"
                type="text"
              /> */}

              <InputDate
                value={experience.year || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "year", target.value)
                }
                label="سال اخذ"
                placeholder="1404"
                type="text"
              />

              {certifications.length > 1 && (
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
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <LuPlus />
          افزودن مدرک جدید
        </button>
      </div>
    </div>
  );
}

export default CertificationsInfoForm;
