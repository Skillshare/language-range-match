"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparator_1 = require("../comparator");
describe("Comparator", () => {
    describe("Cascading range", () => {
        it("Builds cascading range from subTags", () => {
            expect((0, comparator_1.buildCascadeForBasicRange)("zh-Hant-CN-x-y-private1-private2")).toEqual(["zh-Hant-CN-x-y-private1-private2",
                "zh-Hant-CN-x-y-private1",
                "zh-Hant-CN",
                "zh-Hant",
                "zh"]);
        });
    });
});
