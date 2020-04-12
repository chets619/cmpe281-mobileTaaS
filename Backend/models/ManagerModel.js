const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var managerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: Number, required: false },
    desc: { type: String, required: false },
    image: { type: String, required: false }

}, {
    versionKey: false
});

managerSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = mongoose.model('manager', managerSchema);
