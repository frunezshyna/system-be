const Course = require("../models/Course-Model.js");

// Create Course
module.exports.addCourse = (req, res) => {
    let {name, description, price} = req.body;
    let newCourse = new Course({
        name: name,
        description: description,
        price: price
    })
    return newCourse.save().then(result => {
        return res.send({
            code: "COURSE-ADDED",
            message: "The course is now posted in the application.",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "SERVER-ERROR",
            message: "We've encoutered an error while adding the course. Please try again!",
            result: error
        })
    })
}

// Get All Courses
module.exports,getAllCourses = (req, res) => {
    return Course.find({}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet."
            })
        }else{
            return res.send({
                code: "ALL-COURSES-RESULT",
                message: "Here are the list of courses.",
                result: result
            })
        }
    })
}

// Get All Active Courses
module.exports.getAllActiveCourses = (req, res) => {
    return Course.find({isActive: true}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet."
            })
        }else{
            return res.send({
                code: "ALL-ACTIVE-COURSES-RESULT",
                message: "Here are the list of the active courses.",
                result: result
            })
        }
    })
}

// Get All Inactive Courses
module.exports.getAllInactiveCourses = (req, res) => {
    return Course.find({isActive: false}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message : "There is no added course yet."
            })
        }else{
            return res.send({
                code: "ALL-COURSES-RESULT",
                message: "Here are the list of courses.",
                result: result
            })
        }
    })
}

// Get Specific Course
module.exports.getSpecificCourse = (req, res) => {
    const {courseId} = req.params.courseId;
    return Course.findById(courseId).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-NOT-FOUND",
                message: "The course cannot be found."
            })
        }else{
            return res.send({
                code: "COURSE-FOUND",
                message: "Here is the course.",
                result: result
            })
        }
    })
}

// Archive Course
module.exports.archiveCourse = (req, res) => {
    const {courseId} = req.params;
    const updateField = {
        isActive: false
    }
    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result === null || result.length === 0){
            res.send({
                code: "COURSE-NOT-FOUND",
                message: "Cannot find course with the provided ID."
            })
        }else{
            res.send({
                code: "COURSE-ARCHIVED-SUCCESSFULLY",
                message: "The course is now in archives.",
                result: result
            })
        }
    })
}

// Unarchive Course
module.exports.activateCourse = (req, res) => {
    const {courseId} = req.params;
    const updateField = {
        isActive: true
    }
    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result === null || result.length === 0){
            res.send({
                code: "COURSE-NOT-FOUND",
                message: "Cannot find course with the provided ID."
            })
        }else{
            res.send({
                code: "COURSE-ARCHIVED-SUCCESSFULLY",
                message: "The course is now in archives.",
                result: result
            })
        }
    })
}
