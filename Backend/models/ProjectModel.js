const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    salary: { type: Number, required: true },
    post_date: { type: Date, default: Date.now },
    manager: { type: String },
    testers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    files: [{ type: String }],
    bugs: [{ type: Schema.Types.ObjectId, ref: 'bug' }]

}, {
    versionKey: false
});

module.exports = mongoose.model('project', projectSchema);
