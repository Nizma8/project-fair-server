/// create a path for express applicatoin

// import express

const express = require('express')
const userController = require("../Controller/usercontroller")
const projectController = require("../Controller/projectController")
const multerconfig = require("../Middlewares/multerMiddleware")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//create route using router()
// import controller

const router = new express.Router()

// define route for server app

router.post("/user/register",userController.register)

//login
router.post("/user/login",userController.login)


// add projects
router.post("/projects/add",jwtMiddleware,multerconfig.single('projectImage'),projectController.addProject)

//get projects
router.get("/user/all-projects",jwtMiddleware,projectController.getProject)

//get three projects
router.get("/projects/home/projects",projectController.getHomeProjects)
router.get("/projects/all",jwtMiddleware,projectController.getAllProjects)

router.put('/projects/edit/:id',jwtMiddleware,multerconfig.single('projectImage'),projectController.editProject)
// to delete project 
router.delete('/projects/delete/:id',jwtMiddleware,projectController.delteProject)
module.exports=router