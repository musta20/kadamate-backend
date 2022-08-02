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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputOrders = exports.Orders = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Orders = class Orders extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "Service_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "Request_des", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "User_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "combany_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Orders.prototype, "isDone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "done_msg", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "done_img", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "is_viewed", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Orders.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Orders.prototype, "updatedAt", void 0);
Orders = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Orders);
exports.Orders = Orders;
let InputOrders = class InputOrders {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "Service_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InputOrders.prototype, "Request_des", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "User_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "combany_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InputOrders.prototype, "isDone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InputOrders.prototype, "done_msg", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InputOrders.prototype, "done_img", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "is_viewed", void 0);
InputOrders = __decorate([
    (0, type_graphql_1.InputType)()
], InputOrders);
exports.InputOrders = InputOrders;
//# sourceMappingURL=Kd_Mo_orders.js.map