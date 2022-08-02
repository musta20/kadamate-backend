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
exports.RequirementUploadersResolver = void 0;
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_requirement_uploaders_1 = require("../modules/Kd_Mo_requirement_uploaders");
const type_graphql_1 = require("type-graphql");
let RequirementUploadersResolver = class RequirementUploadersResolver {
    async AllRequirementUploaders(ServiceId) {
        await Kd_Mo_requirement_uploaders_1.RequirementUploaders.findBy({ Service_id: ServiceId });
    }
    async AddRequirementUploaders({ req }, Ru) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        if (MyId) {
            await Kd_Mo_requirement_uploaders_1.RequirementUploaders.create(Ru);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Kd_Mo_requirement_uploaders_1.RequirementUploaders]),
    __param(0, (0, type_graphql_1.Arg)("ServiceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RequirementUploadersResolver.prototype, "AllRequirementUploaders", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_requirement_uploaders_1.RequirementUploaders),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("Ru")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Kd_Mo_requirement_uploaders_1.InputRequirementUploaders]),
    __metadata("design:returntype", Promise)
], RequirementUploadersResolver.prototype, "AddRequirementUploaders", null);
RequirementUploadersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RequirementUploadersResolver);
exports.RequirementUploadersResolver = RequirementUploadersResolver;
//# sourceMappingURL=Kd_Re_requirement_uploaders.js.map