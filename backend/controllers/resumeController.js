const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        ProfilePreviewerUrl: null,
        // previewUrl: "",
        fullName: "",
        description: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [{ name: "", progress: 0 }],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issue: "",
        },
      ],
      languages: [{ name: "", progress: 0 }],
      interests: [""],
      thumbnailLink: "",
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    Object.assign(resume, req.body);

    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    const uploadesFolder = path.join(__dirname, "..", "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadesFolder,
        path.basename(resume.thumbnailLink)
      );

      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    if (resume.profileInfo?.ProfilePreviewerUrl) {
      const oldProfile = path.join(
        uploadesFolder,
        path.basename(resume.profileInfo.profilePreviewerUrl)
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
