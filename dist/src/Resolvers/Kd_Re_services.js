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
exports.ServicesResulver = void 0;
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_services_1 = require("../modules/Kd_Mo_services");
const type_graphql_1 = require("type-graphql");
let ServicesResulver = class ServicesResulver {
    async AllServices() {
        return Kd_Mo_services_1.Services.find();
    }
    async AllServicesMy({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        return await Kd_Mo_services_1.Services.findBy({ user_id: MyId });
    }
    async addServices({ req }, serviceId) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        serviceId.user_id = MyId;
        const sevedServ = await Kd_Mo_services_1.Services.create(serviceId)
            .save()
            .catch((err) => {
            console.log(err);
            return false;
        });
        return sevedServ;
    }
    async updateServices({ req }, serviceIput, serviceId) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        const serviceUpdate = await Kd_Mo_services_1.Services.findOneBy({
            _id: serviceId,
            user_id: MyId,
        });
        if (!serviceUpdate) {
            return false;
        }
        serviceUpdate.Title = serviceIput.Title;
        serviceUpdate.Description = serviceIput.Description;
        serviceUpdate.Requirement = serviceIput.Requirement;
        serviceUpdate.img_id = serviceIput.img_id;
        serviceUpdate.cat_id = serviceIput.cat_id;
        serviceUpdate.save().catch((err) => {
            console.error(err);
            return false;
        });
        return serviceUpdate;
    }
    async deleteServices({ req }, serviceId) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        await Kd_Mo_services_1.Services.delete({ _id: serviceId, user_id: MyId }).catch((err) => {
            console.log(err);
            return false;
        });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Kd_Mo_services_1.Services]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesResulver.prototype, "AllServices", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_services_1.Services]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesResulver.prototype, "AllServicesMy", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_services_1.Services),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("serviceIput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Kd_Mo_services_1.InputServices]),
    __metadata("design:returntype", Promise)
], ServicesResulver.prototype, "addServices", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_services_1.Services),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("serviceIput")),
    __param(2, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Kd_Mo_services_1.InputServices, String]),
    __metadata("design:returntype", Promise)
], ServicesResulver.prototype, "updateServices", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("serviceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServicesResulver.prototype, "deleteServices", null);
ServicesResulver = __decorate([
    (0, type_graphql_1.Resolver)()
], ServicesResulver);
exports.ServicesResulver = ServicesResulver;
//# sourceMappingURL=Kd_Re_services.js.map