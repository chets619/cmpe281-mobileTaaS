const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    salary: { type: Number, required: true },
    post_date: { type: Date, default: Date.now },
    applications: [{
        status: { type: String, required: true, default: 'Applied' },
        date_applied: { type: Date, default: Date.now },
        tester: { type: Schema.Types.ObjectId, ref: 'tester' }
    }]

}, {
    versionKey: false
});

module.exports = mongoose.model('project', projectSchema);
