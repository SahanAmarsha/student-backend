var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MarksSchema = new Schema({
    studentId: {
        type: String,
        required:true
    },
    subjectId: {
        type: String,
        required:true

    },
    mark: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Marks', MarksSchema);
