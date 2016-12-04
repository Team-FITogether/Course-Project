/* globals describe it */
"use strict";

const expect = require("chai").expect;
const spy = require("sinon").spy;
const foodsData = require("../../server/data/foods-data");

describe("FOODS-DATA-TESTS", () => {
    let models = {
        Food: {
            find() { return this; },
            skip() { return this; },
            limit() { return this; },
            count() { return this; },
            save() { },
            exec() { return new Promise(resolve => resolve({})); }
        },
        FoodDetails: {
            findOne() { return this; },
            find() { return this; }
        }
    };
    let data = foodsData(models);

    describe("getAllFoods() tests", () => {
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
    });

    describe("getAllFoodDetails() tests", () => {
        it("Food.find() should be called", () => {
            let findSpy = spy(models.Food, "find");

            data.getAllFoods();
            expect(findSpy.calledOnce).to.be.true;
            findSpy.restore();
        });
    });

    describe("getSingleFood() tests", () => {
        it("FootDetails.findOne() should be called", () => {
            let findOneSpy = spy(models.FoodDetails, "findOne");

            data.getSingleFood();
            expect(findOneSpy.calledOnce).to.be.true;
            findOneSpy.restore();
        });
    });

    describe("getFoodByCategory() tests", () => {
        it("FootDetails.find() should be called", () => {
            let findSpy = spy(models.FoodDetails, "find");

            data.getFoodByCategory();
            expect(findSpy.calledOnce).to.be.true;
            findSpy.restore();
        });
    });

    describe("getFoodByCategory() tests", () => {
        it("FootDetails.find() should be called", () => {
            let findSpy = spy(models.FoodDetails, "find");

            data.getFoodByCategory();
            expect(findSpy.calledOnce).to.be.true;
            findSpy.restore();
        });
    });
});