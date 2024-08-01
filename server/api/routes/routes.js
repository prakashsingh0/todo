const express = require('express')
const router = express.Router()
const {Login, Register, Logout,  getMyProfile,  profileUpdate} = require('../controller/user_controller')
const {addtask, getTask, deleteTask, updateTask, completeTask} = require('../controller/task')
const auth = require('../middleware/protect')
router.route("/login").post(Login)
router.route("/register").post(Register)
router.route("/profileupdate").put(auth,profileUpdate)
router.route("/logout").get(auth,Logout)
router.route("/getmyprofile").get(auth,getMyProfile)
router.route("/task").post(auth,addtask)
router.route("/gettask").get(auth,getTask)
router.route("/deletetask/:id").delete(auth,deleteTask)
router.route("/updatetask/:taskid").put(auth,updateTask)
router.route("/completetask/:id").put(auth,completeTask)


module.exports = router;