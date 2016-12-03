/* globals describe it */

"use strict";

const adminController = require("../../server/controllers/admin-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("admin-controller tests", () => {
    const ADMIN_PANEL_VIEW = "admin-area/admin-panel";

    let foods = [];
    let usernames = [];
    let users = [];
    let category = "";
    let reqMock = {
        user: {},
        query: {
            category: ""
        },
        body: {
            username: "",
            role: "",
            category: ""
        }
    };
    let resMock = {
        render() { }
    };
    let dataMock = {
        getUsernamesOfUsers() {
            return new Promise(resolve => resolve(usernames));
        },
        getAllFoods() {
            return new Promise(resolve => resolve(foods));
        },
        findUserAndUpdate() {
            return new Promise(resolve => resolve(users));
        },
        addNewCategory() {
            return new Promise(resolve => resolve(category));
        }
    };
    let commonMock = {
        setIsAdminUser() { }
    };
    let userValidatorMock = {};

    let controller = adminController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

    describe("loadAdminPanel(req, res)", () => {
        it("Expect common.setIsAdminUser(req, userValidator) to be called", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledOnce).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect common.setIsAdminUser(req, userValidator) to be called with req and useValidator objects", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledWith(reqMock, userValidatorMock)).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });

        });

        it("Expect data.getUsernamesOfUsers() to be called", done => {
            let getUsernamesOfUsersSpy = spy(dataMock, "getUsernamesOfUsers");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(getUsernamesOfUsersSpy.calledOnce).to.be.true;
                    getUsernamesOfUsersSpy.restore();
                    done();
                });

        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                user: reqMock.user,
                mappedUsers: usernames,
                foods
            };

            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addRole(req, res)", () => {
        it("Expect common.setIsAdminUser(req, userValidator) to be called", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledOnce).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect common.setIsAdminUser(req, userValidator) to be called with req and useValidator objects", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledWith(reqMock, userValidatorMock)).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });
        });

        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.findUserAndUpdate() to be called", done => {
            let findUserAndUpdateSpy = spy(dataMock, "findUserAndUpdate");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(findUserAndUpdateSpy.calledOnce).to.be.true;
                    findUserAndUpdateSpy.restore();
                    done();
                });
        });

        it("Expect data.findUserAndUpdate() to be called with correct query and update objects ", done => {
            let findUserAndUpdateSpy = spy(dataMock, "findUserAndUpdate");
            let query = { username: reqMock.body.username };
            let update = { $push: { "roles": reqMock.body.role } };

            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(findUserAndUpdateSpy.calledWith(query, update)).to.be.true;
                    findUserAndUpdateSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                user: reqMock.user,
                foods
            };

            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewExerciseCategory(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewCategory() to be called", done => {
            let addNewCategorySpy = spy(dataMock, "addNewCategory");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewCategorySpy.calledOnce).to.be.true;
                    addNewCategorySpy.restore();
                    done();
                });
        });

        it("Expect data.addNewCategory() to be called, with correct category", done => {
            let addNewCategorySpy = spy(dataMock, "addNewCategory");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewCategorySpy.calledWith(category)).to.be.true;
                    addNewCategorySpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });
});