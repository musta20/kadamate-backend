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
exports.OrdersResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_orders_imgs_1 = require("../modules/Kd_Mo_orders_imgs");
const Kd_Mo_orders_1 = require("../modules/Kd_Mo_orders");
let OrdersResolver = class OrdersResolver {
    AllOrder({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        return Kd_Mo_orders_1.Orders.find({
            where: [{ User_id: MyId }],
        });
    }
    async getOrderByid(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        const resultOrder = await Kd_Mo_orders_1.Orders.findBy({
            User_id: MyId,
            _id: OrderId,
        }).catch((err) => {
            return err;
        });
        if (!resultOrder) {
            return false;
        }
        return resultOrder;
    }
    async addOrder(orderInput, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        orderInput.req_id = MyId;
        return await Kd_Mo_orders_imgs_1.OrderImg.create(orderInput)
            .save()
            .catch((err) => {
            return err;
        });
    }
    async CloseOrder(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        const findImge = await Kd_Mo_orders_1.Orders.findOne({
            where: [
                { combany_id: MyId, _id: OrderId },
                { User_id: MyId, _id: OrderId },
            ],
        });
        if (findImge) {
            findImge.isDone = true;
            findImge.save();
        }
        return false;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_orders_1.Orders]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "AllOrder", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => Kd_Mo_orders_1.Orders),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "getOrderByid", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => Kd_Mo_orders_imgs_1.OrderImg),
    __param(0, (0, type_graphql_1.Arg)("orderInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_orders_imgs_1.InputOrders, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "addOrder", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "CloseOrder", null);
OrdersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OrdersResolver);
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=Kd_Re_orders.js.map