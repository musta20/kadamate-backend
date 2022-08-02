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
exports.MessagesResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_messages_1 = require("../modules/Kd_Mo_messages");
let MessagesResolver = class MessagesResolver {
    AllMessages({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        return Kd_Mo_messages_1.Messages.find({ where: [{ User_id: MyId }, { Sender_id: MyId }] });
    }
    AllMessagesByOrderId(OrderId, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        return Kd_Mo_messages_1.Messages.find({
            where: [{ User_id: MyId }, { Sender_id: MyId }, { Order_id: OrderId }],
        });
    }
    async SendMessages(messageInput, { req }) {
        const MyId = 5;
        messageInput.Sender_id = MyId;
        await Kd_Mo_messages_1.Messages.create(messageInput)
            .save()
            .catch((err) => {
            console.log(err);
            return false;
        });
        return true;
    }
    async DeleteMessages(messageID, { req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        await Kd_Mo_messages_1.Messages.delete({ _id: messageID, Sender_id: MyId }).catch((err) => {
            console.error(err);
            return false;
        });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_messages_1.Messages]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "AllMessages", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => [Kd_Mo_messages_1.Messages]),
    __param(0, (0, type_graphql_1.Arg)("OrderId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "AllMessagesByOrderId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("messageInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kd_Mo_messages_1.InputMessages, Object]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "SendMessages", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("messageID")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "DeleteMessages", null);
MessagesResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=Kd_Re_messages.js.map