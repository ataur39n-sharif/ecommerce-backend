"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pickFunction_1 = require("@/Utils/helper/pickFunction");
describe('pickFunction', () => {
    it('should pick specified keys from an object', () => {
        const data = { name: 'Alice', age: 30, city: 'New York' };
        const keys = ['name', 'age'];
        const result = (0, pickFunction_1.pickFunction)(data, keys);
        expect(result).toEqual({ name: 'Alice', age: 30 });
    });
    it('should handle missing keys gracefully', () => {
        const data = { name: 'Bob', city: 'Los Angeles' };
        const keys = ['name', 'age'];
        const result = (0, pickFunction_1.pickFunction)(data, keys);
        expect(result).toEqual({ name: 'Bob' });
    });
    it('should return an empty object when input is empty', () => {
        const data = {};
        const keys = ['name', 'age'];
        const result = (0, pickFunction_1.pickFunction)(data, keys);
        expect(result).toEqual({});
    });
    it('should handle undefined values gracefully', () => {
        const data = { name: 'Charlie', age: undefined };
        const keys = ['name', 'age'];
        const result = (0, pickFunction_1.pickFunction)(data, keys);
        expect(result).toEqual({ name: 'Charlie' });
    });
});
