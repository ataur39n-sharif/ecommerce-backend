"use strict";
// testSetup.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testDBUri = "mongodb+srv://dev:dev-ataur@cluster0.6959uav.mongodb.net/ecom-db?retryWrites=true&w=majority"; // Replace with your test database URI
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to the test database before running the tests
    yield mongoose_1.default.connect(testDBUri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Disconnect from the test database after all tests are completed
    yield mongoose_1.default.connection.close();
}));
