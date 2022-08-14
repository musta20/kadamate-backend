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
exports.ErrorFiled = exports.ResponseResult = exports.OrdersResponse = exports.inferToObjectId = void 0;
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const inferToObjectId = (strId) => {
    return new mongodb_1.ObjectId(strId);
};
exports.inferToObjectId = inferToObjectId;
let OrdersResponse = class OrdersResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrdersResponse.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], OrdersResponse.prototype, "Service_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrdersResponse.prototype, "Request_des", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], OrdersResponse.prototype, "combany_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrdersResponse.prototype, "isDone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrdersResponse.prototype, "done_msg", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrdersResponse.prototype, "done_img", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrdersResponse.prototype, "is_viewed", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], OrdersResponse.prototype, "createdAt", void 0);
OrdersResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], OrdersResponse);
exports.OrdersResponse = OrdersResponse;
class ResponseResult {
}
exports.ResponseResult = ResponseResult;
let ErrorFiled = class ErrorFiled {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorFiled.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorFiled.prototype, "message", void 0);
ErrorFiled = __decorate([
    (0, type_graphql_1.ObjectType)()
], ErrorFiled);
exports.ErrorFiled = ErrorFiled;
//# sourceMappingURL=types.js.map