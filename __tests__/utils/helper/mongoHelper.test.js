"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoHelper_1 = require("@/Utils/helper/mongoHelper");
describe('convertToObjectId', () => {
    it('should convert a valid string to ObjectId', () => {
        const idString = '605c4f8c11a9bc1f1c8b90a2'; // Replace with a valid ObjectId string
        const objectId = mongoHelper_1.MongoHelper.convertToObjectId(idString);
        expect(objectId).toBeInstanceOf(mongoose_1.Types.ObjectId);
        expect(objectId.toHexString()).toEqual(idString);
    });
    it('should throw an error for an invalid string', () => {
        const invalidIdString = 'invalidObjectId';
        expect(() => mongoHelper_1.MongoHelper.convertToObjectId(invalidIdString)).toThrowError();
    });
});
