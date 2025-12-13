const express = require('express');
const threadController = require('../controllers/ThreadsController');

const router = express.Router();

router.route("/").get(threadController.getThread).post(threadController.createThread);

router.route("/all").get(threadController.getAllThreads);

router.route("/f/all").get(threadController.getAllThreadFamily);

module.exports = router;
// exports.getThreads = (req,res) => {
//     console.log("All threads requested");
//     res.status(200).json({
//         status: "success",
//         message: "Work in progress",
//         data: {status: "Coming soon..."}
//     });
// };

// exports.createThread = (req,res) => {
//     res.status(404).send("Route not yet defined");
// }