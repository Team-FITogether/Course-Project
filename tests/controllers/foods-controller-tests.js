/* globals describe it */

"use strict";

const foodsController = require("../../server/controllers/foods-controller");

const expect = require("chai").expect;
const spy = require("sinon").spy;
const sinon = require("sinon");

describe("FOODS-CONTROLLER-TESTS", () => {
    describe("getAllFoods() tests", () => {
        let reqMock = {
            query: {
                page: 2
            }
        };
        let resMock = {
            render() {}
        };
        let commonMock = { setIsAdminUser() {} };
        let userValidatorMock = {};
        let dataMock = {
            getAllFoods() {
                return new Promise(resolve => resolve({}));
            }
        };

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
            render() {}
        };
        let commonMock = {
            setIsAdminUser() {}
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
            render() {}
        };
        let commonMock = {
            setIsAdminUser() {}
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

    describe("createFood() tests", () => {
        let reqMock = {
            body: {
                title: "test title",
            }
        };
        let resMock = {
            redirect() {}
        };
        let dataMock = {
            addNewFoodCategory() {
                return new Promise(resolve => resolve({}));
            }
        };
        let userValidatorMock = {};
        let commonMock = {};

        it("data.createFood() should be called", () => {
            let dataSpy = sinon.spy(dataMock, "addNewFoodCategory");
            let controller = foodsController({ data: dataMock });
            let body = reqMock.body;

            controller.createFood(reqMock, resMock);
            expect(dataSpy.calledWith(body.title));
        });

        it("res.redirect() should be called when everything is ok", done => {
            let resSpy = sinon.spy(resMock, "redirect");
            let controller = foodsController({ data: dataMock });

            controller
                .createFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.called).to.be.true;
                    done();
                });
        });
    });

    describe("saveEditedFood() tests", () => {
        let reqMock = {
            body: {
                foodId: "test id",
                foodTitle: "test title"
            }
        };
        let resMock = {
            redirect() {}
        };
        let dataMock = {
            updateFood() {
                return new Promise(resolve => resolve({}));
            }
        };

        it("data.saveEditedFood() should be called with foodId (from the body), update object and options object", () => {
            let dataSpy = sinon.spy(dataMock, "updateFood");
            let controller = foodsController({ data: dataMock });

            controller.saveEditedFood(reqMock, resMock);

            let expectedUpdate = {
                title: reqMock.body.foodTitle
            };
            let expectedOptions = { new: true };
            expect(dataSpy.calledWith(reqMock.body.foodId, expectedUpdate, expectedOptions)).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called when everything is ok", done => {
            let resSpy = sinon.spy(resMock, "redirect");
            let controller = foodsController({ data: dataMock });

            controller
                .saveEditedFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("deleteFood() tests", () => {
        let reqMock;
        let resMock;
        let dataMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    foodId: 1
                }
            };
            resMock = {
                redirect() {}
            };
            dataMock = {
                updateFood() {
                    return new Promise(resolve => resolve({}));
                }
            };
        });

        it("data.updateFood() should be called", () => {
            let controller = foodsController({ data: dataMock });
            let dataSpy = sinon.spy(dataMock, "updateFood");

            controller.deleteFood(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.redirect() should be called when everything is ok", done => {
            let controller = foodsController({ data: dataMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .deleteFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                });
        });
    });

    describe("restoreFood() tests", () => {
        let reqMock;
        let resMock;
        let dataMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    foodId: 1
                }
            };
            resMock = {
                redirect() {}
            };
            dataMock = {
                updateFood() {
                    return new Promise(resolve => resolve({}));
                }
            };
        });

        it("data.updateFood() should be called", () => {
            let controller = foodsController({ data: dataMock });
            let dataSpy = sinon.spy(dataMock, "updateFood");

            controller.restoreFood(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.redirect() should be called when everything is ok", done => {
            let controller = foodsController({ data: dataMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .deleteFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                });
        });
    });
});
