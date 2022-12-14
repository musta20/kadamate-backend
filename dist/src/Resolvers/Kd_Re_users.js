"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const types_1 = require("../utils/types");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const Kd_Mo_users_1 = require("../modules/Kd_Mo_users");
let UserResolver = class UserResolver {
    User(_id) {
    }
    async Profile({ req }) {
        var _a, _b, _c;
        const MyId = (_c = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!MyId)
            return null;
        const usersend = await Kd_Mo_users_1.Users.findOneBy({ _id: (0, types_1.inferToObjectId)(MyId) });
        return usersend;
    }
    async RegisterUser(props, { req }) {
        var _a, _b;
        const MyId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user.id;
        if (MyId)
            return false;
        if (props) {
            props.password = await argon2_1.default.hash(props.password);
            const addUser = await Kd_Mo_users_1.Users.create(props)
                .save()
                .catch((err) => {
                console.log(err);
                return { errors: [{ field: "error", message: err }] };
            });
            return addUser;
        }
        return {
            errors: [{ field: "error", message: "spmthing went wrong" }],
        };
    }
    async updateUser(userInput, { req }) {
        var _a, _b, _c;
        const MyId = (_c = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!MyId)
            return null;
        const findUser = await Kd_Mo_users_1.Users.findOneBy({ _id: (0, types_1.inferToObjectId)(MyId) });
        if (!findUser)
            return {
                errors: {
                    fied: "error",
                },
            };
        if (userInput.email)
            findUser.email = userInput.email;
        if (userInput.name)
            findUser.name = userInput.name;
        if (userInput.phone)
            findUser.phone = userInput.phone;
        return await Kd_Mo_users_1.Users.save(findUser);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Kd_Mo_users_1.Users, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "User", null);
__decorate([
    (0, type_graphql_1.Query)(() => Kd_Mo_users_1.Users, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Profile", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Kd_Mo_users_1.Users),
    __param(0, (0, type_graphql_1.Arg)("userInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_users_1.InputUsers, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "RegisterUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Kd_Mo_users_1.Users, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("UserInput", () => Kd_Mo_users_1.InputUsersCustmer)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_users_1.InputUsersCustmer, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=Kd_Re_users.js.map