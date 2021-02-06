var mongoose = require("mongoose")
const studentSchema = new mongoose.Schema(
    {
        studentname:{type:String},
        rollno:{type:Number},
        admissionno:{type:Number},
        college:{type:String},
        
    }
)
var studentModel=mongoose.model('students',studentSchema);
module.exports={studentModel}