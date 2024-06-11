const { default: mongoose, ObjectId } = require('mongoose');

const taskModel = mongoose.Schema({

    title: {type:String, required: true },
    task: { type: String, required: true },
    status:{type:String,default:"pending"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel' ,
    require:true}
}, { timestamps: true });

mongoose.model('taskModel', taskModel)
module.exports = taskModel
