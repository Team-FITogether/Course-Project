/* globals describe it beforeEach */

"use strict";

const expect = require("chai").expect;
const spy = require("sinon").spy;
const foodsData = require("../../server/data/foods-data");

describe("FOODS-DATA-TESTS", () => {
    describe("getAllFoods() tests", () => {
        let models = {
            Food: {
                find() { return this; },
                skip() { return this; },
                limit() { return this; },
                count() { return this; },
                exec() { return new Promise(resolve => resolve({})); }
            }
        };
        let data = foodsData(models);

        it("find() should be called", () => {
            let findSpy = spy(models.Food, "find");

            data.getAllFoods();
            expect(findSpy.calledOnce).to.be.true;
            findSpy.restore();
        });

        it("skip() should be called", () => {
            let skipSpy = spy(models.Food, "skip");

            data.getAllFoods();
            expect(skipSpy.calledOnce).to.be.true;
            skipSpy.restore();
        });

        it("limit() should be called", () => {
            let limitSpy = spy(models.Food, "limit");

            data.getAllFoods();
            expect(limitSpy.calledOnce).to.be.true;
            limitSpy.restore();
        });

        it("count() should be called", () => {
            let countSpy = spy(models.Food, "count");

            data.getAllFoods();
            expect(countSpy.calledOnce).to.be.true;
            countSpy.restore();
        });

        it("exec() should be called twice", () => {
            let execSpy = spy(models.Food, "exec");

            data.getAllFoods();
            expect(execSpy.calledTwice).to.be.true;
            execSpy.restore();
        });

        // it("should return [] with two resolved objects", done => {
        //     data.getAllFoods()
        //         .then(result => {
        //             expect(result.length).to.equal(2);
        //             done();
        //         });
        // });
    });
});