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