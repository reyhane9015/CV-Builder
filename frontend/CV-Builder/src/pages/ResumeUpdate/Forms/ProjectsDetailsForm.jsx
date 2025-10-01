import React from "react";
import Input from "./../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function ProjectsDetailsForm({
  projectsInfo,
  updateArrayItem,
  addArrayItem,
  deleteArrayItem,
}) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">پروژه ها</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectsInfo.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={project.title || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
                label="عنوان"
                placeholder="اپلیکیشن"
                type="text"
              />

              <div className="mt-4 col-span-2">
                <label className="text-[13px] text-slate-800 font-semibold">
                  توضیحات
                </label>
                <textarea
                  placeholder="توضیحات بیشتر..."
                  className="form-input w-full mt-1 text-gray-700"
                  rows={3}
                  value={project.description || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>

              <Input
                value={project.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
                label="لینک گیت هاب"
                placeholder="https://github.com/example"
                type="text"
              />

              <Input
                value={project.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
                label="لینک نمونه کار"
                placeholder="https://resume-builder.example.dev"
                type="text"
              />

              {projectsInfo.length > 1 && (
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
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <LuPlus />
          افزودن پروژه جدید
        </button>
      </div>
    </div>
  );
}

export default ProjectsDetailsForm;
