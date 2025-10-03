const express = require("express");

const multer = require("multer");
const path = require("path");

const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadResumeThumbnail,
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImages } = require("../controllers/uploadImages");

const router = express.Router();

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.put("/:id/upload-images", protect, uploadResumeImages);

router.post(
  "/:id/thumbnail",
  protect,
  upload.single("thumbnail"),
  uploadResumeThumbnail
);

router.delete("/:id", protect, deleteResume);

module.exports = router;
