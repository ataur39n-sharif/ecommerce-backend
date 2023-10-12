"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashHelper_1 = require("@/Utils/helper/hashHelper");
describe('HashHelper', () => {
    describe('comparePassword', () => {
        it('should return true for correct password', () => __awaiter(void 0, void 0, void 0, function* () {
            const password = 'mypassword';
            const hashedPassword = yield hashHelper_1.HashHelper.generateHashPassword(password);
            const result = yield hashHelper_1.HashHelper.comparePassword(password, hashedPassword);
            expect(result).toBe(true);
        }));
        it('should return false for incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
            const password1 = 'mypassword';
            const password2 = 'incorrectpassword';
            const hashedPassword = yield hashHelper_1.HashHelper.generateHashPassword(password1);
            const result = yield hashHelper_1.HashHelper.comparePassword(password2, hashedPassword);
            expect(result).toBe(false);
        }));
    });
    describe('generateHashPassword', () => {
        it('should generate a valid hash', () => __awaiter(void 0, void 0, void 0, function* () {
            const password = 'mypassword';
            const hash = yield hashHelper_1.HashHelper.generateHashPassword(password);
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
        }));
    });
});
