"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = exports.router = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const argon2_1 = __importDefault(require("argon2"));
const Kd_Mo_users_1 = require("../../modules/Kd_Mo_users");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
passport_1.default.use(new passport_local_1.default.Strategy(async (username, password, callback) => {
    const userResult = await Kd_Mo_users_1.Users.findOneBy({ username: username });
    if (!userResult)
        return callback(null, false, {
            message: "Incorrect username or password.",
        });
    if (userResult) {
        const isValid = await argon2_1.default.verify(userResult === null || userResult === void 0 ? void 0 : userResult.password, password);
        if (!isValid)
            return callback(null, false, {
                message: "Incorrect username or password.",
            });
    }
    return callback(null, { id: userResult._id, username: userResult.username });
}));
passport_1.default.serializeUser((userS, done) => {
    process.nextTick(function () {
        return done(null, userS);
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
exports.router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
exports.Passport = passport_1.default;
//# sourceMappingURL=Auth.js.map