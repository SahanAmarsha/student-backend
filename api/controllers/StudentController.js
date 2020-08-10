var mongoose = require('mongoose');

const Marks = require('../models/Marks');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

exports.getAllStudents = async function(req, res) {

    let marksForStudents;
    let students;
    try{
        students = await Student.find({});
        marksForStudents = await Marks.find({});
    } catch (error) {
        throw error;
    }

    res.status(200).json({
        marksForStudents: marksForStudents.map( mark => mark.toObject({ getters: true })),
        students: students.map(student => student.toObject({getters: true}))
    });

};

exports.addNewStudent = async function(req, res) {

    const{idNum, name, science, maths, english} = req.body;
    try{
        let studentCount=0;
        await Student.countDocuments({}, function(err, c) {
            studentCount = c;
        });

        if(studentCount===0)
        {
            await addSubjects();
        }

    } catch (e) {
        throw e;
    }

    try{
        let extStudent = await Student.findOne({idNum: idNum});

        if(extStudent)
        {
            return res.status(500).json({Message: "Student Exists Already!"});
        }
    } catch (e) {
        throw e;
    }




    const newStudent = new Student({
        idNum,
        name
    });

    const scienceMarks = new Marks({
        studentId: idNum,
        subjectId: 's001',
        mark: science
    });

    const englishMarks = new Marks({
        studentId: idNum,
        subjectId: 's002',
        mark: english
    });

    const mathsMarks = new Marks({
        studentId: idNum,
        subjectId: 's003',
        mark: maths
    });

    try{
        await  newStudent.save();
        await  Marks.insertMany([scienceMarks, englishMarks, mathsMarks]);
        await res.status(200).json({
            message: 'Student added successfully',
        });

    } catch (error) {
        throw error;
    }
};

const addSubjects = async function() {
    const subjectDetails = [
        new Subject({
            subId: 's001',
            name: 'Science'
        }),
        new Subject({
            subId: 's002',
            name: 'English'
        }),
        new Subject({
            subId: 's003',
            name: 'Maths'
        })
    ];
    try{
        await Subject.insertMany(subjectDetails);
    } catch (e) {
        throw e;
    }

};
