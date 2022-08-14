const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});
const User = new Schema({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    des: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        default: "",
    },
    user_type: {
        type: Number,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    img_id: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: [Session],
    },
});
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", User);
//# sourceMappingURL=userModule.js.map