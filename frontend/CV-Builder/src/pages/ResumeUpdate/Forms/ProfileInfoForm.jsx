import React from "react";

import ProfilePhotoSelector from "./../../../components/Inputs/ProfilePhotoSelector";
import Input from "./../../../components/Inputs/Input";

function ProfileInfoForm({ profileData, updateSection }) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">اطلاعات شخصی</h2>

      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            label="نام"
            placeholder="مریم محمدی"
            type="text"
          />

          <Input
            value={profileData.description || ""}
            onChange={({ target }) =>
              updateSection("description", target.value)
            }
            label="عنوان"
            placeholder="طراح سایت"
            type="text"
          />

          <div className="col-span-2 mt-3">
            <label className="text-[13px] text-slate-800 font-semibold">
              خلاصه
            </label>
            <textarea
              placeholder="توضیح مختصر"
              className="form-input text-gray-700"
              row={4}
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoForm;
