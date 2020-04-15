const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    salary: { type: Number, required: true },
    post_date: { type: Date, default: Date.now },
    manager: { type: String },
    testers: [{
        id: { type: Schema.Types.ObjectId, ref: 'user' },
        status: { type: String, default: 'Applied' }
    }],
    files: [{
        name: { type: String },
        uploader: { type: Schema.Types.ObjectId, ref: 'user' },
        size: { type: String },
        time: { type: Date, default: Date.now }
    }],
    bugs: [{ type: Schema.Types.ObjectId, ref: 'bug' }],
    runs: [{ type: Schema.Types.ObjectId, ref: 'testrun' }]

}, {
    versionKey: false
});

module.exports = mongoose.model('project', projectSchema);
