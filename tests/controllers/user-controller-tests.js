/* globals beforeEach it describe */

"use strict";

const expect = require("chai").expect;
const spy = require("sinon").spy;
const userController = require("../../server/controllers/user-controller");

describe("loadProfilePage() tests", () => {
    let commonMock = {
        setIsAdminUser() { },
        setIsTrainerUser() { }
    };
    let userValidatorMock = {};
    let dataMock = {
        getAllExercises() {
            return new Promise(resolve => resolve({}));
        }
    };
    let reqMock = {};
    let resMock = {};

    it("commonMock.setIsAdminUser() should be called", () => {
        let commonSpy = spy(commonMock, "setIsAdminUser");
        let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.loadProfilePage(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

     it("commonMock.setIsTrainerUser() should be called", () => {
        let commonSpy = spy(commonMock, "setIsTrainerUser");
        let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.loadProfilePage(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });
});