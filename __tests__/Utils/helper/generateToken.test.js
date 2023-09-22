"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("@/Config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("@/Utils/helper/generateToken");
describe('generateToken', () => {
    describe('accessToken', () => {
        it('should generate a valid access token', () => {
            const data = { userId: 123 };
            const token = generateToken_1.generateToken.accessToken(data);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });
        it('should contain expected claims', () => {
            const data = { userId: 123 };
            const token = generateToken_1.generateToken.accessToken(data);
            const decodedToken = jsonwebtoken_1.default.verify(token, String(Config_1.default.jwt.accessToken.secret));
            expect(decodedToken.userId).toBe(data.userId);
        });
    });
    describe('refreshToken', () => {
        it('should generate a valid refresh token', () => {
            const data = { userId: 123 };
            const token = generateToken_1.generateToken.refreshToken(data);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });
        it('should contain expected claims', () => {
            const data = { userId: 123 };
            const token = generateToken_1.generateToken.refreshToken(data);
            const decodedToken = jsonwebtoken_1.default.verify(token, String(Config_1.default.jwt.refreshToken.secret));
            expect(decodedToken.userId).toBe(data.userId);
        });
    });
});
