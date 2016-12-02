/* globals describe it */

"use strict";

const expect = require("chai").expect;
const spy = require("sinon").spy;
const foodsController = require("../../server/controllers/foods-controller");

describe("getAllFoods() tests", () => {
    let reqMock = {
        query: {
            page: 2
        }
    };
    let resMock = {
        render() { }
    };
    let userValidatorMock = {};
    let dataMock = {
        getAllFoods() {
            return new Promise(resolve => resolve({}));
        }
    };
    let commonMock = {};

    it("data.getAllFoods() should be called", () => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let dataSpy = spy(dataMock, "getAllFoods");

        controller.getAllFoods(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });

    it("res.render() should be called", done => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let resSpy = spy(resMock, "render");

        controller
            .getAllFoods(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                resSpy.restore();
                done();
            });
    });
});

describe("getSingleFood() tests", () => {
    let reqMock = {
        query: {
            title: "",
            details: ""
        }
    };
    let resMock = {
        render() { }
    };
    let commonMock = {
        setIsAdminUser() { }
    };
    let dataMock = {
        getSingleFood() {
            return new Promise(resolve => resolve({}));
        }
    };
    let userValidatorMock = {};

    it("common.setIsAdminUser() should be called", () => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let commonSpy = spy(commonMock, "setIsAdminUser");

        controller.getSingleFood(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("res.render() should be called", done => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let resSpy = spy(resMock, "render");

        controller
            .getSingleFood(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                done();
                resSpy.restore();
            });
    });
});

describe("getFoodsByCategory() tests", () => {
    let reqMock = {
        query: {
            title: "",
            details: ""
        }
    };
    let resMock = {
        render() { }
    };
    let commonMock = {
        setIsAdminUser() { }
    };
    let dataMock = {
        getSingleFood() {
            return new Promise(resolve => resolve({}));
        },
        getFoodByCategory() {
            return new Promise(resolve => resolve({}));
        }
    };
    let userValidatorMock = {};

    it("common.setIsAdminUser() should be called", () => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let commonSpy = spy(commonMock, "setIsAdminUser");

        controller.getFoodByCategory(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("res.render() should be called", done => {
        let controller = foodsController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let resSpy = spy(resMock, "render");

        controller
            .getFoodByCategory(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                done();
                resSpy.restore();
            });
    });
});