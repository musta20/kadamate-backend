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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsResolver = void 0;
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_follows_1 = require("../modules/Kd_Mo_follows");
const type_graphql_1 = require("type-graphql");
let FollowsResolver = class FollowsResolver {
    AllFollows() {
        return Kd_Mo_follows_1.Follows.find();
    }
    async Follows({ req }, CombanyId) {
        var _a, _b;
        const MyId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user.id;
        const isFollow = await Kd_Mo_follows_1.Follows.findOneBy({ User_id: MyId, combany_id: CombanyId });
        if (isFollow) {
            Kd_Mo_follows_1.Follows.delete(isFollow._id);
            return false;
        }
        Kd_Mo_follows_1.Follows.create({ User_id: MyId, combany_id: CombanyId }).save();
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Kd_Mo_follows_1.Follows]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FollowsResolver.prototype, "AllFollows", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("CombanyId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowsResolver.prototype, "Follows", null);
FollowsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FollowsResolver);
exports.FollowsResolver = FollowsResolver;
//# sourceMappingURL=Kd_Re_follows.js.map