var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MarksSchema = new Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    subjectId: {
        type:mongoose.Types.ObjectId,
        required:true,
        ref: 'Subject'
    },
    mark: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Marks', MarksSchema);
