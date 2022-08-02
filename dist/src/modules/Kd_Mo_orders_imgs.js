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
exports.InputOrders = exports.OrderImg = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let OrderImg = class OrderImg extends typeorm_1.BaseEntity {
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
], OrderImg.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderImg.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderImg.prototype, "img_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderImg.prototype, "Order_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderImg.prototype, "combany_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderImg.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderImg.prototype, "updatedAt", void 0);
OrderImg = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], OrderImg);
exports.OrderImg = OrderImg;
let InputOrders = class InputOrders {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "img_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "req_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InputOrders.prototype, "combany_id", void 0);
InputOrders = __decorate([
    (0, type_graphql_1.InputType)()
], InputOrders);
exports.InputOrders = InputOrders;
//# sourceMappingURL=Kd_Mo_orders_imgs.js.map