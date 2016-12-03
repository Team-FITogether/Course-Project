/* globals describe it */

"use strict";

const searchesController = require("../../server/controllers/searches-controller");

const sinon = require("sinon");
const expect = require("chai").expect;

let resMock = {
    render() { }
};

let commonMock = {
    setIsAdminUser() { }
};

let userValidatorMock = {};

describe("findEntities() tests with entities Users", () => {
    let reqMock = {
        user: {
            username: "testUsername"
        },
        query: {
            entityName: "users",
            searchValue: "testUser"
        }
    };
    let usersMock = [];
    let dataMock = {
        findUserByQueryWithSelectIdAndName() {
            return new Promise(resolve => resolve(usersMock));
        }
    };

    it("common.setIsAdminUser() should be called once", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.findUserByQueryWithSelectIdAndName() should be called once", () => {
        let dataSpy = sinon.spy(dataMock, "findUserByQueryWithSelectIdAndName");
        let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.findEntities(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });

    // it("res.render() should be called once", () => {
    //     let resSpy = sinon.spy(resMock, "render");
    //     let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

    //     controller.findEntities(reqMock, resMock);
    //     expect(resSpy.calledOnce).to.be.true;
    //     resSpy.restore();
    // });
});

describe("findEntities() tests with entities Exercises", () => {
    let reqMock = {
        user: {
            username: "testUsername"
        },
        query: {
            entityName: "exercises"
        }
    };
    let exercisesMock = [];
    let dataMock = {
        findExerciseByQueryWithSelectIdAndName() {
            return new Promise(resolve => resolve(exercisesMock));
        }
    };

    it("common.setIsAdminUser() should be called once", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.findExerciseByQueryWithSelectIdAndName() should be called once", () => {
        let dataSpy = sinon.spy(dataMock, "findExerciseByQueryWithSelectIdAndName");
        let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.findEntities(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });
});

describe("findEntities() tests with entities Foods", () => {
    let reqMock = {
        user: {
            username: "testUsername"
        },
        query: {
            entityName: "foods"
        }
    };
    let foodsMock = [];
    let dataMock = {
        findFoodByQueryWithSelectIdAndTitle() {
            return new Promise(resolve => resolve(foodsMock));
        }
    };

    it("common.setIsAdminUser() should be called once", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.findFoodByQueryWithSelectIdAndTitle() should be called once", () => {
        let dataSpy = sinon.spy(dataMock, "findFoodByQueryWithSelectIdAndTitle");
        let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.findEntities(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });
});

describe("findEntities() tests with entities Recipes", () => {
    let reqMock = {
        user: {
            username: "testUsername"
        },
        query: {
            entityName: "recipes"
        }
    };
    let recipesMock = [];
    let dataMock = {
        findRecipeByQueryWithSelectIdAndTitle() {
            return new Promise(resolve => resolve(recipesMock));
        }
    };

    it("common.setIsAdminUser() should be called once", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.findRecipeByQueryWithSelectIdAndTitle() should be called once", () => {
        let dataSpy = sinon.spy(dataMock, "findRecipeByQueryWithSelectIdAndTitle");
        let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.findEntities(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });
});

describe("findEntities() tests with entities Articles", () => {
    let reqMock = {
        user: {
            username: "testUsername"
        },
        query: {
            entityName: "articles"
        }
    };
    let articlesMock = [];
    let dataMock = {
        findArticleByQueryWithSelectIdAndHeader() {
            return new Promise(resolve => resolve(articlesMock));
        }
    };

    it("common.setIsAdminUser() should be called once", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = searchesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.findEntities(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.findUserByQueryWithSelectIdAndName() should be called once", () => {
        let dataSpy = sinon.spy(dataMock, "findArticleByQueryWithSelectIdAndHeader");
        let controller = searchesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.findEntities(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });
});