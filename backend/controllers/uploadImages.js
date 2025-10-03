const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File upload failed", error: err.message });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.user._id,
        });

        if (!resume) {
          return res
            .status(404)
            .json({ message: "Resume not found or unauthorized" });
        }

        const uploadesFolder = path.join(__dirname, "..", "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
              uploadesFolder,
              path.basename(resume.thumbnailLink)
            );
            if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
          }
        }

        if (newProfileImage) {
          if (resume.profileInfo?.ProfilePreviewUrl) {
            const oldProfile = path.join(
              uploadesFolder,
              path.basename(resume.profileInfo.ProfilePreviewUrl)
            );
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
          }

          resume.profileInfo.ProfilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();

        res.status(200).json({
          message: "Images uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          ProfilePreviewUrl: resume.profileInfo.ProfilePreviewUrl,
        });
      }
    );
  } catch (error) {
    console.log("Error uploading images", error);
    res
      .status(500)
      .json({ message: "Failed to upload images", error: error.message });
  }
};

module.exports = { uploadResumeImages };
