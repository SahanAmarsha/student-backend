const express = require('express');


const studentController = require('../controllers/StudentController');

const router = express.Router();

router.get('/display', studentController.getAllStudents);

router.post('/add', studentController.addNewStudent);
// router.get('/', papersController.getStreams);

module.exports = router;
