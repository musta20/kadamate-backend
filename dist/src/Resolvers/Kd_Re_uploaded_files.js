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
exports.UploadedFilesResulver = void 0;
const isAuth_1 = require("../middleware/Auth/isAuth");
const Kd_Mo_uploaded_files_1 = require("../modules/Kd_Mo_uploaded_files");
const type_graphql_1 = require("type-graphql");
let UploadedFilesResulver = class UploadedFilesResulver {
    async AllUploadedFilesMy({ req }) {
        var _a, _b;
        const MyId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user.id;
        return await Kd_Mo_uploaded_files_1.UploadedFiles.findBy({ user_id: MyId });
    }
    async RemoveFile({ req }, imgId) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        const findImg = await Kd_Mo_uploaded_files_1.UploadedFiles.findOneBy({ _id: imgId, user_id: MyId });
        if (findImg) {
            Kd_Mo_uploaded_files_1.UploadedFiles.delete(findImg._id);
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Kd_Mo_uploaded_files_1.UploadedFiles]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadedFilesResulver.prototype, "AllUploadedFilesMy", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Kd_Mo_uploaded_files_1.UploadedFiles),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("img_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadedFilesResulver.prototype, "RemoveFile", null);
UploadedFilesResulver = __decorate([
    (0, type_graphql_1.Resolver)()
], UploadedFilesResulver);
exports.UploadedFilesResulver = UploadedFilesResulver;
//# sourceMappingURL=Kd_Re_uploaded_files.js.map