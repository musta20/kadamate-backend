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
const types_1 = require("../utils/types");
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_orders_1 = require("../modules/Kd_Mo_orders");
const Kd_Mo_orders_2 = require("../modules/Kd_Mo_orders");
const types_2 = require("../utils/types");
const Kd_Mo_services_1 = require("../modules/Kd_Mo_services");
const Kd_Mo_users_1 = require("../modules/Kd_Mo_users");
let OrdersResolver = class OrdersResolver {
    async AllOrder({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        const responseOrderArray = [];
        const findOrders = await Kd_Mo_orders_2.Orders.findBy({ User_id: MyId });
        findOrders.forEach(async (_o) => {
            const serviceName = await Kd_Mo_services_1.Services.findOneBy({ _id: (0, types_1.inferToObjectId)(_o.Service_id) });
            const combany_name = await Kd_Mo_users_1.Users.findOneBy({ _id: (0, types_1.inferToObjectId)(_o.combany_id) });
            responseOrderArray.push({
                _id: _o._id,
                Service_name: serviceName === null || serviceName === void 0 ? void 0 : serviceName.Title,
                Request_des: _o.Request_des,
                combany_name: combany_name === null || combany_name === void 0 ? void 0 : combany_name.name,
                isDone: _o.isDone,
                done_msg: _o.done_msg,
                done_img: _o.done_img,
                is_viewed: _o.is_viewed,
                createdAt: _o.createdAt
            });
        });
        return responseOrderArray;
    }
    AllCompanyOrders({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        return Kd_Mo_orders_2.Orders.find({
            where: [{ User_id: (0, types_1.inferToObjectId)(MyId) }],
        });
    }
    async getOrderByid(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        const resultOrder = await Kd_Mo_orders_2.Orders.findBy({
            User_id: MyId,
            _id: OrderId,
        }).catch((err) => {
            return { errors: [{ message: err }] };
        });
        if (!resultOrder) {
            return { errors: [{ message: "somthing went wrong" }] };
        }
        return resultOrder;
    }
    async addOrder(orderInput, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        orderInput.User_id = MyId;
        return await Kd_Mo_orders_2.Orders.create(orderInput)
            .save()
            .catch((err) => {
            return { errors: [{ message: err }] };
        });
    }
    async CloseOrder(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user.id;
        const findImge = await Kd_Mo_orders_2.Orders.findOneBy({ _id: (0, types_1.inferToObjectId)(OrderId) });
        if (!findImge)
            return false;
        if (findImge.User_id === MyId || findImge.combany_id === MyId) {
            findImge.isDone = 0;
            findImge.save();
            return true;
        }
        return false;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [types_2.OrdersResponse]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "AllOrder", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_orders_2.Orders]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "AllCompanyOrders", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => Kd_Mo_orders_2.Orders),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "getOrderByid", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_orders_2.Orders),
    __param(0, (0, type_graphql_1.Arg)("orderInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_orders_1.InputOrders, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "addOrder", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "CloseOrder", null);
OrdersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OrdersResolver);
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=Kd_Re_orders.js.map