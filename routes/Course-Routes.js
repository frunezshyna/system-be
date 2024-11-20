const express = require ("express");

//Express routing components
const router = express.Router();
const courseController = require("../controllers/Course-Controllers.js");

// Create Course
router.post("/", courseController.addCourse);

// Get all Courses
router.get("/all", courseController.getAllCourses);

// Get all active Courses
router.get("/all/active", courseController.getAllActiveCourses);

// Get all inactive Courses
router.get("/all/inactive", courseController.getAllInactiveCourses);

// Get specific course
router.get("/search/:courseId", courseController.getSpecificCourse);

// Archive course
router.put("/archive/:courseId", courseController.archiveCourse);

// Activate course
router.put("/activate/:courseId", courseController.activateCourse);

module.exports = router;
