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
    files: [{ type: String }],
    bugs: [{ type: Schema.Types.ObjectId, ref: 'bug' }]

}, {
    versionKey: false
});

module.exports = mongoose.model('project', projectSchema);
