import React from "react";
import Input from "./../../../components/Inputs/Input";

function ContactInfoForm({ contactInfo, updateSection }) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">اطلاعات تماس</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            value={contactInfo.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
            label="آدرس"
            placeholder="شهر. محله..."
            type="text"
          />
        </div>

        <Input
          value={contactInfo.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
          label="ایمیل"
          placeholder="ex@example.com"
          type="email"
        />

        <Input
          value={contactInfo.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
          label="شماره تماس"
          placeholder="12345"
          type="text"
        />

        <Input
          value={contactInfo.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
          label="لینکدین"
          placeholder="https://linkedin.com/in/username"
          type="text"
        />

        <Input
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
          label="گیت هاب"
          placeholder="https://github.com/username"
          type="text"
        />

        <div className="md:col-span-2">
          <Input
            label="وبسایت"
            placeholder="https://yourwebsite.dev"
            type="text"
            value={contactInfo.website || ""}
            onChange={({ target }) => updateSection("website", target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactInfoForm;
