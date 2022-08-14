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
exports.OrderImgResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_orders_imgs_1 = require("../modules/Kd_Mo_orders_imgs");
let OrderImgResolver = class OrderImgResolver {
    getAllOrderImgByOrderId(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        return Kd_Mo_orders_imgs_1.OrderImg.find({
            where: [{ user_id: MyId }, { Order_id: OrderId }],
        });
    }
    getAllOrderImgByAndCompanyOrderId(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        return Kd_Mo_orders_imgs_1.OrderImg.find({
            where: [{ Order_id: OrderId }, { combany_id: MyId }],
        });
    }
    async deleteOrderImg(imgId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        const findImge = await Kd_Mo_orders_imgs_1.OrderImg.findOneBy({ user_id: MyId, img_id: imgId });
        if (findImge) {
            Kd_Mo_orders_imgs_1.OrderImg.delete(findImge === null || findImge === void 0 ? void 0 : findImge._id);
            return true;
        }
        else {
            return false;
        }
    }
    async addOrderImg(imgId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        imgId.user_id = MyId;
        const imge = await Kd_Mo_orders_imgs_1.OrderImg.create(imgId)
            .save()
            .catch((err) => {
            return err;
        });
        return imge;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_orders_imgs_1.OrderImg]),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderImgResolver.prototype, "getAllOrderImgByOrderId", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_orders_imgs_1.OrderImg]),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderImgResolver.prototype, "getAllOrderImgByAndCompanyOrderId", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("imgId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderImgResolver.prototype, "deleteOrderImg", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_orders_imgs_1.OrderImg),
    __param(0, (0, type_graphql_1.Arg)("imgInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_orders_imgs_1.InputImgOrders, Object]),
    __metadata("design:returntype", Promise)
], OrderImgResolver.prototype, "addOrderImg", null);
OrderImgResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OrderImgResolver);
exports.OrderImgResolver = OrderImgResolver;
//# sourceMappingURL=Kd_Re_orders_imgs.js.map